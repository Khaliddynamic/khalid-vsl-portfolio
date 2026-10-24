import { useEffect, useRef, useState } from "react"
import { nav, site } from "../data/portfolio"
import { Icon } from "./icons"

export default function StickyNav({ onNavigate }) {
  const [scrolled, setScrolled] = useState(false)
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
    onNavigate?.(id)
  }

  return (
    <>
      <header className={`nav ${scrolled ? "is-scrolled" : ""}`}>
        <div className="nav__inner wrap">
          <a
            className="brand"
            href="#top"
            onClick={(e) => jump(e, "top")}
          >
            <span className="dot" aria-hidden="true" />
            khalid<span className="k">.vsl</span>
          </a>

          <nav className="nav__links" aria-label="Primary">
            {nav.map((item) => (
              <a key={item.id} href={`#${item.id}`} onClick={(e) => jump(e, item.id)}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="nav__right">
            <a
              className="nav__cta"
              href="#contact"
              onClick={(e) => jump(e, "contact")}
            >
              Available for work <Icon name="upRight" size={12} />
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
          <a
            className="btn btn--solid drawer__btn"
            href="#contact"
            onClick={(e) => jump(e, "contact")}
          >
            Start a project
          </a>
          <p className="mono" style={{ marginTop: "2rem", color: "var(--sub-2)" }}>
            {site.location}
          </p>
        </div>
      </dialog>
    </>
  )
}
