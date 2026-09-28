import { NextResponse } from 'next/server'

const ALLOWED = [
  'Energy & Mobility',
  'Security Systems',
  'Agriculture & Food Systems',
  'Construction & Building Supply',
  'Partnership & Investment',
  'Government & Development Finance',
  'Manufacturer — African market access',
  'Foundation & Programmes',
  'Speaking',
  'Media & Press',
  'Other',
] as const

const TO_EMAIL = 'info@anoglobalholdings.com'

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const {
      name,
      organization,
      country,
      email,
      enquiryType,
      message,
    } = body ?? {}

    if (
      !name ||
      !email ||
      !message ||
      !enquiryType ||
      !ALLOWED.includes(enquiryType)
    ) {
      return NextResponse.json(
        { message: 'Please complete the required fields.' },
        { status: 400 },
      )
    }

    if (
      !process.env.RESEND_API_KEY ||
      !process.env.RESEND_FROM_EMAIL
    ) {
      return NextResponse.json(
        {
          message:
            'The enquiry service is not configured yet. Please email info@anoglobalholdings.com directly.',
        },
        { status: 503 },
      )
    }

    const tag = `[${enquiryType}]`

    const headers = {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    }

    // Send enquiry to Ano Global
    const adminResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,
          to: [TO_EMAIL],
          reply_to: email,
          subject: `${tag} Website enquiry — ${name}`,
          text: [
            `Enquiry type: ${enquiryType}`,
            `Name: ${name}`,
            `Organization: ${organization || '—'}`,
            `Country: ${country || '—'}`,
            `Email: ${email}`,
            '',
            'Message:',
            message,
          ].join('\n'),
        }),
      },
    )

    if (!adminResponse.ok) {
      return NextResponse.json(
        {
          message:
            'We could not send your enquiry. Please try again or email info@anoglobalholdings.com.',
        },
        { status: 502 },
      )
    }

    // Send acknowledgement to the person who submitted the form
    const acknowledgementResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers,
        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,
          to: [email],
          subject: `We received your ${enquiryType} enquiry`,
          text: [
            'Thank you for contacting Ano Global Holdings.',
            '',
            'Your enquiry has been received and will be routed to the appropriate part of the group.',
            '',
            `Enquiry type: ${enquiryType}`,
            '',
            'Ano Global Holdings',
            'info@anoglobalholdings.com',
          ].join('\n'),
        }),
      },
    )

    // The enquiry itself was successfully delivered.
    // An acknowledgement failure should not make the user's enquiry appear failed.
    if (!acknowledgementResponse.ok) {
      console.error(
        'Enquiry acknowledgement failed:',
        await acknowledgementResponse.text(),
      )
    }

    return NextResponse.json({
      message: 'Thank you. Your enquiry has been received.',
    })
  } catch (error) {
    console.error('Enquiry submission error:', error)

    return NextResponse.json(
      {
        message:
          'Unable to send your enquiry. Please try again or email info@anoglobalholdings.com.',
      },
      { status: 500 },
    )
  }
}