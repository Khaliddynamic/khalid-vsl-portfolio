import { process } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function Process() {
  return (
    <section className="sec sec--tint" id="process">
      <div className="wrap">
        <Reveal>
          <span className="sec__label">
            <b>05</b> Process
          </span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">
              Simple process. Exceptional <span className="accent">attention to detail.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">Four stages, no friction — you always know what happens next.</p>
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
