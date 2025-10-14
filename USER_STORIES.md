# User Stories: Volunteer Registration

## High School Volunteer Sign-Up Flow

### Story 1: First-Time Volunteer Registration
**As a** high school student interested in volunteering
**I want to** easily create an account on the INDN website
**So that** I can sign up for events like the Hollister Powwow

**Acceptance Criteria:**
- [ ] I can access the registration page from a direct link
- [ ] I can enter my name, email, phone, and create a password
- [ ] I can select "Volunteer" as my role
- [ ] The form validates my information (email format, password strength)
- [ ] I receive immediate confirmation when my account is created
- [ ] I'm automatically redirected to login after registration

**User Journey:**
1. Student receives link: `https://indn-website.vercel.app/register`
2. Opens link and sees "Join INDN" registration form
3. Fills out: Name, Email, Phone (optional), Password
4. Selects "I am registering as a: Volunteer"
5. Clicks "Create Account"
6. Sees success message: "Registration Successful! Redirecting you to login..."
7. Automatically taken to login page
8. Logs in with new credentials
9. Lands in volunteer portal dashboard

---

### Story 2: Volunteer Logs In After Registration
**As a** newly registered volunteer
**I want to** log into my account
**So that** I can access the volunteer portal and see available events

**Acceptance Criteria:**
- [ ] I can log in with the email and password I just created
- [ ] After login, I see the volunteer dashboard
- [ ] I can view my profile information
- [ ] I can see available volunteer opportunities (events)

**User Journey:**
1. Goes to login page: `https://indn-website.vercel.app/login`
2. Enters email and password
3. Clicks "Sign In"
4. Lands on volunteer dashboard at `/portal/volunteer/dashboard`
5. Sees welcome message and navigation to Events, Profile

---

### Story 3: Volunteer Signs Up for Event
**As a** registered volunteer
**I want to** browse and sign up for volunteer opportunities
**So that** I can help at events like the Hollister Powwow

**Acceptance Criteria:**
- [ ] I can see a list of upcoming events
- [ ] Each event shows date, location, and volunteer roles needed
- [ ] I can sign up for specific volunteer roles
- [ ] I receive confirmation when I sign up for an event

**User Journey:**
1. From volunteer dashboard, clicks "Events" in navigation
2. Sees "3rd Annual Hollister Powwow - April 2025"
3. Views available volunteer roles (setup, vendor support, registration, parking)
4. Clicks "Sign Up" for a role
5. Receives confirmation message
6. Event appears in their dashboard under "My Events"

---

## Simple Registration Flow Summary

**For sharing with students:**

1. **Get the link**: Share `https://indn-website.vercel.app/register`
2. **Sign up**: Fill out name, email, password (takes 1 minute)
3. **Log in**: Use credentials to access volunteer portal
4. **Sign up for events**: Browse and register for volunteer opportunities

---

## Technical Requirements

### Registration Page (`/register`)
- ✅ Built and functional
- ✅ Form validation (React Hook Form + Zod)
- ✅ Password requirements: min 8 characters
- ✅ Role selection: Volunteer or Board Member
- ✅ Creates user account in database
- ✅ Redirects to login after success

### Login Page (`/login`)
- ✅ Built and functional
- ✅ Credentials authentication via NextAuth
- ✅ Redirects to role-specific portal after login
- ✅ Volunteer → `/portal/volunteer/dashboard`

### Volunteer Portal (`/portal/volunteer/*`)
- ✅ Dashboard with overview
- ✅ Profile page for viewing/editing personal info
- ✅ Events page for browsing opportunities
- 🔄 Event sign-up functionality (to be enhanced)

### Email Notifications
- ✅ Resend configured for email delivery
- 🔄 Welcome email after registration (optional enhancement)
- 🔄 Event confirmation email (optional enhancement)

---

## Key Links for Students

| Purpose | URL |
|---------|-----|
| Sign Up | `https://indn-website.vercel.app/register` |
| Log In | `https://indn-website.vercel.app/login` |
| Volunteer Landing | `https://indn-website.vercel.app/volunteer` |

**Note:** Replace `indn-website.vercel.app` with actual Vercel URL after deployment
