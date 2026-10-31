import { collaborations, collaborationsNote } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function Collaborations() {
  return (
    <section className="sec" id="collaborations">
      <div className="wrap">
        <Reveal>
          <span className="sec__label">
            <b>02</b> Collaborations
          </span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">
              Great work is built <span className="accent">together.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">Most of my work comes from ongoing collaborations in three worlds.</p>
          </Reveal>
        </div>

        <div className="trust__grid">
          {collaborations.map((col) => (
            <Reveal key={col.title}>
              <div className="trust__col">
                <h3>{col.title}</h3>
                <p>{col.text}</p>
                <ul className="trust__list">
                  {col.items.map(([name, note]) => (
                    <li key={name}>
                      <b>{name}</b>
                      <span>{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <p className="trust__note">{collaborationsNote}</p>
        </Reveal>
      </div>
    </section>
  )
}
