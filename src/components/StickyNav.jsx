import { useEffect, useRef, useState } from "react"
import { nav, site } from "../data/portfolio"

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

export default function StickyNav() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState("")
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 12)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  /* scroll spy — quiet gray -> ink */
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
            khalid.vsl
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

          <a className="nav__action" href={`mailto:${site.email}?subject=Project%20enquiry`}>
            Start a project
            {ARROW}
          </a>
          <button
            className="nav__burger"
            id="navBurger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobilePanel"
            onClick={() => setOpen((v) => !v)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
              <path d="M3.5 8h17m-17 8h17" />
            </svg>
          </button>
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
          {nav.map((item) => (
            <a key={item.id} href={`#${item.id}`} onClick={(e) => jump(e, item.id)}>
              {item.label}
            </a>
          ))}
          <a className="drawer__mail" href={`mailto:${site.email}`}>
            {site.email}
          </a>
        </div>
      </dialog>
    </>
  )
}
