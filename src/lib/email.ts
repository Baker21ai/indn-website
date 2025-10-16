import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@indn.org'
const BASE_URL = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function sendVerificationEmail(email: string, token: string) {
  const verifyUrl = `${BASE_URL}/verify-email?token=${token}`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Verify your email address',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B85C38;">Welcome to INDN!</h2>
          <p>Thank you for registering. Please verify your email address by clicking the button below:</p>
          <div style="margin: 30px 0;">
            <a href="${verifyUrl}"
               style="background-color: #B85C38; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            Or copy and paste this link into your browser:<br>
            <a href="${verifyUrl}" style="color: #B85C38;">${verifyUrl}</a>
          </p>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 24 hours. If you didn't create an account, you can safely ignore this email.
          </p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send verification email:', error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${BASE_URL}/reset-password?token=${token}`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: 'Reset your password',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #B85C38;">Reset Your Password</h2>
          <p>You requested to reset your password. Click the button below to create a new password:</p>
          <div style="margin: 30px 0;">
            <a href="${resetUrl}"
               style="background-color: #B85C38; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            Or copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #B85C38;">${resetUrl}</a>
          </p>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 1 hour. If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send password reset email:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(
  email: string,
  name: string,
  role: 'volunteer' | 'board_member' | 'admin'
) {
  const loginUrl = `${BASE_URL}/login`
  
  // Customize content based on role
  const roleContent = {
    volunteer: {
      title: 'Welcome to INDN, Volunteer!',
      greeting: `Hi ${name}!`,
      message: 'Thank you for joining the Indigenous Nations Diversity Network as a volunteer! We\'re excited to have you as part of our community.',
      nextSteps: `
        <h3 style="color: #B85C38; margin-top: 30px;">What's Next?</h3>
        <ul style="color: #333; line-height: 1.8;">
          <li><strong>Browse Events:</strong> Check out upcoming volunteer opportunities like the Hollister Powwow</li>
          <li><strong>Complete Your Profile:</strong> Add your skills and availability to help us match you with the right opportunities</li>
          <li><strong>Stay Connected:</strong> Watch for event announcements and shift assignments</li>
        </ul>
      `,
    },
    board_member: {
      title: 'Welcome to the INDN Board!',
      greeting: `Dear ${name},`,
      message: 'Welcome to the Indigenous Nations Diversity Network Board of Directors. We\'re honored to have you join our leadership team.',
      nextSteps: `
        <h3 style="color: #B85C38; margin-top: 30px;">Getting Started:</h3>
        <ul style="color: #333; line-height: 1.8;">
          <li><strong>Access Documents:</strong> Review planning documents and meeting notes in the board portal</li>
          <li><strong>View Analytics:</strong> Check donor and volunteer metrics in your dashboard</li>
          <li><strong>Coordinate Events:</strong> Manage volunteer assignments and event logistics</li>
          <li><strong>Post Announcements:</strong> Communicate with volunteers and other board members</li>
        </ul>
      `,
    },
    admin: {
      title: 'Admin Account Created',
      greeting: `Hi ${name},`,
      message: 'Your administrator account for the INDN website has been created. You have full access to all system features.',
      nextSteps: `
        <h3 style="color: #B85C38; margin-top: 30px;">Admin Capabilities:</h3>
        <ul style="color: #333; line-height: 1.8;">
          <li><strong>User Management:</strong> Create, edit, and manage all user accounts</li>
          <li><strong>Content Management:</strong> Upload documents and manage announcements</li>
          <li><strong>Donor Management:</strong> View donations and manage donor tiers</li>
          <li><strong>System Monitoring:</strong> Access logs and receive important notifications</li>
        </ul>
      `,
    },
  }

  const content = roleContent[role]

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: content.title,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #B85C38; margin: 0;">INDN</h1>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Indigenous Nations Diversity Network</p>
          </div>
          
          <h2 style="color: #B85C38;">${content.title}</h2>
          <p style="color: #333; font-size: 16px;">${content.greeting}</p>
          <p style="color: #333; line-height: 1.6;">${content.message}</p>
          
          ${content.nextSteps}
          
          <div style="margin: 40px 0; text-align: center;">
            <a href="${loginUrl}"
               style="background-color: #B85C38; color: white; padding: 14px 32px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
              Log In to Portal
            </a>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              <strong>Need Help?</strong><br>
              If you have any questions, please contact us at support@indn.org
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              This email was sent to ${email} because you created an account on the INDN website.
            </p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error }
  }
}

export async function sendEventSignupConfirmation(
  email: string,
  name: string,
  eventName: string,
  eventDate: string,
  eventLocation?: string
) {
  const portalUrl = `${BASE_URL}/portal/volunteer/events`

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Event Signup Confirmed: ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #B85C38; margin: 0;">INDN</h1>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Indigenous Nations Diversity Network</p>
          </div>
          
          <h2 style="color: #B85C38;">Thank You for Signing Up!</h2>
          <p style="color: #333; font-size: 16px;">Hi ${name},</p>
          <p style="color: #333; line-height: 1.6;">
            We've received your volunteer signup for <strong>${eventName}</strong>. We're excited to have you join us!
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #B85C38; margin-top: 0;">Event Details</h3>
            <p style="color: #333; margin: 10px 0;"><strong>Event:</strong> ${eventName}</p>
            <p style="color: #333; margin: 10px 0;"><strong>Date:</strong> ${eventDate}</p>
            ${eventLocation ? `<p style="color: #333; margin: 10px 0;"><strong>Location:</strong> ${eventLocation}</p>` : ''}
          </div>
          
          <h3 style="color: #B85C38;">What Happens Next?</h3>
          <ul style="color: #333; line-height: 1.8;">
            <li>Our volunteer coordinator will review your signup</li>
            <li>You'll receive an email with your specific shift assignment</li>
            <li>We'll send reminders before the event with details about parking, what to bring, and more</li>
          </ul>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${portalUrl}"
               style="background-color: #B85C38; color: white; padding: 12px 28px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
              View My Events
            </a>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              <strong>Questions?</strong><br>
              Contact our volunteer coordinator at volunteers@indn.org
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              Need to cancel or modify your signup? Log in to your portal or reply to this email.
            </p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send event signup confirmation:', error)
    return { success: false, error }
  }
}

export async function sendShiftAssignment(
  email: string,
  name: string,
  shiftDetails: {
    eventName: string
    role: string
    date: string
    startTime: string
    endTime: string
    location: string
    instructions?: string
  }
) {
  const portalUrl = `${BASE_URL}/portal/volunteer/events`
  const { eventName, role, date, startTime, endTime, location, instructions } =
    shiftDetails

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: `Shift Assignment: ${role} - ${eventName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #B85C38; margin: 0;">INDN</h1>
            <p style="color: #666; font-size: 14px; margin: 5px 0;">Indigenous Nations Diversity Network</p>
          </div>
          
          <h2 style="color: #B85C38;">Your Shift Assignment</h2>
          <p style="color: #333; font-size: 16px;">Hi ${name},</p>
          <p style="color: #333; line-height: 1.6;">
            You've been assigned to a volunteer shift for <strong>${eventName}</strong>. Thank you for your commitment!
          </p>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 25px 0;">
            <h3 style="color: #B85C38; margin-top: 0;">Shift Details</h3>
            <p style="color: #333; margin: 10px 0;"><strong>Role:</strong> ${role}</p>
            <p style="color: #333; margin: 10px 0;"><strong>Date:</strong> ${date}</p>
            <p style="color: #333; margin: 10px 0;"><strong>Time:</strong> ${startTime} - ${endTime}</p>
            <p style="color: #333; margin: 10px 0;"><strong>Location:</strong> ${location}</p>
          </div>
          
          ${
            instructions
              ? `
          <div style="background-color: #fff3e0; padding: 15px; border-left: 4px solid #B85C38; margin: 20px 0;">
            <h4 style="color: #B85C38; margin-top: 0;">Important Instructions:</h4>
            <p style="color: #333; margin: 0;">${instructions}</p>
          </div>
          `
              : ''
          }
          
          <h3 style="color: #B85C38;">What to Bring:</h3>
          <ul style="color: #333; line-height: 1.8;">
            <li>Comfortable shoes and weather-appropriate clothing</li>
            <li>Water bottle to stay hydrated</li>
            <li>Your enthusiasm and positive attitude!</li>
          </ul>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${portalUrl}"
               style="background-color: #B85C38; color: white; padding: 12px 28px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
              View Full Schedule
            </a>
          </div>
          
          <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd;">
            <p style="color: #666; font-size: 14px;">
              <strong>Can't Make It?</strong><br>
              Please let us know as soon as possible by replying to this email or contacting volunteers@indn.org
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              We'll send you reminders as the event approaches with additional details.
            </p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send shift assignment email:', error)
    return { success: false, error }
  }
}

export async function sendAdminNotification(
  type: 'new_user' | 'new_volunteer' | 'new_board_member' | 'system_error',
  details: {
    title: string
    message: string
    userName?: string
    userEmail?: string
    userRole?: string
    actionUrl?: string
  }
) {
  // Admin email - can be configured via environment variable
  const adminEmail = process.env.ADMIN_EMAIL || 'yamen.khabbaz@situ8.ai'
  const { title, message, userName, userEmail, userRole, actionUrl } = details

  // Icon and color based on notification type
  const notificationStyle = {
    new_user: { icon: '👤', color: '#4CAF50' },
    new_volunteer: { icon: '🙋', color: '#2196F3' },
    new_board_member: { icon: '👔', color: '#9C27B0' },
    system_error: { icon: '⚠️', color: '#F44336' },
  }

  const style = notificationStyle[type]

  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: adminEmail,
      subject: `[INDN Admin] ${title}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background-color: ${style.color}; color: white; padding: 20px; border-radius: 8px 8px 0 0;">
            <h2 style="margin: 0; font-size: 24px;">
              ${style.icon} ${title}
            </h2>
          </div>
          
          <div style="background-color: #f5f5f5; padding: 20px; border-radius: 0 0 8px 8px;">
            <p style="color: #333; font-size: 16px; margin-top: 0;">${message}</p>
            
            ${
              userName || userEmail || userRole
                ? `
            <div style="background-color: white; padding: 15px; border-radius: 4px; margin: 20px 0;">
              <h3 style="color: #B85C38; margin-top: 0; font-size: 16px;">User Details:</h3>
              ${userName ? `<p style="margin: 8px 0;"><strong>Name:</strong> ${userName}</p>` : ''}
              ${userEmail ? `<p style="margin: 8px 0;"><strong>Email:</strong> ${userEmail}</p>` : ''}
              ${userRole ? `<p style="margin: 8px 0;"><strong>Role:</strong> ${userRole}</p>` : ''}
            </div>
            `
                : ''
            }
            
            ${
              actionUrl
                ? `
            <div style="margin: 25px 0; text-align: center;">
              <a href="${actionUrl}"
                 style="background-color: #B85C38; color: white; padding: 12px 24px; text-decoration: none; border-radius: 4px; display: inline-block; font-weight: bold;">
                View in Admin Portal
              </a>
            </div>
            `
                : ''
            }
            
            <p style="color: #666; font-size: 13px; margin-bottom: 0;">
              This is an automated notification from the INDN website.<br>
              Timestamp: ${new Date().toLocaleString('en-US', {
                timeZone: 'America/Los_Angeles',
              })} PST
            </p>
          </div>
        </div>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Failed to send admin notification:', error)
    return { success: false, error }
  }
}
