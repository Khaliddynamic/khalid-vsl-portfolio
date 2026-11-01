import { about, services } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function About() {
  /* set "Casablanca" in serif italic */
  const [before, after] = about.lede.split("Casablanca")

  return (
    <section className="about" id="about">
      <div className="wrap">
        <Reveal>
          <h2 className="about__label">About</h2>
        </Reveal>

        <div className="grid about__grid">
          <Reveal>
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
