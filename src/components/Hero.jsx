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
      <div className="hero__inner">
        <motion.div
          className="hero__meta"
          initial={{ opacity: 0, y: -12 }}
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
          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="hero__line">
              {site.role[0]}
              <span className="accent">.</span>
            </span>
            <span className="hero__line hero__line--muted">{site.role[1]}</span>
          </motion.h1>
        </div>

        <motion.div
          className="hero__foot"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="hero__lead">{site.lead}</p>
          <div className="hero__actions">
            <a className="hero__link" href="#work" onClick={(e) => go(e, "work")}>
              Selected work <Icon name="upRight" size={13} />
            </a>
            <a className="hero__link hero__link--accent" href="#contact" onClick={(e) => go(e, "contact")}>
              Start a project <Icon name="upRight" size={13} />
            </a>
          </div>
        </motion.div>

        <ul className="hero__strip">
          {site.specialties.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
