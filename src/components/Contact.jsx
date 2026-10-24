import { useRef, useState } from "react"
import { contact, site } from "../data/portfolio"
import { Reveal } from "./Reveal"

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
    <section className="sec contact" id="contact">
      <div className="wrap">
        <Reveal>
          <span className="sec__label"><b>04</b> Start a project</span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="contact__title">
            Let's talk<span className="accent">.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="contact__lead">
            Use the form, WhatsApp, Instagram, or email. Whatever's easiest — I'll reply with
            next steps and a quote.
          </p>
        </Reveal>

        <div className="contact__grid">
          <div className="contact__side">
            <Reveal>
              <div className="chatstack">
                <a className="chatbtn" href={site.whatsapp} target="_blank" rel="noreferrer">
                  <span>WhatsApp</span>
                  <small>Chat directly</small>
                </a>
                <a className="chatbtn" href={site.instagram} target="_blank" rel="noreferrer">
                  <span>Instagram</span>
                  <small>@khalid.vsl</small>
                </a>
                <a className="chatbtn" href={`mailto:${site.email}`}>
                  <span>Email</span>
                  <small>{site.email}</small>
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.08}>
              <div className="facts">
                <div><span>Stack</span><b>Premiere · After Effects</b></div>
                <div><span>Formats</span><b>9:16 · 16:9 · 1:1</b></div>
              </div>
              <p className="contact__privacy">{contact.privacy}</p>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <form className="form" ref={formRef} noValidate onSubmit={onSubmit}>
              <div className="frow frow--2">
                <label className={`field ${errors.name ? "field--invalid" : ""}`}>
                  <span className="fl">Name</span>
                  <input type="text" name="name" autoComplete="name" placeholder="Your name" required aria-invalid={!!errors.name} />
                  {errors.name && <span className="form__err" role="alert">{errors.name}</span>}
                </label>
                <label className={`field ${errors.email ? "field--invalid" : ""}`}>
                  <span className="fl">Email</span>
                  <input type="email" name="email" autoComplete="email" placeholder="you@example.com" required aria-invalid={!!errors.email} />
                  {errors.email && <span className="form__err" role="alert">{errors.email}</span>}
                </label>
              </div>

              <label className={`field ${errors.ptype ? "field--invalid" : ""}`}>
                <span className="fl">Project type</span>
                <select name="ptype" required defaultValue="" aria-invalid={!!errors.ptype}>
                  <option value="" disabled>Select a project type</option>
                  {contact.projectTypes.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                {errors.ptype && <span className="form__err" role="alert">{errors.ptype}</span>}
              </label>

              <label className="field">
                <span className="fl">Budget (indicative)</span>
                <select name="budget" defaultValue="">
                  {contact.budgets.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
                <span className="fnote">Indicative ranges — the final quote depends on the scope we agree on.</span>
              </label>

              <label className={`field ${errors.message ? "field--invalid" : ""}`}>
                <span className="fl">About the project</span>
                <textarea
                  name="message"
                  rows={5}
                  placeholder="One or two lines about the footage and what you need."
                  required
                  aria-invalid={!!errors.message}
                />
                {errors.message && <span className="form__err" role="alert">{errors.message}</span>}
              </label>

              <div className="form__actions">
                <button className="btn btn--solid" type="submit" disabled={sending}>
                  Send via WhatsApp
                </button>
                <button className="btn btn--ghost" type="button" onClick={onMail} disabled={sending}>
                  {sending ? "Sending…" : "Send by email"}
                </button>
              </div>

              {status && <p className="form__status" role="status">{status}</p>}

              <p className="form__end">
                WhatsApp opens with your message ready — nothing is sent until you press send
                there. “Send by email” delivers via a free form service straight to the studio inbox.
              </p>
              <p className="form__alt">
                <button
                  type="button"
                  className="linklike"
                  onClick={() => {
                    const data = collect()
                    if (validate(data)) draft(data)
                  }}
                >
                  Prefer email in your own mail app? Open a draft instead.
                </button>
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
