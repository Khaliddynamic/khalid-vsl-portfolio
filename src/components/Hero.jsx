import { site } from "../data/portfolio"

export default function Hero() {
  function go(e, id) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="hero" id="top">
      <div className="wrap">
        <h1 className="hero__title">
          {site.name}
          <span className="dot">.</span>
        </h1>
        <p className="hero__role">{site.role}</p>
        <p className="hero__line">{site.line}</p>
        <a className="hero__cue" href="#work" onClick={(e) => go(e, "work")}>
          Selected work
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M12 5v14m0 0-6-6m6 6 6-6" />
          </svg>
        </a>
      </div>
    </section>
  )
}
