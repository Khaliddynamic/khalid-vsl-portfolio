import { useState } from "react"
import { filters, projects } from "../data/portfolio"
import { playerOpen } from "./playerBus"
import { Reveal } from "./Reveal"

const ARROW = (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17 17 7M8 7h9v9" />
  </svg>
)

function WorkCard({ project, wide }) {
  return (
    <article
      className={`work${wide ? " work--wide" : ""}`}
      data-cat={project.category}
      data-span={project.span}
    >
      <a
        className="work__card"
        style={wide ? { display: "flex" } : undefined}
        href={`https://vimeo.com/${project.vimeoId}`}
        target="_blank"
        rel="noopener"
        aria-label={`Watch project: ${project.title}`}
        onClick={(e) => {
          e.preventDefault()
          playerOpen(project.id)
        }}
      >
        <div className="work__media">
          <img
            src={project.poster}
            alt=""
            width="540"
            height="960"
            loading="lazy"
            decoding="async"
            onError={(e) => {
              e.currentTarget.closest(".work").hidden = true
            }}
          />
          <span className="work__go" aria-hidden="true">
            {ARROW}
          </span>
          {wide ? null : (
            <span className="work__dur">
              {project.duration} · {project.ratio}
            </span>
          )}
        </div>
        {wide ? (
          <div className="work__info">
            <p className="work__cat">
              <b>{project.industry}</b> · {project.categoryLabel}
            </p>
            <h3>{project.title}</h3>
            <p className="work__services">{project.tags}</p>
            <span
              className="work__dur"
              style={{ position: "static", display: "inline-flex", marginTop: "1.1rem", width: "fit-content" }}
            >
              {project.duration} · {project.ratio}
            </span>
          </div>
        ) : (
          <div className="work__body">
            <div>
              <p className="work__cat">
                <b>{project.industry}</b> · {project.categoryLabel}
              </p>
              <h3>{project.title}</h3>
              <p className="work__services">{project.tags}</p>
            </div>
          </div>
        )}
      </a>
    </article>
  )
}

export default function Work() {
  const [filter, setFilter] = useState("all")

  const counts = {}
  for (const p of projects) counts[p.category] = (counts[p.category] || 0) + 1
  counts.all = projects.length

  const visible = projects.filter((p) => filter === "all" || p.category === filter)

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Reveal>
          <span className="sec__label">
            <b>01</b> Selected work
          </span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">
              Work that speaks <span className="accent">for itself.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">
              A selection of edits and motion design projects built around clarity, story, and visual impact.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="filters" id="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.id}
                className="pill"
                data-filter={f.id}
                aria-pressed={filter === f.id}
                onClick={() => setFilter(f.id)}
              >
                {f.label} <span className="cnt">{String(counts[f.id] || 0).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="wrap">
        <div className="workgrid" id="workGrid">
          {visible.map((p) => (
            <WorkCard key={p.id} project={p} wide={p.span === "12"} />
          ))}
        </div>
      </div>
    </section>
  )
}
