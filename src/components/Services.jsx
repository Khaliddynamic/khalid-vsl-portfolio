import { services } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function Services() {
  return (
    <section className="sec" id="services">
      <div className="wrap">
        <Reveal>
          <span className="sec__label"><b>02</b> Services</span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">What clients buy.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">
              Three ways to turn talking-head footage into content that persuades.
              Deliverables are confirmed in writing before work starts — no surprise scopes.
            </p>
          </Reveal>
        </div>

        <div className="services">
          {services.map((service, i) => (
            <Reveal key={service.num} delay={i * 0.06}>
              <article className="svc">
                <div className="svc__top">
                  <span className="svc__num">{service.num}</span>
                </div>
                <h3 className="svc__title">{service.title}</h3>
                <p className="svc__text">{service.text}</p>
                <div className="svc__deli">
                  {service.deliverables.map((d) => (
                    <span key={d}>{d}</span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
