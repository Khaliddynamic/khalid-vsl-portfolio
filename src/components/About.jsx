import { about, services, site } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function About() {
  /* set "Casablanca" in serif italic */
  const [before, after] = about.lede.split("Casablanca")

  return (
    <section className="about" id="about">
      <div className="wrap">
        <Reveal>
          <p className="about__label">About</p>
        </Reveal>

        <div className="grid about__grid">
          <Reveal>
            <figure className="about__photo">
              <img
                src={about.photo}
                alt={`Portrait of ${site.name}`}
                width="960"
                height="960"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about__copy">
              <p className="about__lede">
                {before}
                <em>Casablanca</em>
                {after}
              </p>
              <p className="about__sub">{about.sub}</p>
              <ul className="services">
                {services.map((s) => (
                  <li key={s.title}>
                    <b>{s.title}</b>
                    <span>{s.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
