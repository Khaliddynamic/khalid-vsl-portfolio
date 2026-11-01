import { useState } from "react"
import { projects, workLayout, posterUrl } from "../data/portfolio"
import { playerOpen } from "./playerBus"
import { Reveal } from "./Reveal"

const ARROW = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

const PLAY = (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13c0 .8.87 1.3 1.56.9l10.2-6.5a1.05 1.05 0 0 0 0-1.8L9.56 4.6A1.05 1.05 0 0 0 8 5.5Z" />
  </svg>
)

const GALLERY_SIZES = "(max-width:640px) 92vw, (max-width:1024px) 46vw, 41vw"
const FEAT_SIZES = "(max-width:700px) 92vw, 544px"

function byId(id) {
  return projects.find((p) => p.id === id)
}

/* responsive srcset from the same Vimeo frame — sharp on retina, light on mobile */
function srcSet(base) {
  return [540, 720, 1080].map((w) => `${posterUrl(base, w)} ${w}w`).join(", ")
}

function Still({ project, eager = false, sizes = GALLERY_SIZES, className = "still work__card" }) {
  return (
    <a
      className={className}
      href={`https://vimeo.com/${project.vimeoId}`}
      target="_blank"
      rel="noopener"
      aria-label={`Play project: ${project.title}`}
      onClick={(e) => {
        e.preventDefault()
        playerOpen(project.id)
      }}
    >
      <img
        src={posterUrl(project.poster)}
        srcSet={srcSet(project.poster)}
        sizes={sizes}
        alt=""
        width="540"
        height="960"
        {...(eager ? { fetchPriority: "high" } : { loading: "lazy" })}
        decoding="async"
        onError={(e) => {
          e.currentTarget.closest(".still").hidden = true
        }}
      />
      <span className="still__play" aria-hidden="true">
        {PLAY}
      </span>
    </a>
  )
}

function Mini({ project }) {
  return (
    <div className="mini">
      <Still project={project} />
      <div className="caption">
        <h3 className="caption__title">{project.title}</h3>
        <p className="caption__meta">{project.label}</p>
      </div>
    </div>
  )
}

export default function Work() {
  const [showAll, setShowAll] = useState(false)
  const feat = byId(workLayout.featured)
  const initial = workLayout.initial.map(byId).filter(Boolean)
  const more = workLayout.more.map(byId).filter(Boolean)

  return (
    <section className="work" id="work">
      <div className="wrap">
        <Reveal>
          <div className="work__head">
            <h2>Selected work</h2>
            <span>Eight projects</span>
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <div id="workGrid">
          {/* featured — one contained portrait spread */}
          <Reveal>
            <div className="feat">
              <Still project={feat} eager sizes={FEAT_SIZES} className="still work__card feat__still" />
              <div className="feat__body">
                <h3 className="feat__title">{feat.title}</h3>
                <p className="feat__meta">{feat.label}</p>
                <a
                  className="feat__link"
                  href={`https://vimeo.com/${feat.vimeoId}`}
                  onClick={(e) => {
                    e.preventDefault()
                    playerOpen(feat.id)
                  }}
                >
                  Watch the project
                  {ARROW}
                </a>
              </div>
            </div>
          </Reveal>

          {/* gallery — the curated first showing */}
          <Reveal>
            <div className="gallery">
              {initial.map((p) => (
                <Mini key={p.id} project={p} />
              ))}
            </div>
          </Reveal>

          {/* remaining work — revealed in place */}
          <div className="gallery gallery--more" id="workMore" hidden={!showAll}>
            {more.map((p) => (
              <Mini key={p.id} project={p} />
            ))}
          </div>

          <div className="work__more-wrap">
            <button
              className={"work__more" + (showAll ? " is-open" : "")}
              type="button"
              id="workMoreBtn"
              aria-expanded={showAll}
              aria-controls="workMore"
              onClick={() => setShowAll((v) => !v)}
            >
              <span className="work__more-label">{showAll ? "Show fewer" : "View All Work"}</span>
              {ARROW}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
