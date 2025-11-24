# Security Documentation
## INDN Website Security Practices

**Last Updated:** October 30, 2025  
**Security Contact:** [Add your email here]

---

## Production Security Checklist

### Before Every Deployment

Run these commands before deploying to production:

```bash
# 1. Security audit
npm run security-check

# 2. Full pre-deploy checks (lint + build + security)
npm run pre-deploy
```

### Critical Security Measures Implemented

#### 1. Authentication & Authorization
- ✅ NextAuth.js v5 with session management
- ✅ Bcrypt password hashing (cost factor: 12)
- ✅ Role-based access control (admin, board_member, volunteer)
- ✅ Admin routes protected with role checks
- ✅ Password requirements: minimum 8 characters

#### 2. Rate Limiting
- ✅ Login: 5 attempts per 15 minutes
- ✅ Password reset: 3 attempts per hour
- ✅ Registration: 5 attempts per hour
- ✅ Upstash Redis for production + in-memory fallback for dev

#### 3. Security Headers (Next.js Config)
- ✅ X-Frame-Options: SAMEORIGIN (prevents clickjacking)
- ✅ X-Content-Type-Options: nosniff (prevents MIME sniffing)
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Permissions-Policy: restricts camera, microphone, geolocation
- ✅ Strict-Transport-Security: HTTPS enforcement (production only)

#### 4. Data Protection
- ✅ Passwords hashed with bcrypt
- ✅ Sensitive data never logged to console
- ✅ Generic error messages to clients (no stack traces)
- ✅ Prisma parameterized queries (SQL injection protection)
- ✅ Input validation with Zod schemas

#### 5. Payment Security
- ✅ Stripe integration (PCI DSS compliant)
- ✅ No credit card storage on our servers
- ✅ Secure webhook verification

---

## Environment Variables Security

### Required Production Environment Variables

**CRITICAL - Never commit these to git:**

```bash
# Database
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Authentication
NEXTAUTH_SECRET="<generate with: openssl rand -base64 32>"
NEXTAUTH_URL="https://your-production-domain.com"

# Stripe (Use LIVE keys in production)
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
# OR SendGrid:
SENDGRID_API_KEY="SG..."

# Rate Limiting (Upstash Redis)
UPSTASH_REDIS_REST_URL="https://..."
UPSTASH_REDIS_REST_TOKEN="..."

# Node Environment
NODE_ENV="production"
```

### Vercel Environment Variable Setup

1. Go to Vercel Dashboard → Settings → Environment Variables
2. Add all variables above
3. Select "Production" environment
4. Never use development/test keys in production
5. Rotate credentials every 90 days

---

## Security Best Practices for Developers

### DO:
✅ Always use parameterized queries (Prisma handles this)  
✅ Validate all user input with Zod schemas  
✅ Return generic error messages to clients  
✅ Hash passwords with bcrypt (never plain text)  
✅ Check authentication on protected routes  
✅ Use rate limiting on public endpoints  
✅ Keep dependencies updated (`npm audit fix`)  
✅ Test on localhost before deploying  
✅ Use HTTPS in production (enforced by headers)  

### DON'T:
❌ Log sensitive data (passwords, tokens, PII)  
❌ Expose error stack traces to clients  
❌ Store passwords in plain text  
❌ Use `console.log` for errors in production  
❌ Commit `.env` files to git  
❌ Use `SELECT *` queries unnecessarily  
❌ Trust client-side validation alone  
❌ Deploy without running security checks  
❌ Use test/development keys in production  

---

## Common Vulnerabilities We Protect Against

### 1. SQL Injection
**Protection:** Prisma ORM with parameterized queries
```typescript
// ✅ SAFE - Prisma handles parameterization
const user = await prisma.user.findUnique({
  where: { email: userEmail }
})
```

### 2. Cross-Site Scripting (XSS)
**Protection:** 
- React auto-escapes content
- Security headers (X-XSS-Protection)
- Never use `dangerouslySetInnerHTML` with user content

### 3. Cross-Site Request Forgery (CSRF)
**Protection:**
- NextAuth handles CSRF tokens
- Same-site cookies
- Origin checking on API routes

### 4. Brute Force Attacks
**Protection:**
- Rate limiting on all auth endpoints
- Account lockout after failed attempts
- Upstash Redis for distributed rate limiting

### 5. Clickjacking
**Protection:**
- X-Frame-Options: SAMEORIGIN header
- Content Security Policy

---

## Incident Response Plan

### If You Discover a Security Issue

**STOP** - Don't panic, but act quickly.

#### 1. Immediate Actions (Within 5 minutes)
- [ ] Identify the scope of the breach
- [ ] Document everything (screenshots, logs, timestamps)
- [ ] Notify team lead/security contact immediately
- [ ] Do NOT deploy any code until issue is understood

#### 2. Containment (Within 30 minutes)
- [ ] If actively being exploited, take site offline temporarily
- [ ] Rotate ALL credentials immediately:
  - Database passwords
  - API keys (Stripe, SendGrid/Resend, Upstash)
  - NextAuth secret
- [ ] Block malicious IPs if identified
- [ ] Save all logs for investigation

#### 3. Investigation (Within 24 hours)
- [ ] Review server logs
- [ ] Check database for unauthorized changes
- [ ] Identify how the breach occurred
- [ ] List all affected users/data

#### 4. Resolution (Within 48 hours)
- [ ] Fix the vulnerability
- [ ] Deploy patched code
- [ ] Verify fix works
- [ ] Monitor closely for 72 hours

#### 5. Disclosure (Within 72 hours)
- [ ] Notify affected users if PII was exposed (legal requirement)
- [ ] Document the incident internally
- [ ] Update security procedures to prevent recurrence

---

## Emergency Contacts

### Production Support
**Vercel Support:** https://vercel.com/support  
**Response Time:** Within 1 hour for paid plans

### Payment Processing
**Stripe Security:** security@stripe.com  
**Stripe Support:** https://support.stripe.com

### Email Service
**SendGrid Support:** https://support.sendgrid.com  
**Resend Support:** support@resend.com

### Database
**Supabase Support:** https://supabase.com/support  
**Response Time:** Within 4 hours for Pro plans

---

## How to Rotate Credentials Safely

### Database Password Rotation
```bash
# 1. Generate new password in Supabase Dashboard
# 2. Update DATABASE_URL and DIRECT_URL in Vercel
# 3. Redeploy application
# 4. Monitor for connection errors
# 5. Remove old password after 24 hours
```

### API Key Rotation (Stripe, SendGrid, etc.)
```bash
# 1. Generate new key in service dashboard
# 2. Add NEW key to Vercel environment variables (keep old one)
# 3. Deploy with both keys active
# 4. Monitor for 24 hours
# 5. Remove old key from environment variables
# 6. Revoke old key in service dashboard
```

### NextAuth Secret Rotation
```bash
# 1. Generate new secret: openssl rand -base64 32
# 2. Add as NEXTAUTH_SECRET in Vercel
# 3. Deploy new secret
# 4. All existing sessions will be invalidated (users must re-login)
```

---

## Monitoring & Alerts

### What to Monitor
- [ ] Failed login attempts (spikes indicate attack)
- [ ] API response times (degradation may indicate DDoS)
- [ ] Error rates (sudden increase indicates problem)
- [ ] Database connection pool usage
- [ ] Rate limit triggers (track IPs hitting limits)

### Recommended Tools
- **Vercel Analytics:** Built-in, tracks performance
- **Sentry:** Error tracking and alerting
- **UptimeRobot:** Site availability monitoring (free tier available)
- **LogRocket:** Session replay for debugging

---

## Backup & Recovery

### Database Backups
**Supabase:** Automatic daily backups (retained 7 days on Pro plan)

**Manual Backup:**
```bash
# Export database
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore from backup
psql $DATABASE_URL < backup-20251030.sql
```

### Code Backups
**Git Repository:** All code is version controlled
**Vercel Deployments:** Previous deployments retained indefinitely

### Rollback Procedure
```bash
# 1. Identify last working deployment in Vercel Dashboard
# 2. Click "Promote to Production" on that deployment
# 3. Verify site is working
# 4. Investigate issue in separate branch
```

---

## Compliance & Legal

### Data Protection Regulations
- **GDPR (EU):** User data rights (access, deletion, portability)
- **CCPA (California):** Consumer privacy rights
- **CAN-SPAM:** Email marketing compliance

### Nonprofit Specific
- **501(c)(3) Tax Receipts:** Automated via Stripe
- **Donor Privacy:** Option for anonymous donations
- **Payment Processing:** PCI DSS compliant via Stripe

---

## Security Testing

### Before Each Release
```bash
# 1. Run security audit
npm audit

# 2. Fix vulnerabilities
npm audit fix

# 3. Check for outdated packages
npm outdated

# 4. Manual testing checklist
```

### Manual Testing Checklist
- [ ] Try logging in with wrong password 6 times (should lock out)
- [ ] Try accessing /portal/admin without admin role (should deny)
- [ ] Try SQL injection in forms: `' OR '1'='1`
- [ ] Try XSS in forms: `<script>alert('xss')</script>`
- [ ] Verify HTTPS redirect works
- [ ] Test password reset flow
- [ ] Verify donation receipt email sends
- [ ] Check rate limiting on registration

---

## Questions?

If you have security questions or concerns:
1. Check this document first
2. Review the security guides in project root:
   - `PRODUCTION-LAUNCH-CHECKLIST.md`
   - `DONT-BE-STUPID-SECURITY-GUIDE.md`
3. Contact team lead or security contact
4. Never ignore potential security issues

**Remember:** Security is everyone's responsibility. When in doubt, ask!

---

**Last Security Audit:** [Add date after completing]  
**Next Scheduled Audit:** [Add date - recommend quarterly]

