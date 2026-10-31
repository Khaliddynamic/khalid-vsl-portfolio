import { services } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function Services() {
  return (
    <section className="sec sec--tint" id="services">
      <div className="wrap">
        <Reveal>
          <span className="sec__label">
            <b>03</b> Expertise
          </span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">
              What I bring <span className="accent">to the frame.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">Three disciplines, one standard — every second on screen has to earn its place.</p>
          </Reveal>
        </div>

        <div className="services">
          {services.map((service) => (
            <Reveal key={service.num}>
              <article className="service">
                <span className="service__num" aria-hidden="true">
                  {service.num}
                </span>
                <div>
                  <h3 className="service__title">{service.title}</h3>
                  <p className="service__text">{service.text}</p>
                </div>
                <ul className="service__list">
                  {service.capabilities.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
