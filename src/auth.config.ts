import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import { compare } from 'bcrypt'
import { prisma } from '@/lib/db'
import type { Role } from '@prisma/client'

const providers = [
  Credentials({
    credentials: {
      email: { label: 'Email', type: 'email' },
      password: { label: 'Password', type: 'password' },
    },
    authorize: async (credentials) => {
      console.log('🔐 [AUTH] Starting authorization...')
      console.log('🔐 [AUTH] Credentials received:', {
        email: credentials?.email,
        hasPassword: !!credentials?.password
      })

      if (!credentials?.email || !credentials?.password) {
        console.log('❌ [AUTH] Missing credentials')
        return null
      }

      console.log('🔍 [AUTH] Looking up user in database:', credentials.email)
      const user = await prisma.users.findUnique({
        where: { email: credentials.email as string },
      })

      if (!user) {
        console.log('❌ [AUTH] User not found')
        return null
      }

      console.log('✅ [AUTH] User found:', {
        id: user.id,
        email: user.email,
        isActive: user.isActive
      })

      if (!user.isActive) {
        console.log('❌ [AUTH] User account is not active')
        return null
      }

      console.log('🔒 [AUTH] Comparing passwords...')
      const isValid = await compare(
        credentials.password as string,
        user.passwordHash
      )

      if (!isValid) {
        console.log('❌ [AUTH] Password invalid')
        return null
      }

      console.log('✅ [AUTH] Password valid, updating last login...')
      // Update last login
      await prisma.users.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })

      console.log('✅ [AUTH] Authorization successful!')
      return {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      }
    },
  }),
]

const authConfig = NextAuth({
  providers,
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log('🔑 [CALLBACK] signIn callback triggered')
      console.log('🔑 [CALLBACK] user:', user)
      console.log('🔑 [CALLBACK] account:', account)
      console.log('🔑 [CALLBACK] profile:', profile)

      // For OAuth providers (Google), create or link account
      if (account?.provider === 'google' && profile?.email) {
        const existingUser = await prisma.users.findUnique({
          where: { email: profile.email },
        })

        if (!existingUser) {
          // Create new user from OAuth
          const newUser = await prisma.users.create({
            data: {
              email: profile.email,
              name: profile.name || '',
              passwordHash: '', // OAuth users don't have passwords
              role: 'volunteer',
              isActive: true,
            },
          })

          // Create volunteer profile
          await prisma.volunteer_profiles.create({
            data: {
              userId: newUser.id,
              applicationStatus: 'approved',
            },
          })

          user.id = newUser.id
          user.role = newUser.role
        } else {
          // Link to existing user
          user.id = existingUser.id
          user.role = existingUser.role
        }
      }
      console.log('✅ [CALLBACK] signIn callback completed')
      return true
    },
    jwt({ token, user }) {
      console.log('🎫 [CALLBACK] jwt callback triggered')
      console.log('🎫 [CALLBACK] token before:', token)
      console.log('🎫 [CALLBACK] user:', user)

      if (user) {
        token.role = user.role as Role
        token.id = user.id
      }

      console.log('🎫 [CALLBACK] token after:', token)
      return token
    },
    session({ session, token }) {
      console.log('📋 [CALLBACK] session callback triggered')
      console.log('📋 [CALLBACK] session before:', session)
      console.log('📋 [CALLBACK] token:', token)

      if (session.user) {
        session.user.role = token.role as Role
        session.user.id = token.id as string
      }

      console.log('📋 [CALLBACK] session after:', session)
      return session
    },
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
})

export const { handlers, signIn, signOut, auth } = authConfig
export const { GET, POST } = handlers
