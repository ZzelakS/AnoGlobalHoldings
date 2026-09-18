import { NextResponse } from 'next/server'

const ALLOWED = [
  'Energy & Mobility', 'Security Systems', 'Agriculture & Food Systems',
  'Construction & Building Supply', 'Partnership & Investment',
  'Government & Development Finance', 'Manufacturer — African market access',
  'Foundation & Programmes', 'Speaking', 'Media & Press', 'Other',
] as const

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, organization, country, email, enquiryType, message } = body ?? {}
    if (!name || !email || !message || !ALLOWED.includes(enquiryType)) {
      return NextResponse.json({ message: 'Please complete the required fields.' }, { status: 400 })
    }
    if (!process.env.RESEND_API_KEY || !process.env.RESEND_FROM_EMAIL) {
      return NextResponse.json({ message: 'The enquiry service is not configured yet. Please email contact@anoglobalholdings.com directly.' }, { status: 503 })
    }

    const to = 'contact@anoglobalholdings.com'
    const tag = `[${enquiryType}]`
    const common = { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }
    const admin = await fetch('https://api.resend.com/emails', { method: 'POST', headers: common, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [to], reply_to: email, subject: `${tag} Website enquiry — ${name}`, text: `Enquiry type: ${enquiryType}\nName: ${name}\nOrganization: ${organization || '—'}\nCountry: ${country || '—'}\nEmail: ${email}\n\n${message}` }) })
    if (!admin.ok) return NextResponse.json({ message: 'We could not send your enquiry. Please try again or email contact@anoglobalholdings.com.' }, { status: 502 })

    await fetch('https://api.resend.com/emails', { method: 'POST', headers: common, body: JSON.stringify({ from: process.env.RESEND_FROM_EMAIL, to: [email], subject: `We received your ${enquiryType} enquiry`, text: `Thank you for contacting Ano Global Holdings. Your enquiry has been received and will be routed to the appropriate part of the group.\n\nEnquiry type: ${enquiryType}\n\nAno Global Holdings\ncontact@anoglobalholdings.com` }) })
    return NextResponse.json({ message: 'Thank you. Your enquiry has been received.' })
  } catch { return NextResponse.json({ message: 'Unable to send your enquiry. Please try again.' }, { status: 500 }) }
}
