import { about, site } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function About() {
  return (
    <section className="sec" id="about">
      <div className="wrap">
        <Reveal>
          <span className="sec__label">
            <b>04</b> Behind the edit
          </span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">
              The editor behind <span className="accent">the story.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">Independent by design — one pair of hands, from first frame to final export.</p>
          </Reveal>
        </div>

        <div className="about__grid">
          <Reveal>
            <figure className="about__photo">
              <img
                src={about.photo}
                alt={`${site.brand} — independent video editor and motion designer`}
                width="960"
                height="1200"
                loading="lazy"
                decoding="async"
              />
            </figure>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about__copy">
              <p>{about.paragraphs[0]}</p>
              <p>
                I create clean, cinematic content for <strong>brands, businesses, and creators</strong> who care
                about how their story is told.
              </p>
              <p>{about.paragraphs[2]}</p>
              <div className="about__facts">
                {about.facts.map((f) => (
                  <span key={f}>
                    <i>◆</i>
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
