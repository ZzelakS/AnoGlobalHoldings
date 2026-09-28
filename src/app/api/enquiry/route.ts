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

const TO_EMAIL =
  process.env.CONTACT_TO_EMAIL ||
  'contact@anoglobalholdings.com'

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
        {
          message:
            'Please complete the required fields.',
        },
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
            `The enquiry service is not configured yet. Please email ${TO_EMAIL} directly.`,
        },
        { status: 503 },
      )
    }

    const tag = `[${enquiryType}]`

    const headers = {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    }

    /*
     * --------------------------------------------
     * SEND ENQUIRY TO ANO GLOBAL
     * --------------------------------------------
     */
    const adminResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers,

        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,

          to: [TO_EMAIL],

          /*
           * When Ano Global clicks Reply,
           * the response goes directly to the visitor.
           */
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
      const resendError = await adminResponse.text()

      console.error(
        'Resend enquiry delivery failed:',
        resendError,
      )

      return NextResponse.json(
        {
          message:
            `We could not send your enquiry. Please try again or email ${TO_EMAIL}.`,
        },
        { status: 502 },
      )
    }

    /*
     * --------------------------------------------
     * SEND ACKNOWLEDGEMENT TO VISITOR
     * --------------------------------------------
     */
    const acknowledgementResponse = await fetch(
      'https://api.resend.com/emails',
      {
        method: 'POST',
        headers,

        body: JSON.stringify({
          from: process.env.RESEND_FROM_EMAIL,

          to: [email],

          /*
           * If the visitor replies to the
           * acknowledgement, it goes to Ano Global.
           */
          reply_to: TO_EMAIL,

          subject:
            `We received your ${enquiryType} enquiry`,

          text: [
            'Thank you for contacting Ano Global Holdings.',
            '',
            'Your enquiry has been received and will be routed to the appropriate part of the group.',
            '',
            `Enquiry type: ${enquiryType}`,
            '',
            'If you need to add anything to your enquiry, simply reply to this email.',
            '',
            'Ano Global Holdings',
            TO_EMAIL,
          ].join('\n'),
        }),
      },
    )

    /*
     * The enquiry itself was successfully delivered.
     * An acknowledgement failure should not make the
     * visitor think their original enquiry failed.
     */
    if (!acknowledgementResponse.ok) {
      console.error(
        'Enquiry acknowledgement failed:',
        await acknowledgementResponse.text(),
      )
    }

    return NextResponse.json({
      message:
        'Thank you. Your enquiry has been received.',
    })
  } catch (error) {
    console.error(
      'Enquiry submission error:',
      error,
    )

    return NextResponse.json(
      {
        message:
          `Unable to send your enquiry. Please try again or email ${TO_EMAIL}.`,
      },
      { status: 500 },
    )
  }
}