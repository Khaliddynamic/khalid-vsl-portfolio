import { process } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function Process() {
  return (
    <section className="sec" id="process">
      <div className="wrap">
        <Reveal>
          <span className="sec__label"><b>03</b> Process</span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">From footage to final cut.</h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">
              A simple working process. Scope, edit, notes, delivery — every step agreed upfront.
            </p>
          </Reveal>
        </div>

        <div className="process">
          {process.map((step) => (
            <Reveal key={step.num}>
              <article className="step">
                <span className="step__num">{step.num}</span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__text">{step.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
