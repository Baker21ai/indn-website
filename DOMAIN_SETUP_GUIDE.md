# Setting Up Domain for Email (INDN)

## 🎯 Goal
Send emails to ANY email address (volunteers, board members, etc.)

## Current Situation
- ✅ Resend account created
- ✅ Email system built
- ❌ Can only send to: yamen.khabbaz@situ8.ai
- ❌ Need to verify domain to send to everyone

---

## Option 1: Request Production Access (EASIEST - 5 min)

### Steps:

1. Go to: https://resend.com/overview

2. Log in with your Resend account

3. Look for banner that says "Development Mode"

4. Click **"Request Production Access"** or **"Contact Support"**

5. Send this message:
```
Hi Resend team,

I'm building a nonprofit website for the Indigenous Nations Diversity Network (INDN).
We need to send transactional emails to volunteers and board members.

Can you please enable production access for my account?

Domain: indn-website.vercel.app
Use case: Volunteer notifications, event confirmations, welcome emails

Thank you!
Yamen
```

6. **Wait 24-48 hours** for approval

7. **Once approved**: You can send to ANY email! No code changes needed. ✅

---

## Option 2: Verify Your Own Domain (If you own indn.org)

### Do you own a custom domain?
- ✅ indn.org
- ✅ indigenousnationsdiversity.org
- ✅ Any domain you control

If YES, follow these steps:

### Step 1: Add Domain in Resend

1. Go to: https://resend.com/domains
2. Click **"Add Domain"**
3. Enter your domain (e.g., `indn.org`)
4. Click **"Add"**

### Step 2: Get DNS Records

Resend will show you 3 DNS records to add:

```
Type: TXT
Name: _resend
Value: [something like: resend_verify_abc123...]

Type: MX
Name: @
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10

Type: TXT  
Name: @
Value: [SPF record like: v=spf1 include:amazonses.com ~all]
```

### Step 3: Add Records to Your Domain Provider

**If domain is on Namecheap:**
1. Log in to Namecheap
2. Go to Domain List → Manage
3. Advanced DNS
4. Add the 3 records Resend gave you

**If domain is on GoDaddy:**
1. Log in to GoDaddy
2. My Products → DNS
3. Add the 3 records

**If domain is on Vercel (Custom Domain):**
1. Go to Vercel Dashboard
2. Your Project → Settings → Domains
3. Add custom domain (e.g., indn.org)
4. Then add DNS records at your domain registrar

### Step 4: Verify in Resend

1. Go back to Resend → Domains
2. Click **"Verify Domain"**
3. Wait for checkmarks (can take 5-30 minutes)

### Step 5: Update .env.local

Once verified, update your email config:

```env
# Change this line:
EMAIL_FROM=onboarding@resend.dev

# To this:
EMAIL_FROM=noreply@indn.org
```

Done! Now you can send to anyone! ✅

---

## Option 3: Use a Free Domain (If you don't have one)

If you don't own a domain yet:

1. **Get a free domain from**:
   - Vercel (comes with Pro plan)
   - Freenom (free domains)
   - Buy one: Namecheap ($8/year)

2. **Connect to Vercel**:
   - Vercel Dashboard → Settings → Domains
   - Add your domain
   - Vercel handles SSL automatically

3. **Then follow Option 2** above to verify with Resend

---

## Which Option Should You Choose?

### Choose Option 1 if:
- ✅ You want the quickest solution
- ✅ You don't have a custom domain yet
- ✅ You're okay waiting 24 hours

### Choose Option 2 if:
- ✅ You already own indn.org or similar
- ✅ You want professional email (noreply@indn.org)
- ✅ You want it working in 30 minutes

### Choose Option 3 if:
- ✅ You don't have a domain and want to buy one
- ✅ You want the most professional setup

---

## After Setup: Test It!

Once approved/verified, test by registering with a different email:

```bash
# Start server
cd "/Users/yamenk/Desktop/INDN Website/indn-website"
PORT=3002 npm run dev

# Visit: http://localhost:3002/register
# Use: volunteer@gmail.com (or any email!)
# Check that email for welcome message
```

---

## FAQ

**Q: How long does Resend approval take?**  
A: Usually 24-48 hours for production access

**Q: Do I need to change any code?**  
A: No! Once approved, the same code works for all emails

**Q: Can I use my Vercel domain (indn-website.vercel.app)?**  
A: No, you need production access OR your own domain (indn.org)

**Q: Will emails still work during approval?**  
A: Yes! They'll still send to yamen.khabbaz@situ8.ai for testing

**Q: Is this free?**  
A: Yes! Resend free tier: 3,000 emails/month (plenty for INDN)

---

## Need Help?

If you get stuck:
1. Check Resend documentation: https://resend.com/docs
2. Email Resend support: support@resend.com
3. They're usually very responsive!

---

**Recommendation: Start with Option 1 (Request Production Access) - it's the fastest!** 🚀

