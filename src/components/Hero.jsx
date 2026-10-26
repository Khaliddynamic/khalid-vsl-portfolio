import { motion } from "framer-motion"
import { site } from "../data/portfolio"
import { Icon } from "./icons"

export default function Hero({ onNavigate }) {
  function go(e, id) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    onNavigate?.(id)
  }

  return (
    <section className="hero" id="top">
      <div className="hero__bg" aria-hidden="true" />
      <div className="hero__media" aria-hidden="true">
        <svg viewBox="0 0 640 640" fill="none">
          <path d="M96 432 C 64 208, 238 56, 424 118 C 574 172, 612 336, 506 468 C 382 618, 142 584, 96 432" stroke="currentColor" stroke-width="1.6"/>
          <path d="M18 516 C 148 436, 302 468, 468 292" stroke="currentColor" stroke-width="1.3"/>
        </svg>
        <img src="/khalid-cutout.webp" alt="" width={738} height={804} loading="eager" />
      </div>

      <div className="hero__inner">
        <motion.div
          className="hero__meta"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span>Portfolio — {site.year}</span>
          <span>{site.location} · {site.coords}</span>
          <span className="hero__status">
            <i aria-hidden="true" />
            {site.availability}
          </span>
        </motion.div>

        <div className="hero__main">
          <div className="hero__type">
            <motion.h1
              className="hero__title"
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero__line">{site.role[0]}</span>{" "}
              <span className="hero__line hero__line--display">{site.role[1]}</span>
            </motion.h1>

            <motion.p
              className="hero__role"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="hero__rule" aria-hidden="true" />
              {site.roleSupport}
            </motion.p>
          </div>

          <motion.div
            className="hero__aside"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <figure className="hero__portrait"><img src="/khalid.jpg" alt="Portrait of Khalid" width={720} height={720} onError={(e) => { e.currentTarget.closest('.hero__portrait').style.display = 'none'; }} /></figure>
            <p className="hero__lead">{site.lead}</p>
            <div className="hero__actions">
              <a className="btn btn--solid" href="#contact" onClick={(e) => go(e, "contact")}>
                Start a project <Icon name="upRight" size={14} />
              </a>
              <a className="btn btn--ghost" href="#work" id="primaryCta" onClick={(e) => go(e, "work")}>
                Selected work <Icon name="upRight" size={14} />
              </a>
            </div>
          </motion.div>
        </div>

        <ul className="hero__strip">
          {site.specialties.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
