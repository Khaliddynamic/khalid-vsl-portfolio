import { projects, workLayout } from "../data/portfolio"
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

function byId(id) {
  return projects.find((p) => p.id === id)
}

function Still({ project, eager = false }) {
  return (
    <a
      className="still work__card"
      href={`https://vimeo.com/${project.vimeoId}`}
      target="_blank"
      rel="noopener"
      aria-label={`Watch project: ${project.title}`}
      onClick={(e) => {
        e.preventDefault()
        playerOpen(project.id)
      }}
    >
      <img
        src={project.poster}
        alt=""
        width="540"
        height="960"
        {...(eager ? { fetchPriority: "high", decoding: "async" } : { loading: "lazy", decoding: "async" })}
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

function Caption({ project }) {
  return (
    <div className="caption">
      <b>{project.title}</b>
      <span>{project.categoryLabel}</span>
    </div>
  )
}

export default function Work() {
  const feat1 = byId(workLayout.featured)
  const [pairA, pairB] = workLayout.pair.map(byId)
  const feat2 = byId(workLayout.featured2)
  const minis = workLayout.minis.map(byId).filter(Boolean)

  return (
    <section className="work" id="work">
      <div className="wrap">
        <Reveal>
          <div className="work__head">
            <h2>Selected work</h2>
            <span>Nine projects</span>
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <div id="workGrid">
          {/* featured spread 1 */}
          <Reveal>
            <div className="grid feat">
              <Still project={feat1} eager />
              <div className="feat__body">
                <p className="feat__meta">
                  {feat1.industry ? `${feat1.industry} — ${feat1.categoryLabel}` : feat1.categoryLabel}
                </p>
                <h3 className="feat__title">{feat1.title}</h3>
                <p className="feat__desc">{feat1.description}</p>
                <a
                  className="feat__link"
                  href={`https://vimeo.com/${feat1.vimeoId}`}
                  onClick={(e) => {
                    e.preventDefault()
                    playerOpen(feat1.id)
                  }}
                >
                  Watch the project
                  {ARROW}
                </a>
              </div>
            </div>
          </Reveal>

          {/* pair, offset */}
          <Reveal>
            <div className="grid pair">
              <div className="mini mini--a">
                <Still project={pairA} />
                <Caption project={pairA} />
              </div>
              <div className="mini mini--b">
                <Still project={pairB} />
                <Caption project={pairB} />
              </div>
            </div>
          </Reveal>

          {/* featured spread 2 — mirrored */}
          <Reveal>
            <div className="grid feat feat--flip">
              <div className="feat__body">
                <p className="feat__meta">
                  {feat2.industry ? `${feat2.industry} — ${feat2.categoryLabel}` : feat2.categoryLabel}
                </p>
                <h3 className="feat__title">{feat2.title}</h3>
                <p className="feat__desc">{feat2.description}</p>
                <a
                  className="feat__link"
                  href={`https://vimeo.com/${feat2.vimeoId}`}
                  onClick={(e) => {
                    e.preventDefault()
                    playerOpen(feat2.id)
                  }}
                >
                  Watch the project
                  {ARROW}
                </a>
              </div>
              <Still project={feat2} />
            </div>
          </Reveal>

          {/* remaining work */}
          <Reveal>
            <div className="minis">
              {minis.map((p) => (
                <div className="mini" key={p.id}>
                  <Still project={p} />
                  <Caption project={p} />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
