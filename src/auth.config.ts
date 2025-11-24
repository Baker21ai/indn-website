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
      if (!credentials?.email || !credentials?.password) {
        return null
      }

      const user = await prisma.users.findUnique({
        where: { email: credentials.email as string },
      })

      if (!user || !user.isActive) {
        return null
      }

      const isValid = await compare(
        credentials.password as string,
        user.passwordHash
      )

      if (!isValid) {
        return null
      }

      // Update last login
      await prisma.users.update({
        where: { id: user.id },
        data: { lastLoginAt: new Date() },
      })

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
      // For OAuth providers (Google), create or link account
      if (account?.provider === 'google' && profile?.email) {
        const existingUser = await prisma.users.findUnique({
          where: { email: profile.email },
        })

        if (!existingUser) {
          // Create new user from OAuth - Note: volunteer registration disabled
          // OAuth users should be board_member or require admin approval
          const newUser = await prisma.users.create({
            data: {
              email: profile.email,
              name: profile.name || '',
              passwordHash: '', // OAuth users don't have passwords
              role: 'board_member', // Changed from 'volunteer' - volunteer registration disabled
              isActive: true,
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
      return true
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role as Role
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as Role
        session.user.id = token.id as string
      }
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
