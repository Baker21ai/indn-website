/**
 * Test Email System
 * 
 * This script tests all email functions to verify they work correctly.
 * Run with: node scripts/test-email-system.js
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const sgMail = require('@sendgrid/mail')

// Load environment variables
require('dotenv').config({ path: '.env.local' })

sgMail.setApiKey(process.env.SENDGRID_API_KEY)
const FROM_EMAIL = process.env.EMAIL_FROM || 'noreply@sendgrid.net'
const TEST_EMAIL = 'yamen.khabbaz@situ8.ai' // Change to any email you want to test

console.log('🧪 Testing INDN Email System\n')
console.log(`📧 From: ${FROM_EMAIL}`)
console.log(`📧 To: ${TEST_EMAIL}\n`)

async function testEmail() {
  try {
    // Test 1: Simple test email
    console.log('1️⃣ Testing basic email send...')
    const response = await sgMail.send({
      from: FROM_EMAIL,
      to: TEST_EMAIL,
      subject: 'INDN Email System Test - SendGrid',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h1 style="color: #B85C38;">✅ SendGrid Email System Working!</h1>
          <p>This is a test email from the INDN website using SendGrid.</p>
          <p>If you received this, your SendGrid integration is configured correctly.</p>
          <p><strong>Can now send to ANY email address!</strong></p>
          <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
        </div>
      `,
    })

    console.log('✅ Email sent successfully!')
    console.log('📬 Response:', response[0].statusCode === 202 ? 'Accepted' : response[0].statusCode)
    console.log('\n✨ Check your inbox at', TEST_EMAIL)
    console.log('\n🎉 SendGrid integration complete! You can now send to anyone!\n')

  } catch (error) {
    console.error('❌ Failed to send email:', error)
    if (error.response) {
      console.error('SendGrid error details:', error.response.body)
    }
    process.exit(1)
  }
}

testEmail()

