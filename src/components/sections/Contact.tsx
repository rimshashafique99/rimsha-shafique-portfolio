import { FormEvent, useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Copy, Loader2, Mail, Send } from 'lucide-react';
import { siteConfig } from '@/src/data/siteConfig';
import { cn } from '@/src/lib/utils';

export type InquiryMode = 'hiring' | 'product';

const DISCUSSION_TOPICS = [
  'Full-Time / Contract Opportunity',
  'Web Application / SaaS Development',
  'MVP Development',
  'AI-Powered Application',
  'Other',
] as const;

type DiscussionTopic = (typeof DISCUSSION_TOPICS)[number];

interface FieldErrors {
  name?: string;
  email?: string;
  message?: string;
}

interface ContactProps {
  inquiryMode: InquiryMode;
  prefilledSubject?: string;
  onChangeInquiryMode: (mode: InquiryMode) => void;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function resolveTopicFromProps(mode: InquiryMode, prefilledSubject?: string): DiscussionTopic {
  if (prefilledSubject) {
    const lower = prefilledSubject.toLowerCase();
    if (lower.includes('mvp')) return 'MVP Development';
    if (lower.includes('ai')) return 'AI-Powered Application';
    if (lower.includes('saas') || lower.includes('web application')) {
      return 'Web Application / SaaS Development';
    }
    if (lower.includes('hiring') || lower.includes('role') || lower.includes('linkedin')) {
      return 'Full-Time / Contract Opportunity';
    }
  }
  return mode === 'hiring'
    ? 'Full-Time / Contract Opportunity'
    : 'Web Application / SaaS Development';
}

export function Contact({
  inquiryMode,
  prefilledSubject,
  onChangeInquiryMode,
}: ContactProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState<DiscussionTopic>(() =>
    resolveTopicFromProps(inquiryMode, prefilledSubject)
  );
  const [message, setMessage] = useState('');
  const [website, setWebsite] = useState(''); // Honeypot trap field
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const isSubmittingRef = useRef(false);

  useEffect(() => {
    setTopic(resolveTopicFromProps(inquiryMode, prefilledSubject));
  }, [inquiryMode, prefilledSubject]);

  useEffect(() => {
    if (prefilledSubject) {
      setMessage((prev) =>
        prev.trim() ? prev : `Hi Rimsha, I'd like to discuss ${prefilledSubject}.`
      );
      setSubmitted(false);
    }
  }, [prefilledSubject]);

  const configuredEmail = siteConfig.contact.email;

  const handleSelectPath = (mode: InquiryMode, defaultTopic: DiscussionTopic) => {
    onChangeInquiryMode(mode);
    setTopic(defaultTopic);
    setSubmitted(false);
    setError('');
    document.getElementById('contact-name')?.focus();
  };

  const handleSelectTopic = (selectedTopic: DiscussionTopic) => {
    setTopic(selectedTopic);
    if (selectedTopic === 'Full-Time / Contract Opportunity') {
      onChangeInquiryMode('hiring');
    } else if (selectedTopic !== 'Other') {
      onChangeInquiryMode('product');
    }
  };

  const validateFields = (): FieldErrors => {
    const errors: FieldErrors = {};
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (trimmedName.length < 2) {
      errors.name = 'Please enter your name (at least 2 characters).';
    }

    if (!trimmedEmail) {
      errors.email = 'Please enter your email address.';
    } else if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = 'Please enter a valid email address.';
    }

    if (trimmedMessage.length < 5) {
      errors.message = 'Please enter a brief message (at least 5 characters).';
    } else if (trimmedMessage.length > 5000) {
      errors.message = 'Message must be under 5,000 characters.';
    }

    return errors;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmittingRef.current) return;

    setError('');
    const validationErrors = validateFields();
    if (Object.keys(validationErrors).length > 0) {
      setFieldErrors(validationErrors);
      setError(
        validationErrors.name ||
          validationErrors.email ||
          validationErrors.message ||
          'Please check the highlighted fields.'
      );
      return;
    }

    setFieldErrors({});
    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          topic,
          inquiryMode,
          message: message.trim(),
          website,
        }),
      });

      let result: {
        ok?: boolean;
        error?: string;
        fieldErrors?: FieldErrors;
      } | null = null;

      try {
        result = await response.json();
      } catch {
        result = null;
      }

      if (!response.ok || !result?.ok) {
        if (result?.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
        setError(
          result?.error ||
            'Unable to send your message right now. Please try again or email rimshashafique1997@gmail.com directly.'
        );
        return;
      }

      setSubmitted(true);
    } catch {
      setError(
        'Network error while sending your message. Please check your connection and try again.'
      );
    } finally {
      isSubmittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = async () => {
    const summaryText = `To: ${siteConfig.fullName}\nFrom: ${name || 'Visitor'} (${
      email || 'email'
    })\nTopic: ${topic}\n\n${message}`;
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="scroll-mt-16 sm:scroll-mt-20 bg-[#111111] text-[#FFFFFF] py-20 sm:py-28 lg:py-32 px-4 sm:px-6 lg:px-10"
    >
      <div className="mx-auto max-w-[1280px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left CTA & Engagement Options Column */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-5">
              <p className="gsap-contact-reveal inline-flex items-center rounded-full bg-[#1A1A1A] border border-[#2A2A2A] px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-[0.1em] uppercase text-[#F04B1A]">
                READY WHEN YOU ARE
              </p>

              <h2
                id="contact-heading"
                className="gsap-contact-reveal font-display type-cta-title font-bold text-[#FFFFFF] text-balance"
              >
                Let&apos;s Build Something Meaningful.
              </h2>

              <p className="gsap-contact-reveal text-base sm:text-lg text-[#B5B3AE] leading-relaxed max-w-[46ch]">
                Have a product idea, a business problem to solve, or an opportunity to work
                together? Let&apos;s start a conversation.
              </p>
            </div>

            {/* Dual Orange CTA Buttons */}
            <div className="gsap-contact-reveal flex flex-col sm:flex-row flex-wrap gap-3.5 pt-2">
              <button
                type="button"
                onClick={() => handleSelectPath('hiring', 'Full-Time / Contract Opportunity')}
                className={cn(
                  'w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full text-sm sm:text-base font-medium px-5 sm:px-6 py-3.5 transition-colors duration-150 sm:whitespace-nowrap text-center cursor-pointer',
                  inquiryMode === 'hiring'
                    ? 'bg-[#F04B1A] hover:bg-[#D93E10] text-white'
                    : 'bg-[#1A1A1A] hover:bg-[#242424] border border-[#2E2E2E] text-white'
                )}
              >
                <span>Hiring me? Let&apos;s Connect.</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>

              <button
                type="button"
                onClick={() => handleSelectPath('product', 'Web Application / SaaS Development')}
                className={cn(
                  'w-full sm:w-auto min-h-[48px] inline-flex items-center justify-center gap-2 rounded-full text-sm sm:text-base font-medium px-5 sm:px-6 py-3.5 transition-colors duration-150 sm:whitespace-nowrap text-center cursor-pointer',
                  inquiryMode === 'product'
                    ? 'bg-[#F04B1A] hover:bg-[#D93E10] text-white'
                    : 'bg-[#1A1A1A] hover:bg-[#242424] border border-[#2E2E2E] text-white'
                )}
              >
                <span>Building a Product? Start a Conversation.</span>
                <ArrowUpRight className="w-4 h-4 shrink-0" aria-hidden="true" />
              </button>
            </div>

            {/* Prefer Email */}
            <div className="gsap-contact-reveal pt-5 border-t border-[#262626] space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#9A9893]">
                PREFER EMAIL?
              </p>
              {configuredEmail ? (
                <a
                  href={`mailto:${configuredEmail}`}
                  className="inline-flex items-center gap-2.5 text-sm font-medium text-white hover:text-[#F04B1A] transition-colors max-w-full"
                >
                  <Mail className="w-4 h-4 text-[#F04B1A] shrink-0" aria-hidden="true" />
                  <span className="underline underline-offset-4 break-all sm:break-normal">{configuredEmail}</span>
                </a>
              ) : (
                <p className="text-sm text-[#B5B3AE]">
                  Submit the form to send a direct message inquiry.
                </p>
              )}
            </div>
          </div>

          {/* Right Functional Inquiry Form */}
          <div className="gsap-contact-reveal lg:col-span-6">
            <div className="rounded-[24px] bg-[#1A1A1A] border border-[#262626] p-6 sm:p-8 lg:p-9">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 mb-6 border-b border-[#262626]">
                <div>
                  <p className="text-xs uppercase tracking-[0.1em] text-[#F04B1A] font-semibold">
                    GET IN TOUCH
                  </p>
                  <p className="font-display text-lg font-semibold text-white mt-1">
                    {inquiryMode === 'hiring'
                      ? 'Engineering Role & Team Fit'
                      : 'Product, SaaS, or MVP Build'}
                  </p>
                </div>

                <div
                  role="group"
                  aria-label="Inquiry type"
                  className="inline-flex rounded-full bg-[#111111] p-1 border border-[#262626]"
                >
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSelectPath('hiring', 'Full-Time / Contract Opportunity')}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed',
                      inquiryMode === 'hiring'
                        ? 'bg-[#F04B1A] text-white'
                        : 'text-[#A09E99] hover:text-white'
                    )}
                  >
                    Hiring
                  </button>
                  <button
                    type="button"
                    disabled={isSubmitting}
                    onClick={() => handleSelectPath('product', 'Web Application / SaaS Development')}
                    className={cn(
                      'px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed',
                      inquiryMode === 'product'
                        ? 'bg-[#F04B1A] text-white'
                        : 'text-[#A09E99] hover:text-white'
                    )}
                  >
                    Product
                  </button>
                </div>
              </div>

              {submitted ? (
                <div role="status" aria-live="polite" className="py-6 space-y-5">
                  <div className="w-12 h-12 rounded-full bg-[#F04B1A]/15 border border-[#F04B1A]/40 flex items-center justify-center text-[#F04B1A]">
                    <Check className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-xl font-bold text-white">
                      Message sent to Rimsha
                    </h3>
                    <p className="text-sm text-[#B5B3AE] leading-relaxed">
                      Thank you for reaching out. Your message has been delivered to my inbox, and
                      I will get back to you soon.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCopySummary}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4" aria-hidden="true" />
                          <span>Copied Summary</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" aria-hidden="true" />
                          <span>Copy Inquiry Summary</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setMessage('');
                        setError('');
                        setFieldErrors({});
                      }}
                      className="inline-flex items-center rounded-full bg-[#111111] hover:bg-[#222222] border border-[#2E2E2E] text-white text-sm font-medium px-5 py-2.5 transition-colors cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="relative space-y-4">
                  {/* Honeypot spam trap — hidden from real visitors & screen readers */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -left-[9999px] top-auto h-px w-px overflow-hidden opacity-0"
                  >
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="new-password"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-name"
                        className="block text-xs font-medium text-[#B5B3AE]"
                      >
                        Your Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        required
                        disabled={isSubmitting}
                        aria-invalid={Boolean(fieldErrors.name)}
                        aria-describedby={fieldErrors.name ? 'contact-form-error' : undefined}
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (fieldErrors.name) {
                            setFieldErrors((prev) => ({ ...prev, name: undefined }));
                          }
                          if (error) setError('');
                        }}
                        placeholder="Enter your name"
                        className={cn(
                          'w-full rounded-xl bg-[#111111] border focus:border-[#F04B1A] focus:outline-none px-4 py-3 text-base sm:text-sm text-white placeholder:text-[#8A8883] transition-colors disabled:opacity-60',
                          fieldErrors.name ? 'border-[#F04B1A]' : 'border-[#2C2C2C]'
                        )}
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="contact-email"
                        className="block text-xs font-medium text-[#B5B3AE]"
                      >
                        Email Address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        disabled={isSubmitting}
                        aria-invalid={Boolean(fieldErrors.email)}
                        aria-describedby={fieldErrors.email ? 'contact-form-error' : undefined}
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (fieldErrors.email) {
                            setFieldErrors((prev) => ({ ...prev, email: undefined }));
                          }
                          if (error) setError('');
                        }}
                        placeholder="Enter your email"
                        className={cn(
                          'w-full rounded-xl bg-[#111111] border focus:border-[#F04B1A] focus:outline-none px-4 py-3 text-base sm:text-sm text-white placeholder:text-[#8A8883] transition-colors disabled:opacity-60',
                          fieldErrors.email ? 'border-[#F04B1A]' : 'border-[#2C2C2C]'
                        )}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="block text-xs font-medium text-[#B5B3AE]">
                      What would you like to discuss?
                    </span>
                    <div
                      role="radiogroup"
                      aria-label="What would you like to discuss?"
                      className="flex flex-wrap gap-2"
                    >
                      {DISCUSSION_TOPICS.map((option) => {
                        const isSelected = topic === option;
                        return (
                          <button
                            key={option}
                            type="button"
                            role="radio"
                            aria-checked={isSelected}
                            disabled={isSubmitting}
                            onClick={() => handleSelectTopic(option)}
                            className={cn(
                              'rounded-full px-3.5 py-2 text-xs font-medium border transition-colors duration-150 cursor-pointer text-left disabled:opacity-60 disabled:cursor-not-allowed',
                              isSelected
                                ? 'bg-[#F04B1A] border-[#F04B1A] text-white'
                                : 'bg-[#111111] border-[#2C2C2C] text-[#CCCCCC] hover:border-[#444444] hover:text-white'
                            )}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="contact-message"
                      className="block text-xs font-medium text-[#B5B3AE]"
                    >
                      Tell me a little more about it
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={4}
                      required
                      disabled={isSubmitting}
                      aria-invalid={Boolean(fieldErrors.message)}
                      aria-describedby={fieldErrors.message ? 'contact-form-error' : undefined}
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        if (fieldErrors.message) {
                          setFieldErrors((prev) => ({ ...prev, message: undefined }));
                        }
                        if (error) setError('');
                      }}
                      placeholder={
                        inquiryMode === 'hiring'
                          ? 'Share details about the role, team, and timeline...'
                          : 'Share a bit about your product idea, goals, or scope...'
                      }
                      className={cn(
                        'w-full rounded-xl bg-[#111111] border focus:border-[#F04B1A] focus:outline-none px-4 py-3 text-base sm:text-sm text-white placeholder:text-[#8A8883] transition-colors resize-none disabled:opacity-60',
                        fieldErrors.message ? 'border-[#F04B1A]' : 'border-[#2C2C2C]'
                      )}
                    />
                  </div>

                  {error && (
                    <p id="contact-form-error" role="alert" className="text-xs font-medium text-[#F04B1A]">
                      {error}
                    </p>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      aria-busy={isSubmitting}
                      className="inline-flex items-center gap-2 rounded-full bg-[#F04B1A] hover:bg-[#D93E10] text-white text-sm font-medium px-6 py-3 transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                          <span>Sending Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" aria-hidden="true" />
                          <span>Start a Conversation</span>
                        </>
                      )}
                    </button>

                    <span className="text-xs text-[#8A8883]">
                      Direct response. No automated bots.
                    </span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
