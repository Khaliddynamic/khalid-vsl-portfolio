import { useCallback, useEffect, useRef, useState } from "react"
import { filters, projects } from "../data/portfolio"
import { Reveal } from "./Reveal"

function WorkCard({ project, hidden, playing, dragRef, onPlay, onStop, onCenter }) {
  const cardRef = useRef(null)
  const frameRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  /* the poster stays visible until the embed reports it is actually playing */
  useEffect(() => {
    if (!playing) return undefined
    const frame = frameRef.current

    function onMessage(e) {
      if (!frame || e.source !== frame.contentWindow) return
      let data = e.data
      if (typeof data === "string") {
        try {
          data = JSON.parse(data)
        } catch {
          return
        }
      }
      if (data && (data.event === "playing" || data.event === "play" || data.event === "bufferend")) {
        setRevealed(true)
      }
    }

    window.addEventListener("message", onMessage)
    const timer = setTimeout(() => setRevealed(true), 2200)
    return () => {
      window.removeEventListener("message", onMessage)
      clearTimeout(timer)
    }
  }, [playing])

  return (
    <article ref={cardRef} className={`work${playing ? " is-playing" : ""}`} hidden={hidden}>
      <a
        className="work__card work__shim"
        href={`https://vimeo.com/${project.vimeoId}`}
        target="_blank"
        rel="noopener"
        aria-label={`Play project: ${project.title}`}
        onClick={(e) => {
          e.preventDefault()
          if (dragRef?.current?.movedAt && performance.now() - dragRef.current.movedAt < 350) {
            return
          }
          if (cardRef.current) onCenter(cardRef.current)
          if (playing) {
            onStop()
          } else {
            setRevealed(false)
            onPlay()
          }
        }}
      >
        <img
          src={project.poster}
          alt=""
          width="540"
          height="960"
          loading="lazy"
          decoding="async"
          onError={(e) => { e.currentTarget.hidden = true }}
        />
      </a>

      {playing && (
        <>
          <span className={`work__video${revealed ? " is-on" : ""}`}>
            <iframe
              ref={frameRef}
              src={`https://player.vimeo.com/video/${project.vimeoId}?autoplay=1&playsinline=1&autopause=0&title=0&byline=0&portrait=0&color=FF4D00&dnt=1`}
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
              title={`Video player — ${project.title}`}
            />
          </span>
          <button className="work__stop" type="button" aria-label="Stop video" onClick={onStop}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </>
      )}
    </article>
  )
}

export default function Work() {
  const [filter, setFilter] = useState("all")
  const [playingKey, setPlayingKey] = useState(null)
  const stripRef = useRef(null)
  const dragRef = useRef({ active: false, startX: 0, startLeft: 0, movedAt: 0 })
  const strideRef = useRef(0)
  const smoothUntilRef = useRef(0)
  const settleRef = useRef(null)
  const pendingIndexRef = useRef(null)

  const counts = {}
  for (const p of projects) counts[p.category] = (counts[p.category] || 0) + 1
  counts.all = projects.length

  const cards = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return []
    return [...strip.querySelectorAll(".work")].filter((card) => !card.hidden)
  }, [])

  const centerOf = useCallback((card) => {
    const strip = stripRef.current
    const sRect = strip.getBoundingClientRect()
    const cRect = card.getBoundingClientRect()
    return strip.scrollLeft + (cRect.left - sRect.left) - (strip.clientWidth - cRect.width) / 2
  }, [])

  const measureStride = useCallback(() => {
    const visible = cards()
    const per = Math.round(visible.length / 3)
    if (!per || visible.length < per + 1) return 0
    return visible[per].offsetLeft - visible[0].offsetLeft
  }, [cards])

  const updateFocus = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return
    const mid = strip.getBoundingClientRect().left + strip.clientWidth / 2
    strip.querySelectorAll(".work").forEach((card) => {
      if (card.hidden) return
      const rect = card.getBoundingClientRect()
      const distance = Math.abs(rect.left + rect.width / 2 - mid)
      const opacity = Math.max(0.35, Math.min(1, 1 - distance / (rect.width * 1.75)))
      card.style.opacity = opacity.toFixed(3)
    })
  }, [])

  /* keep the viewport on the middle copy: identical content, so the jump is invisible */
  const normalise = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return
    const stride = strideRef.current
    if (!stride || performance.now() < smoothUntilRef.current) return
    if (strip.classList.contains("is-dragging")) return
    const x = strip.scrollLeft
    if (x < stride * 0.5) strip.scrollLeft = x + stride
    else if (x > stride * 1.5) strip.scrollLeft = x - stride
  }, [])

  const focusedIndex = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return 0
    let best = 0
    let bestDistance = Infinity
    cards().forEach((card, i) => {
      const distance = Math.abs(centerOf(card) - strip.scrollLeft)
      if (distance < bestDistance) {
        bestDistance = distance
        best = i
      }
    })
    return best
  }, [cards, centerOf])

  const goToStep = useCallback((dir) => {
    const strip = stripRef.current
    const visible = cards()
    if (!strip || !visible.length) return
    const per = Math.round(visible.length / 3)
    let base = pendingIndexRef.current !== null ? pendingIndexRef.current : focusedIndex()
    let target = base + dir
    if (!visible[target]) {
      strip.scrollLeft += dir > 0 ? -strideRef.current : strideRef.current
      base += dir > 0 ? -per : per
      target = base + dir
    }
    const card = visible[target]
    if (!card) return
    pendingIndexRef.current = target
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    smoothUntilRef.current = performance.now() + 1500
    strip.scrollTo({ left: centerOf(card), behavior: reduce ? "auto" : "smooth" })
    if (reduce) {
      smoothUntilRef.current = 0
      pendingIndexRef.current = null
      updateFocus()
    }
  }, [cards, centerOf, focusedIndex, updateFocus])

  const snapToNearest = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return
    const card = cards()[focusedIndex()]
    if (!card) return
    const target = centerOf(card)
    if (Math.abs(target - strip.scrollLeft) < 1) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    smoothUntilRef.current = performance.now() + 1500
    strip.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" })
  }, [cards, centerOf, focusedIndex])

  const centerCard = useCallback((card) => {
    const strip = stripRef.current
    if (!strip || !card) return
    const target = centerOf(card)
    if (Math.abs(target - strip.scrollLeft) < 1) return
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    smoothUntilRef.current = performance.now() + 1500
    strip.scrollTo({ left: target, behavior: reduce ? "auto" : "smooth" })
  }, [centerOf])

  const centerRail = useCallback(() => {
    const strip = stripRef.current
    if (!strip) return
    strideRef.current = measureStride()
    strip.scrollLeft = strideRef.current
    updateFocus()
  }, [measureStride, updateFocus])

  useEffect(() => {
    const strip = stripRef.current
    if (!strip) return undefined
    let tick = false

    function onScroll() {
      if (tick) return
      tick = true
      requestAnimationFrame(() => {
        tick = false
        normalise()
        updateFocus()
      })
      if (settleRef.current) clearTimeout(settleRef.current)
      settleRef.current = setTimeout(settleRail, 160)
    }

    function settleRail() {
      settleRef.current = null
      if (performance.now() < smoothUntilRef.current) {
        settleRef.current = setTimeout(settleRail, 80)
        return
      }
      pendingIndexRef.current = null
      normalise()
      updateFocus()
    }

    function onResize() {
      const visible = cards()
      const current = visible[focusedIndex()]
      strideRef.current = measureStride()
      if (current) strip.scrollLeft = centerOf(current)
      updateFocus()
    }

    strip.addEventListener("scroll", onScroll, { passive: true })

    function onWheelIntent() {
      smoothUntilRef.current = 0
      pendingIndexRef.current = null
    }
    strip.addEventListener("wheel", onWheelIntent, { passive: true })
    window.addEventListener("resize", onResize)
    centerRail()

    return () => {
      strip.removeEventListener("scroll", onScroll)
      strip.removeEventListener("wheel", onWheelIntent)
      window.removeEventListener("resize", onResize)
      if (settleRef.current) clearTimeout(settleRef.current)
    }
  }, [cards, centerOf, centerRail, focusedIndex, measureStride, normalise, updateFocus])

  /* filtering starts again from the first visible card */
  useEffect(() => {
    centerRail()
  }, [filter, centerRail])

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setPlayingKey(null)
    }
    function onVisibility() {
      if (document.hidden) setPlayingKey(null)
    }
    document.addEventListener("keydown", onKey)
    document.addEventListener("visibilitychange", onVisibility)
    return () => {
      document.removeEventListener("keydown", onKey)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  function onPointerDown(e) {
    if (e.pointerType === "touch" || e.button !== 0) return
    pendingIndexRef.current = null
    smoothUntilRef.current = 0
    const strip = stripRef.current
    dragRef.current = {
      active: true,
      startX: e.clientX,
      startLeft: strip.scrollLeft,
      movedAt: 0,
    }
    strip.classList.add("is-dragging")
  }

  function onPointerMove(e) {
    const drag = dragRef.current
    if (!drag.active) return
    const dx = e.clientX - drag.startX
    if (Math.abs(dx) > 4) drag.movedAt = performance.now()
    stripRef.current.scrollLeft = drag.startLeft - dx
  }

  function endDrag() {
    const drag = dragRef.current
    if (!drag.active) return
    drag.active = false
    if (drag.movedAt) drag.movedAt = performance.now()
    stripRef.current?.classList.remove("is-dragging")
    normalise()
    updateFocus()
    snapToNearest()
  }

  return (
    <section className="sec" id="work">
      <div className="wrap">
        <Reveal>
          <span className="sec__label"><b>01</b> Selected work</span>
        </Reveal>

        <div className="sec__head">
          <Reveal>
            <h2 className="sec__title">
              Selected work{" "}
              <span className="sec__count mono">
                ({String(projects.length).padStart(2, "0")})
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec__lead">
              Talking-head edits and motion graphics for doctors, educators and personal
              brands. Browse the rail, click a frame to play it in place with sound.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.12}>
          <div className="filters" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f.id}
                className="pill"
                data-filter={f.id}
                aria-pressed={filter === f.id}
                onClick={() => {
                  setPlayingKey(null)
                  setFilter(f.id)
                }}
              >
                {f.label}{" "}
                <span className="cnt">{String(counts[f.id] || 0).padStart(2, "0")}</span>
              </button>
            ))}
            <div className="work__nav">
              <button
                className="work__btn"
                type="button"
                aria-label="Previous project"
                onClick={() => goToStep(-1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="work__btn"
                type="button"
                aria-label="Next project"
                onClick={() => goToStep(1)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="work__stripwrap" data-reveal>
        <div
          className="work__strip"
          id="workGrid"
          role="region"
          aria-label="Projects — scroll horizontally"
          tabIndex={0}
          ref={stripRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onPointerLeave={endDrag}
          onKeyDown={(e) => {
            if (e.key === "ArrowRight") {
              e.preventDefault()
              goToStep(1)
            }
            if (e.key === "ArrowLeft") {
              e.preventDefault()
              goToStep(-1)
            }
          }}
        >
          {[0, 1, 2].map((copy) =>
            projects.map((project) => {
              const key = `${copy}-${project.id}`
              const hidden = filter !== "all" && project.category !== filter
              return (
                <WorkCard
                  key={key}
                  project={project}
                  hidden={hidden}
                  playing={!hidden && playingKey === key}
                  dragRef={dragRef}
                  onPlay={() => setPlayingKey(key)}
                  onStop={() => setPlayingKey(null)}
                  onCenter={centerCard}
                />
              )
            }),
          )}
        </div>
      </div>
    </section>
  )
}
