import { useEffect, useRef, useState } from "react"
import { nav, site } from "../data/portfolio"

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [open, setOpen] = useState(false)
  const barRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY
      setScrolled(y > 12)
      const max = document.documentElement.scrollHeight - window.innerHeight
      if (barRef.current) {
        barRef.current.style.width = `${max > 0 ? (y / max) * 100 : 0}%`
      }
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* scroll spy — active section drives the orange underline */
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return undefined
    const links = nav
      .map((item) => ({ item, el: document.getElementById(item.id) }))
      .filter((x) => x.el)
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) setActive(en.target.id)
        })
      },
      { rootMargin: "-40% 0px -55% 0px" }
    )
    links.forEach((x) => spy.observe(x.el))
    return () => spy.disconnect()
  }, [])

  useEffect(() => {
    const panel = panelRef.current
    if (!panel) return
    if (open && !panel.open) panel.showModal()
    if (!open && panel.open) panel.close()
    document.body.style.overflow = open ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  function jump(e, id) {
    e.preventDefault()
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav__inner wrap">
          <a className="nav__brand" href="#top" onClick={(e) => jump(e, "top")}>
            khalid.vsl<sup>®</sup>
          </a>

          <nav className="nav__links" aria-label="Primary" id="navLinks">
            {nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={active === item.id ? "is-active" : ""}
                onClick={(e) => jump(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <a className="nav__cta" href="#contact" onClick={(e) => jump(e, "contact")}>
              Discuss a Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
            <button
              className="nav__burger"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobilePanel"
              onClick={() => setOpen((v) => !v)}
            >
              <i /><i /><i />
            </button>
          </div>
        </div>
        <div className="nav__progress" aria-hidden="true">
          <i ref={barRef} />
        </div>
      </header>

      <dialog
        id="mobilePanel"
        className="drawer"
        aria-label="Menu"
        ref={panelRef}
        onCancel={(e) => {
          e.preventDefault()
          setOpen(false)
        }}
      >
        <div className="drawer__inner">
          {nav.map((item, i) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => jump(e, item.id)}>
              <i>0{i + 1}</i>
              {item.label}
            </a>
          ))}
          <a className="btn btn--solid drawer__btn" href="#contact" onClick={(e) => jump(e, "contact")}>
            Discuss a Project
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17 17 7M8 7h9v9" />
            </svg>
          </a>
          <p className="mono" style={{ marginTop: "2rem", color: "var(--muted)" }}>
            {site.location}
          </p>
        </div>
      </dialog>
    </>
  )
}
