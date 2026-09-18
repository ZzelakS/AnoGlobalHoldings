'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CONTACT } from '@/config/content'

export default function EnquiryForm() {
  const params = useSearchParams()
  const preset = params.get('enquiry')
  const initial = CONTACT.enquiryTypes.find((t) => t === preset) ?? 'Other'
  const [form, setForm] = useState({ name: '', organization: '', country: '', email: '', enquiryType: initial, message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle')
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    if (preset && CONTACT.enquiryTypes.includes(preset as typeof CONTACT.enquiryTypes[number])) setForm((f) => ({ ...f, enquiryType: preset as typeof f.enquiryType }))
  }, [preset])

  const field = 'w-full rounded-sm border border-line bg-surface/60 px-4 py-3.5 font-sans text-body text-body transition-colors duration-200 placeholder:text-muted-2 focus:border-gold focus:outline-none'
  const label = 'caption block'
  const update = (key: keyof typeof form, value: string) => setForm((f) => ({ ...f, [key]: value }))

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('sending'); setFeedback('')
    try {
      const res = await fetch('/api/enquiry', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Unable to send enquiry.')
      setStatus('success'); setFeedback(data.message); setForm({ name:'', organization:'', country:'', email:'', enquiryType:'Other', message:'' })
    } catch (err) { setStatus('error'); setFeedback(err instanceof Error ? err.message : 'Unable to send enquiry. Please try again.') }
  }

  return <form className="measure space-y-8" onSubmit={submit}>
    <div className="grid gap-8 sm:grid-cols-2">
      {([['name','Name'],['organization','Organization'],['country','Country'],['email','Email']] as const).map(([key,text]) => <div key={key} className="space-y-3"><label className={label} htmlFor={key}>{text}</label><input id={key} name={key} type={key==='email'?'email':'text'} required={key==='name'||key==='email'} className={field} value={form[key]} onChange={e=>update(key,e.target.value)} /></div>)}
      <div className="space-y-3 sm:col-span-2"><label className={label} htmlFor="enquiry-type">Enquiry type</label><select id="enquiry-type" name="enquiryType" required className={field} value={form.enquiryType} onChange={e=>update('enquiryType',e.target.value)}>{CONTACT.enquiryTypes.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
    </div>
    <div className="space-y-3"><label className={label} htmlFor="message">Message</label><textarea id="message" name="message" rows={6} required className={`${field} resize-y`} value={form.message} onChange={e=>update('message',e.target.value)} /></div>
    <div className="flex flex-wrap items-center gap-6"><button disabled={status==='sending'} type="submit" className="inline-flex items-center gap-3 rounded-sm bg-gold px-8 py-4 font-sans text-[15px] font-semibold text-[#12180F] transition-colors duration-200 hover:bg-gold-hi disabled:cursor-wait disabled:opacity-60">{status==='sending'?'Sending…':'Send enquiry'}</button>{feedback&&<p role="status" className={`text-[15px] ${status==='error'?'text-red-300':'text-body'}`}>{feedback}</p>}</div>
  </form>
}
