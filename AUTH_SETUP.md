# Authentication System Setup Guide

## ✅ Completed Implementation

Your authentication system now includes:

1. **Password Reset Flow** ✅
   - Forgot password page
   - Email with reset link
   - Secure token-based reset (1-hour expiry)

2. **Email Verification** ✅
   - Verification email sent on registration
   - Verification page with token validation
   - Resend verification option

3. **Google OAuth** ✅
   - "Sign in with Google" button on login page
   - Automatic account creation or linking by email
   - Pre-verified emails for OAuth users

4. **Rate Limiting** ✅
   - Login: 5 attempts per 15 minutes
   - Password reset: 3 attempts per hour
   - Registration: 5 attempts per hour
   - Works with or without Upstash Redis

---

## 🔧 Required Setup Steps

### 1. Run Database Migration

The database schema has been updated but not yet applied due to connection issues.

```bash
cd "/Users/yamenk/Desktop/INDN Website/indn-website"
npx prisma db push --accept-data-loss
```

### 2. Set Up Resend for Email Sending

1. Go to [https://resend.com](https://resend.com) and sign up (free tier: 100 emails/day)
2. Verify your domain or use their test domain
3. Get your API key from the dashboard
4. Add to `.env`:

```bash
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
```

### 3. Set Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Go to **Credentials** → **Create Credentials** → **OAuth client ID**
5. Configure OAuth consent screen:
   - User Type: External
   - App name: INDN
   - Support email: your email
   - Authorized domains: your domain
6. Create OAuth 2.0 Client ID:
   - Application type: Web application
   - Authorized redirect URIs:
     - Development: `http://localhost:3000/api/auth/callback/google`
     - Production: `https://yourdomain.com/api/auth/callback/google`
7. Copy Client ID and Client Secret
8. Add to `.env`:

```bash
GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx
```

### 4. (Optional) Set Up Upstash Redis for Production Rate Limiting

For development, rate limiting uses in-memory storage. For production:

1. Go to [https://upstash.com](https://upstash.com) (free tier available)
2. Create a new Redis database
3. Copy the connection details
4. Add to `.env`:

```bash
UPSTASH_REDIS_REST_URL=https://xxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxx
```

If you skip this, rate limiting will use in-memory fallback (works but resets on server restart).

### 5. Update Environment Variables

Make sure your `.env` file has:

```bash
# Existing
DATABASE_URL=your_database_url
DIRECT_URL=your_direct_url
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here

# New - Required
RESEND_API_KEY=re_xxxxxxxxxxxx
EMAIL_FROM=noreply@yourdomain.com
GOOGLE_CLIENT_ID=xxxxxxxxxxxx.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-xxxxxxxxxxxx

# New - Optional (use Upstash for production)
UPSTASH_REDIS_REST_URL=https://xxxxxx.upstash.io
UPSTASH_REDIS_REST_TOKEN=xxxxxxxxxxxx
```

---

## 🧪 Testing Checklist

Once setup is complete, test these flows:

### Password Reset
- [ ] Go to `/login` and click "Forgot password?"
- [ ] Enter email and verify you receive reset email
- [ ] Click link in email and reset password
- [ ] Verify token expires after 1 hour
- [ ] Login with new password

### Email Verification
- [ ] Register new account
- [ ] Check email for verification link
- [ ] Click verification link
- [ ] Verify you can login

### Google OAuth
- [ ] Click "Sign in with Google" on login page
- [ ] Authorize with Google account
- [ ] Verify account creation/linking works
- [ ] Verify redirect to portal after login

### Rate Limiting
- [ ] Try logging in with wrong password 6 times
- [ ] Verify rate limit kicks in after 5 attempts
- [ ] Wait 15 minutes and verify you can try again

---

## 📂 New Files Created

### Email & Utilities
- `src/lib/email.ts` - Email sending functions
- `src/lib/rate-limit.ts` - Rate limiting utility

### Password Reset
- `src/app/(auth)/forgot-password/page.tsx` - Forgot password form
- `src/app/(auth)/reset-password/page.tsx` - Reset password form
- `src/app/api/auth/forgot-password/route.ts` - Generate reset token
- `src/app/api/auth/reset-password/route.ts` - Process password reset

### Email Verification
- `src/app/(auth)/verify-email/page.tsx` - Email verification page
- `src/app/api/auth/verify-email/route.ts` - Verify email endpoint
- `src/app/api/auth/resend-verification/route.ts` - Resend verification

### Modified Files
- `src/auth.config.ts` - Added Google OAuth provider
- `src/app/(auth)/login/page.tsx` - Added Google sign-in button
- `src/app/api/auth/register/route.ts` - Added email verification
- `prisma/schema.prisma` - Added auth fields to User model

---

## 🔒 Security Features

✅ **Password Reset**
- Secure random tokens (32 bytes)
- 1-hour expiration
- Tokens cleared after use
- No user enumeration (same response for existing/non-existing emails)

✅ **Email Verification**
- Tokens required for new accounts
- Can resend verification emails
- Tokens cleared after verification

✅ **OAuth Security**
- Automatic email verification for OAuth users
- Account linking by email
- No password stored for OAuth-only users

✅ **Rate Limiting**
- IP-based rate limiting
- Progressive lockout
- Development fallback (in-memory)

---

## 🚀 Next Steps (Optional Enhancements)

Consider adding later:
- [ ] Multi-factor authentication (TOTP)
- [ ] Session management page (view active sessions)
- [ ] Password strength indicator
- [ ] Login activity log
- [ ] Account deletion flow
- [ ] Social login providers (GitHub, Microsoft, etc.)

---

## 🐛 Troubleshooting

**Emails not sending?**
- Check RESEND_API_KEY is set correctly
- Verify EMAIL_FROM matches verified domain
- Check Resend dashboard for error logs

**Google OAuth not working?**
- Verify redirect URIs match exactly (including http/https)
- Check Google Cloud Console for API errors
- Ensure Google+ API is enabled

**Rate limiting not working?**
- In development, uses in-memory storage (normal)
- For production, set up Upstash Redis
- Check console logs for rate limit messages

**Database migration failed?**
- Ensure database is accessible
- Check DATABASE_URL and DIRECT_URL
- Run: `npx prisma db push --accept-data-loss --skip-generate`

---

## 📞 Support

If you encounter issues:
1. Check environment variables are set correctly
2. Restart development server after .env changes
3. Check browser console and server logs for errors
4. Verify all API keys are valid and active
