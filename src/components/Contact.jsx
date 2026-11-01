import { useRef, useState } from "react"
import { contact, site } from "../data/portfolio"
import { Reveal } from "./Reveal"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildBody(d) {
  return (
    "Hi,\n\nI'd like to discuss a project.\n\n" +
    `Name: ${d.name}\n` +
    `Email: ${d.email}\n\n` +
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
      message: (data.get("message") || "").trim(),
    }
  }

  function validate(data) {
    const next = {}
    if (!data.name) next.name = "Please enter your name."
    if (!data.email) next.email = "Please enter your email address."
    else if (!EMAIL_RE.test(data.email)) next.email = "That email address doesn't look right — please check it."
    if (!data.message) next.message = "Please add a short message."
    setErrors(next)
    return Object.keys(next).length === 0
  }

  async function send(data) {
    setSending(true)
    setStatus("")
    try {
      const res = await fetch(contact.formEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: "Website enquiry — khalid.vsl",
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      })
      if (!res.ok) throw new Error(`bad status ${res.status}`)
      setStatus("Thanks — your message is on its way. I'll reply as soon as I can.")
      formRef.current?.reset()
    } catch {
      setStatus(
        "Something went wrong — please try again, or use the email link below. Your details are still in the form."
      )
    } finally {
      setSending(false)
    }
  }

  function draft(data) {
    window.location.href =
      `mailto:${site.email}?subject=${encodeURIComponent("Project enquiry")}` +
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
    send(data)
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

        <Reveal delay={0.12}>
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
              <button className="btn-solid" type="submit" id="formSubmitMail" onClick={onSubmit} disabled={sending}>
                <span className="btn__label">{sending ? "Sending…" : "Send Inquiry"}</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M7 17 17 7M8 7h9v9" />
                </svg>
              </button>
            </div>

            <p className="form__status" id="formStatus" role="status" hidden={!status}>
              {status}
            </p>
            <p className="form__fallback">
              Prefer email?{" "}
              <a
                href={`mailto:${site.email}`}
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
                {site.email}
              </a>
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
