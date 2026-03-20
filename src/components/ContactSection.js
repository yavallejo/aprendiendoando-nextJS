'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useLanguage } from '@/components/LanguageProvider'
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare } from 'lucide-react'

export function ContactSection() {
  const { t, lang } = useLanguage()
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, lang }),
      })

      if (!response.ok) {
        throw new Error(t('contact.submitErrorClient'))
      }

      setSubmitStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })

      // GA4 conversion event: lead generated from contact form
      if (
        measurementId &&
        typeof window !== 'undefined' &&
        typeof window.gtag === 'function'
      ) {
        window.gtag('event', 'generate_lead', {
          send_to: measurementId,
          lead_source: 'contact_form',
        })
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="relative py-12 md:py-16">
      <div className="px-6 mx-auto max-w-6xl">
        <div className="grid gap-12 items-start lg:grid-cols-2">
          {/* Left side - Info */}
          <div>
            <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-wider uppercase rounded-full border text-muted-foreground border-border/50">
              {t('contact.badge')}
            </span>
            <h2 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              <span className="dark:gradient-text gradient-text-light">
                {t('contact.titleLine1')}
              </span>
              <br />
              <span className="text-muted-foreground">
                {t('contact.titleLine2')}
              </span>
            </h2>
            <p className="mb-10 max-w-md text-lg text-muted-foreground">
              {t('contact.intro')}
            </p>

            {/* Contact options */}
            <div className="space-y-6">
              <div className="flex gap-4 items-start">
                <div className="flex shrink-0 justify-center items-center w-12 h-12 rounded-xl bg-accent/50 text-foreground">
                  <Mail size={22} />
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-foreground">{t('contact.emailTitle')}</h3>
                  <p className="text-muted-foreground">
                    {t('contact.emailSubtitle')}
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="flex shrink-0 justify-center items-center w-12 h-12 rounded-xl bg-accent/50 text-foreground">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h3 className="mb-1 font-medium text-foreground">{t('contact.freelanceTitle')}</h3>
                  <p className="text-muted-foreground">
                    {t('contact.freelanceSubtitle')}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Form */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-3xl bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent-brand))/0.35,transparent_55%),radial-gradient(circle_at_100%_100%,hsl(var(--accent-brand))/0.35,transparent_55%)] opacity-60 blur-2xl pointer-events-none" />

            <Card className="relative p-8 border-border/60 bg-[radial-gradient(circle_at_0%_0%,hsl(var(--accent-brand))/0.11,transparent_55%),radial-gradient(circle_at_100%_100%,hsl(var(--accent-brand))/0.12,transparent_55%),linear-gradient(to_bottom_right,hsl(var(--card)),hsl(var(--background)))] shadow-[0_24px_80px_rgba(0,0,0,0.35)] rounded-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 text-xs font-medium tracking-[0.18em] uppercase rounded-full border bg-background/60 border-border/60 text-muted-foreground/90">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[hsl(var(--accent-brand))] shadow-[0_0_0_4px_rgba(255,255,255,0.18)]" />
                {t('contact.formBadge')}
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium">
                      {t('contact.labelName')}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t('contact.placeholderName')}
                      className="h-12 bg-background/70 border-border/60 focus:border-[hsl(var(--accent-brand))] focus:ring-2 focus:ring-[hsl(var(--accent-brand))]/40 focus-visible:ring-[hsl(var(--accent-brand))]/40"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium">
                      {t('contact.labelEmail')}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('contact.placeholderEmail')}
                      className="h-12 bg-background/70 border-border/60 focus:border-[hsl(var(--accent-brand))] focus:ring-2 focus:ring-[hsl(var(--accent-brand))]/40 focus-visible:ring-[hsl(var(--accent-brand))]/40"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-medium">
                    {t('contact.labelCompany')}{' '}
                    <span className="text-muted-foreground">{t('contact.labelCompanyOptional')}</span>
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    type="text"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder={t('contact.placeholderCompany')}
                    className="h-12 bg-background/70 border-border/60 focus:border-[hsl(var(--accent-brand))] focus:ring-2 focus:ring-[hsl(var(--accent-brand))]/40 focus-visible:ring-[hsl(var(--accent-brand))]/40"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-sm font-medium">
                    {t('contact.labelMessage')}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder={t('contact.placeholderMessage')}
                    rows={5}
                    className="bg-background/70 border-border/60 focus:border-[hsl(var(--accent-brand))] focus:ring-2 focus:ring-[hsl(var(--accent-brand))]/40 focus-visible:ring-[hsl(var(--accent-brand))]/40 resize-none"
                  />
                </div>

                {/* Status messages */}
                {submitStatus === 'success' && (
                  <div className="flex gap-3 items-center p-4 text-green-600 rounded-xl border bg-green-500/10 border-green-500/20 dark:text-green-400">
                    <CheckCircle size={20} />
                    <span>{t('contact.success')}</span>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="flex gap-3 items-center p-4 text-red-600 rounded-xl border bg-red-500/10 border-red-500/20 dark:text-red-400">
                    <AlertCircle size={20} />
                    <span>{t('contact.error')}</span>
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-full bg-[hsl(var(--accent-brand))] text-[hsl(var(--accent-brand-foreground))] hover:bg-[hsl(var(--accent-brand))]/90 shadow-[0_14px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_18px_55px_rgba(0,0,0,0.55)] transition-shadow"
                >
                  {isSubmitting ? (
                    <span className="flex gap-2 items-center">
                      <span className="w-4 h-4 border-2 border-[hsl(var(--accent-brand-foreground))]/30 border-t-[hsl(var(--accent-brand-foreground))] rounded-full animate-spin" />
                      {t('contact.sending')}
                    </span>
                  ) : (
                    <span className="flex gap-2 items-center">
                      <Send size={18} />
                      {t('contact.submit')}
                    </span>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
