import { useRef, useState } from "react"
import { contact, site } from "../data/portfolio"
import { Reveal } from "./Reveal"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

function buildBody(d) {
  return (
    "Hi,\n\nI'd like to discuss a project.\n\n" +
    `Name: ${d.name}\n` +
    `Email: ${d.email}\n` +
    `Project type: ${d.ptype}\n` +
    `Budget: ${d.budget}\n\n` +
    `About the project:\n${d.message}\n\n— ${d.name}`
  )
}

export default function Contact() {
  const formRef = useRef(null)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState("")
  const [sending, setSending] = useState(false)

  function collect() {
    const data = new FormData(formRef.current)
    return {
      name: (data.get("name") || "").trim(),
      email: (data.get("email") || "").trim(),
      ptype: data.get("ptype") || "",
      budget: data.get("budget") || "Not sure yet",
      message: (data.get("message") || "").trim(),
    }
  }

  function validate(data) {
    const next = {}
    if (!data.name) next.name = "Please enter your name."
    if (!data.email) next.email = "Please enter your email address."
    else if (!EMAIL_RE.test(data.email)) next.email = "That email address doesn't look right — please check it."
    if (!data.ptype) next.ptype = "Please choose a project type."
    if (!data.message) next.message = "Please add a short message."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  function whatsapp(data) {
    const subject = `Project enquiry — ${data.ptype} (${data.budget})`
    const href =
      site.whatsapp +
      "?text=" +
      encodeURIComponent(`${subject}\n\n${buildBody(data)}`)
    window.open(href, "_blank", "noopener")
    setStatus(
      "WhatsApp should now be open with your message ready — nothing is sent until you press send there."
    )
  }

  async function emailBackend(data) {
    setSending(true)
    setStatus("")
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Website enquiry — ${data.ptype} (${data.budget})`,
          name: data.name,
          email: data.email,
          ptype: data.ptype,
          budget: data.budget,
          message: data.message,
        }),
      })
      if (!res.ok) throw new Error(`bad status ${res.status}`)
      setStatus("Thanks — your message was delivered by email. I'll reply as soon as I can.")
      formRef.current?.reset()
    } catch {
      setStatus(
        "Email delivery hit a snag — please use WhatsApp or the draft link below; your details are still in the form."
      )
    } finally {
      setSending(false)
    }
  }

  function draft(data) {
    const subject = `Project enquiry — ${data.ptype} (${data.budget})`
    window.location.href =
      `mailto:${site.email}?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(buildBody(data))}`
    setStatus("Your email app should now be open with the draft ready. Nothing is sent until you press send there.")
  }

  function onSubmit(e) {
    e.preventDefault()
    const data = collect()
    if (!validate(data)) {
      setStatus("")
      return
    }
    whatsapp(data)
  }

  function onMail(e) {
    e.preventDefault()
    const data = collect()
    if (!validate(data)) {
      setStatus("")
      return
    }
    emailBackend(data)
  }

  return (
    <section className="contact" id="contact">
      <div className="wrap">
        <Reveal>
          <h2 className="contact__title">
            {contact.title}
            <span className="dot">.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.06}>
          <p className="contact__sub">{contact.sub}</p>
        </Reveal>

        <Reveal delay={0.1}>
          <a className="contact__mail" href={`mailto:${site.email}?subject=Project%20enquiry`}>
            {site.email}
          </a>
        </Reveal>

        <Reveal delay={0.14}>
          <div className="contact__alt">
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram {ARROW}
            </a>
            <a href={site.whatsapp} target="_blank" rel="noreferrer">
              WhatsApp {ARROW}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.18}>
          <form className="form" id="contactForm" method="post" action="#" novalidate ref={formRef}>
            <div className="form__row">
              <div className={`field${errors.name ? " field--invalid" : ""}`} id="field-name">
                <label htmlFor="f-name">Name</label>
                <input type="text" name="name" id="f-name" autoComplete="name" placeholder="Your name" required />
                <p className="form__err" id="err-name" role="alert" hidden={!errors.name}>
                  {errors.name || "Please enter your name."}
                </p>
              </div>
              <div className={`field${errors.email ? " field--invalid" : ""}`} id="field-email">
                <label htmlFor="f-email">Email</label>
                <input type="email" name="email" id="f-email" autoComplete="email" placeholder="you@example.com" required />
                <p className="form__err" id="err-email" role="alert" hidden={!errors.email}>
                  {errors.email || "Please enter a valid email address."}
                </p>
              </div>
            </div>

            <div className="form__row">
              <div className={`field${errors.ptype ? " field--invalid" : ""}`} id="field-type">
                <label htmlFor="f-ptype">Project type</label>
                <select name="ptype" id="f-ptype" required>
                  <option value="" selected disabled>
                    Select a project type
                  </option>
                  {contact.projectTypes.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <p className="form__err" id="err-type" role="alert" hidden={!errors.ptype}>
                  {errors.ptype || "Please choose a project type."}
                </p>
              </div>
              <div className="field" id="field-budget">
                <label htmlFor="f-budget">Budget (optional)</label>
                <select name="budget" id="f-budget">
                  {contact.budgets.map((b, i) => (
                    <option key={b} value={i === 0 ? "" : b}>
                      {b}
                    </option>
                  ))}
                </select>
                <small className="form__hint">
                  Indicative ranges — the final quote depends on the scope we agree on.
                </small>
              </div>
            </div>

            <div className={`field${errors.message ? " field--invalid" : ""}`} id="field-message">
              <label htmlFor="f-message">Project description</label>
              <textarea
                name="message"
                id="f-message"
                rows="4"
                placeholder="One or two lines about the footage and what you need."
                required
              />
              <p className="form__err" id="err-message" role="alert" hidden={!errors.message}>
                {errors.message || "Please add a short message."}
              </p>
            </div>

            <div className="form__actions">
              <button className="btn-solid" type="submit" id="formSubmit" onClick={onSubmit}>
                Send via WhatsApp
              </button>
              <button className="btn-quiet" type="submit" id="formSubmitMail" onClick={onMail} disabled={sending}>
                {sending ? "Sending…" : "Send by email"}
              </button>
            </div>

            <p className="form__status" id="formStatus" role="status" hidden={!status}>
              {status}
            </p>
            <p className="form__note">
              WhatsApp opens with your message ready — nothing is sent until you press send there. "Send by email"
              delivers via a free form service straight to my inbox.
            </p>
            <p className="form__fallback">
              <a
                href={`mailto:${site.email}?subject=Project%20enquiry`}
                id="mailtoFallback"
                onClick={(e) => {
                  e.preventDefault()
                  const data = collect()
                  if (!validate(data)) {
                    setStatus("")
                    return
                  }
                  draft(data)
                }}
              >
                Prefer email in your own mail app? Open a draft instead.
              </a>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
