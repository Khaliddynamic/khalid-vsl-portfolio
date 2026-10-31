import { projects, site } from "../data/portfolio"
import { playerOpen } from "./playerBus"

export default function Hero() {
  const featured = projects.find((p) => p.id === "mariam-motion")

  function go(e, id) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />

      <div className="hero__inner">
        <div className="hero__meta">
          <span>Portfolio — {site.year}</span>
          <span>
            {site.location} · {site.coords}
          </span>
          <span className="hero__status">
            <i aria-hidden="true" />
            {site.availability}
          </span>
        </div>

        <div className="hero__main">
          <p className="hero__eyebrow">{site.eyebrow}</p>
          <h1 className="hero__title">
            {site.headlineA} {site.headlineB}
            <span className="accent">.</span>
          </h1>
          <p className="hero__lead">{site.lead}</p>
          <div className="hero__actions">
            <a className="btn btn--solid" href="#work" onClick={(e) => go(e, "work")}>
              Explore My Work
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M7 17 17 7M8 7h9v9" />
              </svg>
            </a>
            <a className="btn btn--ghost" href="#contact" id="primaryCta" onClick={(e) => go(e, "contact")}>
              Let's Work Together
            </a>
          </div>
        </div>

        {/* featured showcase — real portfolio work */}
        <figure className="hero__showcase">
          <div className="hero__media">
            <span className="hero__tag hero__tag--l">Selected work · {site.year}</span>
            <span className="hero__tag hero__tag--r">Casablanca · Worldwide</span>
            <img
              src={featured.poster}
              alt={`Still frame from ${featured.title}`}
              width="540"
              height="960"
              decoding="async"
            />
            <button
              className="hero__play"
              type="button"
              aria-label={`Play featured video: ${featured.title}`}
              onClick={() => playerOpen(featured.id)}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5.5v13c0 .8.87 1.3 1.56.9l10.2-6.5a1.05 1.05 0 0 0 0-1.8L9.56 4.6A1.05 1.05 0 0 0 8 5.5Z" />
              </svg>
              <small>Play featured project</small>
            </button>
          </div>
        </figure>

        <ul className="hero__strip">
          <li>Talking heads</li>
          <li>Motion graphics</li>
          <li>Short-form</li>
          <li>9:16 · 16:9 · 1:1</li>
        </ul>
      </div>
    </section>
  )
}
