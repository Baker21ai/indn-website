# INDN Email System Documentation

## ✅ System Status: ACTIVE

The email system is fully configured and ready to use!

## 📧 Email Functions Available

### 1. **Verification Email** (Auto-sent on registration)
- Sent when: User creates an account
- Contains: Email verification link (valid 24 hours)
- Function: `sendVerificationEmail(email, token)`

### 2. **Welcome Email** (Auto-sent on registration)
- Sent when: User successfully registers
- Contains: Role-specific welcome message and next steps
- Different content for: Volunteers, Board Members, Admins
- Function: `sendWelcomeEmail(email, name, role)`

### 3. **Password Reset Email** (Auto-sent on password reset request)
- Sent when: User clicks "Forgot Password"
- Contains: Password reset link (valid 1 hour)
- Function: `sendPasswordResetEmail(email, token)`

### 4. **Event Signup Confirmation** (Manual trigger needed)
- Sent when: Volunteer signs up for an event
- Contains: Event details, what happens next
- Function: `sendEventSignupConfirmation(email, name, eventName, eventDate, eventLocation?)`

### 5. **Shift Assignment Notification** (Manual trigger needed)
- Sent when: Admin assigns volunteer to a shift
- Contains: Shift details, time, location, instructions
- Function: `sendShiftAssignment(email, name, shiftDetails)`

### 6. **Admin Notifications** (Auto-sent on key events)
- Sent when: New user registers, system errors occur
- Sent to: Admin email (yamenmkbz@gmail.com by default)
- Function: `sendAdminNotification(type, details)`

## 🧪 Testing the Email System

### Quick Test (5 seconds)
```bash
cd /Users/yamenk/Desktop/INDN\ Website/indn-website
node scripts/test-email-system.js
```

This will send a test email to `yamen.khabbaz@situ8.ai` to verify the system works.

### Test by Registering a User

1. Start the dev server:
```bash
PORT=3002 npm run dev
```

2. Visit: http://localhost:3002/register

3. Create a test account:
   - Name: Test User
   - Email: your-test-email@example.com
   - Password: TestPassword123!
   - Role: Volunteer

4. You should receive 2 emails:
   - ✅ Verification email
   - ✅ Welcome email
   
5. Admin (yamen.khabbaz@situ8.ai) should receive:
   - ✅ New volunteer notification

### Test Password Reset

1. Visit: http://localhost:3002/forgot-password
2. Enter your test email
3. You should receive a password reset email

## 📝 How to Use Email Functions

### Example: Send Event Signup Confirmation

```typescript
import { sendEventSignupConfirmation } from '@/lib/email'

// After volunteer signs up for event
await sendEventSignupConfirmation(
  'volunteer@example.com',
  'John Doe',
  '3rd Annual Hollister Powwow',
  'April 19-20, 2025',
  'Veterans Memorial Building, Hollister, CA'
)
```

### Example: Send Shift Assignment

```typescript
import { sendShiftAssignment } from '@/lib/email'

// After admin assigns volunteer to shift
await sendShiftAssignment(
  'volunteer@example.com',
  'John Doe',
  {
    eventName: '3rd Annual Hollister Powwow',
    role: 'Registration Desk',
    date: 'April 19, 2025',
    startTime: '8:00 AM',
    endTime: '12:00 PM',
    location: 'Veterans Memorial Building - Main Entrance',
    instructions: 'Please arrive 15 minutes early for briefing.'
  }
)
```

### Example: Send Admin Notification

```typescript
import { sendAdminNotification } from '@/lib/email'

// Send custom admin alert
await sendAdminNotification('system_error', {
  title: 'Payment Processing Error',
  message: 'Failed to process donation from donor.',
  actionUrl: 'https://yourdomain.com/portal/admin/donations'
})
```

## 🔧 Configuration

### Environment Variables (already set in `.env.local`)

```env
RESEND_API_KEY=re_2oB4zzAw_3ZmNpbcJ8pfCFtx8w69H5xPN
EMAIL_FROM=onboarding@resend.dev
NEXTAUTH_URL=http://localhost:3002
ADMIN_EMAIL=yamen.khabbaz@situ8.ai  # Optional: defaults to this
```

### Customizing Admin Email

To send admin notifications to a different email, add to `.env.local`:
```env
ADMIN_EMAIL=your-admin-email@example.com
```

### Using Your Own Domain

1. Sign up at resend.com with your own account
2. Verify your domain (e.g., indn.org)
3. Update `.env.local`:
```env
EMAIL_FROM=noreply@indn.org
```

## 📂 File Locations

- **Email Functions**: `/src/lib/email.ts`
- **Registration Handler**: `/src/app/api/auth/register/route.ts`
- **Password Reset Handler**: `/src/app/api/auth/forgot-password/route.ts`
- **Test Script**: `/scripts/test-email-system.js`

## 🎨 Email Styling

All emails use:
- **Primary Color**: `#B85C38` (INDN brand color)
- **Font**: Arial, sans-serif
- **Max Width**: 600px (mobile-friendly)
- **Responsive**: Works on all devices

## 🚀 Next Steps

### To Wire Up Volunteer Emails:

1. Find the volunteer event signup route
2. Add email call after signup:
```typescript
await sendEventSignupConfirmation(email, name, eventName, eventDate, location)
```

3. Find the shift assignment route
4. Add email call after assignment:
```typescript
await sendShiftAssignment(email, name, shiftDetails)
```

### To Add More Email Types:

1. Open `/src/lib/email.ts`
2. Add new function following the existing pattern
3. Use the `resend.emails.send()` method
4. Match the styling of existing emails

## 🐛 Troubleshooting

### Emails Not Sending?

1. Check environment variables are set:
```bash
cat .env.local | grep RESEND
```

2. Check Resend dashboard for errors: https://resend.com/emails

3. Look at server logs for error messages

### Emails Going to Spam?

- This is normal for `onboarding@resend.dev` test domain
- Solution: Verify your own domain at resend.com

### Want to Test Without Sending Real Emails?

Comment out the `await resend.emails.send()` calls and log to console instead:
```typescript
console.log('Would send email to:', email, 'with subject:', subject)
return { success: true }
```

## 📊 Email Tracking

Currently: Basic logging to console
Future enhancement: Add database logging for all sent emails

Consider adding email_logs table to track:
- Email type
- Recipient
- Status (sent/failed)
- Timestamp
- Error messages

## ✨ Summary

**What's Working:**
- ✅ Email verification on registration
- ✅ Welcome emails (role-specific)
- ✅ Password reset emails
- ✅ Admin notifications
- ✅ Volunteer email functions ready (need to wire up to routes)

**What's Left:**
- 🔄 Wire event signup emails to actual signup forms
- 🔄 Wire shift assignment emails to admin actions
- 🔄 Add pre-event reminder emails (cron job needed)
- 🔄 Add email logging to database

---

**Questions?** Contact Yamen at yamen.khabbaz@situ8.ai

