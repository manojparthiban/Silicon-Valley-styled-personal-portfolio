import React, { useEffect, useState } from "react";
import { m } from "framer-motion";
import { ArrowUp, ArrowUpRight, Check, Copy, Github, Linkedin, Mail, RotateCw, Send, Twitter } from "lucide-react";
import { Label, SectionHeader, reveal } from "@/components/common/SectionBits";

type FormValues = { name: string; email: string; message: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;
type Status = "idle" | "sending" | "sent" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const EMAIL = "manojparthiban2002@gmail.com";

const validate = ({ name, email, message }: FormValues): FormErrors => {
  const errors: FormErrors = {};
  if (name.length < 2) errors.name = "Name must be at least 2 characters";
  if (!EMAIL_RE.test(email)) errors.email = "Invalid email address";
  if (message.length < 10) errors.message = "Message must be at least 10 characters";
  return errors;
};

const readForm = (form: HTMLFormElement): FormValues => {
  const data = new FormData(form);
  return {
    name: String(data.get("name") ?? ""),
    email: String(data.get("email") ?? ""),
    message: String(data.get("message") ?? ""),
  };
};

interface ContactSectionProps {
  socialLinks?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

/* ── Live IST clock for the card back ── */
const useIndiaTime = () => {
  const [time, setTime] = useState("");
  useEffect(() => {
    const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Asia/Kolkata" });
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 30_000);
    return () => window.clearInterval(id);
  }, []);
  return time;
};

/* ── 3D business card: flips on hover (mouse) or with the button ── */
const FlipCard = () => {
  const [flipped, setFlipped] = useState(false);
  const time = useIndiaTime();

  return (
    <div className={`flip ${flipped ? "is-flipped" : ""}`}>
      <div className="flip__inner">
        <div className="flip__face flip__face--front" aria-hidden={flipped}>
          <div className="flip__row">
            <span className="flip__mono">MP</span>
            <span className="flip__tag">SAP · Back-end</span>
          </div>
          <div className="flip__id">
            <img src="/images/profile/avatar.webp" alt="" width={64} height={64} loading="lazy" decoding="async" />
            <div>
              <p className="flip__name">Manoj Parthiban</p>
              <p className="flip__role">SAP ABAP Developer @ Si2 Technologies</p>
            </div>
          </div>
          <div className="flip__row flip__row--foot">
            <span>manojparthiban.vercel.app</span>
            <span>Vadodara, IN</span>
          </div>
        </div>

        <div className="flip__face flip__face--back" aria-hidden={!flipped}>
          <p className="flip__mono">// reach me</p>
          <dl className="flip__facts">
            <div>
              <dt>email</dt>
              <dd>{EMAIL}</dd>
            </div>
            <div>
              <dt>based</dt>
              <dd>Vadodara, Gujarat, IN</dd>
            </div>
            <div>
              <dt>hometown</dt>
              <dd>Tiruchirappalli, Tamil Nadu</dd>
            </div>
            <div>
              <dt>local time</dt>
              <dd>{time} IST (UTC+5:30)</dd>
            </div>
          </dl>
        </div>
      </div>

      <button type="button" className="flip__toggle" onClick={() => setFlipped((f) => !f)} aria-pressed={flipped}>
        <RotateCw className="w-3.5 h-3.5" />
        {flipped ? "front" : "flip card"}
      </button>
    </div>
  );
};

const ContactSection = ({
  socialLinks = {
    github: "https://github.com/manojparthiban",
    linkedin: "https://www.linkedin.com/in/manoj-parthi31",
    twitter: "https://twitter.com/ImMj31",
    email: `mailto:${EMAIL}`,
  },
}: ContactSectionProps) => {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  // After the first submit attempt, re-validate as the user types
  const onChange = (e: React.FormEvent<HTMLFormElement>) => {
    if (submitted) setErrors(validate(readForm(e.currentTarget)));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = readForm(form);
    const found = validate(data);
    setSubmitted(true);
    setErrors(found);
    if (Object.keys(found).length) return;

    setStatus("sending");
    try {
      const response = await fetch("https://formspree.io/f/movqownb", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error(String(response.status));
      setStatus("sent");
      form.reset();
      setSubmitted(false);
    } catch {
      setStatus("error");
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  const links = [
    { icon: Github, label: "GitHub", handle: "github.com/manojparthiban", href: socialLinks.github },
    { icon: Linkedin, label: "LinkedIn", handle: "in/manoj-parthi31", href: socialLinks.linkedin },
    { icon: Twitter, label: "X / Twitter", handle: "@ImMj31", href: socialLinks.twitter },
  ];

  const statusText: Record<Status, string> = {
    idle: "ready",
    sending: "sending",
    sent: "sent",
    error: "failed",
  };

  return (
    <section className="contact relative isolate overflow-hidden px-5 sm:px-8 lg:px-12 pt-14 md:pt-20">
      <div className="sec-backdrop" aria-hidden="true" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <SectionHeader
          index="06"
          name="contact"
          title={
            <>
              Get in touch<span className="text-primary">.</span>
            </>
          }
          sub="Have a role, a project or an SAP problem worth solving? Send a message or reach me directly."
        />

        <div className="contact-layout">
          {/* ── Form ── */}
          <m.div {...reveal} className="h-full">
            <div className="bento-card cform">
              <div className="cform__bar">
                <span className="proj__dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
                <span className="cform__file">~/contact/new-message.ts</span>
                <span className={`cform__status cform__status--${status}`}>{statusText[status]}</span>
              </div>

              <form onSubmit={onSubmit} onChange={onChange} noValidate className="cform__body">
                <div className="cform__grid">
                  <div className="cform__field">
                    <label htmlFor="c-name">name</label>
                    <input id="c-name" name="name" autoComplete="name" placeholder="Your name" aria-invalid={!!errors.name} />
                    {errors.name && <p className="cform__error">! {errors.name}</p>}
                  </div>
                  <div className="cform__field">
                    <label htmlFor="c-email">email</label>
                    <input
                      id="c-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@company.com"
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <p className="cform__error">! {errors.email}</p>}
                  </div>
                </div>
                <div className="cform__field cform__field--grow">
                  <label htmlFor="c-message">message</label>
                  <textarea
                    id="c-message"
                    name="message"
                    rows={6}
                    placeholder="What would you like to talk about?"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p className="cform__error">! {errors.message}</p>}
                </div>

                <div className="cform__foot">
                  <p className="cform__note" role="status">
                    {status === "sent" && (
                      <span className="cform__note--ok">
                        <Check className="w-4 h-4" /> Message sent. I'll get back to you soon.
                      </span>
                    )}
                    {status === "error" && (
                      <span className="cform__note--err">Couldn't send right now. Please try again or email me directly.</span>
                    )}
                  </p>
                  <button type="submit" disabled={status === "sending"} className="hero-cta hero-cta--primary group">
                    {status === "sending" ? "Sending..." : "Send message"}
                    <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </button>
                </div>
              </form>
            </div>
          </m.div>

          {/* ── Card + direct links ── */}
          <div className="contact-side">
            <m.div {...reveal}>
              <FlipCard />
            </m.div>

            <m.div {...reveal} className="bento-card contact-links">
              <Label>direct</Label>
              <ul>
                <li className="contact-link">
                  <a href={socialLinks.email} className="contact-link__main">
                    <span className="contact-link__icon">
                      <Mail className="w-[18px] h-[18px]" />
                    </span>
                    <span className="contact-link__text">
                      <strong>Email</strong>
                      <small>{EMAIL}</small>
                    </span>
                  </a>
                  <button type="button" onClick={copyEmail} className="contact-link__copy" aria-label="Copy email address">
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    <span>{copied ? "copied" : "copy"}</span>
                  </button>
                </li>
                {links.map(({ icon: Icon, label, handle, href }) => (
                  <li key={label} className="contact-link">
                    <a href={href} target="_blank" rel="noopener noreferrer" className="contact-link__main">
                      <span className="contact-link__icon">
                        <Icon className="w-[18px] h-[18px]" />
                      </span>
                      <span className="contact-link__text">
                        <strong>{label}</strong>
                        <small>{handle}</small>
                      </span>
                      <ArrowUpRight className="contact-link__arrow w-4 h-4" />
                    </a>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="site-foot">
        <span>© {new Date().getFullYear()} Manoj Parthiban</span>
        <span className="hidden md:inline">Designed and built with React, TypeScript and Framer Motion</span>
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="site-foot__top">
          back to top <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </footer>
    </section>
  );
};

ContactSection.displayName = "ContactSection";

export default ContactSection;
