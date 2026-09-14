'use client'

import { useMemo, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONTACT } from '@/config/content'
import { SITE } from '@/config/site'

/**
 * Enquiry form. Fields per brief section 8:
 * Name · Organization · Country · Enquiry type · Message
 *
 * NO BACKEND IS WIRED. The brief asks for reliable delivery with an
 * auto-acknowledgement, which needs a form endpoint (Formspree, Resend, or a
 * route handler plus a transactional sender). Until one is connected this
 * composes a mailto so nothing is silently swallowed, and says so plainly.
 *
 * To connect a real endpoint: replace the href on the submit control with an
 * onSubmit POST, and keep the field names below — they match what the client
 * asked to receive.
 */
export default function EnquiryForm() {
  const params = useSearchParams()
  const preset = params.get('enquiry')
  const initial = CONTACT.enquiryTypes.find((t) => t === preset) ?? 'General'

  const [name, setName] = useState('')
  const [org, setOrg] = useState('')
  const [country, setCountry] = useState('')
  const [type, setType] = useState<string>(initial)
  const [message, setMessage] = useState('')

  const mailto = useMemo(() => {
    const body = [
      `Name: ${name}`,
      `Organization: ${org}`,
      `Country: ${country}`,
      `Enquiry type: ${type}`,
      '',
      message,
    ].join('\n')
    const q = new URLSearchParams({ subject: `${type} enquiry — ${name || 'Website'}`, body })
    return `mailto:${SITE.email}?${q.toString()}`
  }, [name, org, country, type, message])

  const field =
    'w-full rounded-sm border border-line bg-surface/60 px-4 py-3.5 font-sans text-body text-body transition-colors duration-200 placeholder:text-muted-2 focus:border-gold focus:outline-none'
  const label = 'caption block'

  return (
    <form className="measure space-y-8" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="space-y-3">
          <label className={label} htmlFor="name">
            Name
          </label>
          <input id="name" name="name" className={field} value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className="space-y-3">
          <label className={label} htmlFor="organization">
            Organization
          </label>
          <input id="organization" name="organization" className={field} value={org} onChange={(e) => setOrg(e.target.value)} />
        </div>
        <div className="space-y-3">
          <label className={label} htmlFor="country">
            Country
          </label>
          <input id="country" name="country" className={field} value={country} onChange={(e) => setCountry(e.target.value)} />
        </div>
        <div className="space-y-3">
          <label className={label} htmlFor="enquiry-type">
            Enquiry type
          </label>
          <select
            id="enquiry-type"
            name="enquiryType"
            className={field}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {CONTACT.enquiryTypes.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="space-y-3">
        <label className={label} htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          className={`${field} resize-y`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <a
          href={mailto}
          className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 font-sans text-[15px] font-semibold text-[#12180F] transition-colors duration-200 hover:bg-gold-hi"
        >
          Send enquiry
        </a>
        <p className="text-[15px] text-muted">Opens in your email application.</p>
      </div>
    </form>
  )
}
