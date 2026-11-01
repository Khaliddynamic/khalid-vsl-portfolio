import { useEffect, useRef } from "react"
import { projects } from "../data/portfolio"
import { onPlayerOpen } from "./playerBus"

export default function PlayerDialog() {
  const dialogRef = useRef(null)
  const frameRef = useRef(null)
  const titleRef = useRef(null)
  const metaRef = useRef(null)
  const openRef = useRef(null)

  function close() {
    dialogRef.current?.close()
  }

  useEffect(() => {
    const dialog = dialogRef.current

    function clear() {
      if (frameRef.current) frameRef.current.innerHTML = ""
    }

    function open(id) {
      const p = projects.find((x) => x.id === id)
      if (!p || !dialog) return
      clear()
      titleRef.current.textContent = p.title
      metaRef.current.textContent =
        `${p.categoryLabel || "Video"} · ${p.aspectRatio < 1 ? "9:16" : "16:9"}`
      openRef.current.href = `https://vimeo.com/${p.vimeoId}`
      frameRef.current.classList.toggle("player__frame--tall", p.aspectRatio < 1)

      const iframe = document.createElement("iframe")
      iframe.src =
        `https://player.vimeo.com/video/${p.vimeoId}` +
        "?autoplay=1&playsinline=1&title=0&byline=0&portrait=0&color=F27A35&dnt=1"
      iframe.allow = "autoplay; fullscreen; picture-in-picture"
      iframe.allowFullScreen = true
      iframe.referrerPolicy = "strict-origin-when-cross-origin"
      iframe.title = `Video player — ${p.title}`
      frameRef.current.appendChild(iframe)

      if (!dialog.open) dialog.showModal()
      document.body.style.overflow = "hidden"
    }

    function onOpen(e) {
      open(e.detail)
    }

    return onPlayerOpen(onOpen)
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return undefined
    function onLock() {
      document.body.style.overflow = dialog.open ? "hidden" : ""
      if (!dialog.open) {
        if (frameRef.current) frameRef.current.innerHTML = ""
      }
    }
    dialog.addEventListener("close", onLock)
    return () => dialog.removeEventListener("close", onLock)
  }, [])

  return (
    <dialog
      id="playerDialog"
      className="player"
      aria-labelledby="playerTitle"
      ref={dialogRef}
      onClick={(e) => {
        if (e.target === dialogRef.current) close() // backdrop click
      }}
    >
      <div className="player__head">
        <div>
          <h2 className="player__title" id="playerTitle" tabIndex={-1} ref={titleRef}>
            Project
          </h2>
          <p className="player__meta" id="playerMeta" ref={metaRef}>
            Talking head
          </p>
        </div>
        <button className="player__close" type="button" aria-label="Close video player" onClick={close}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="player__frame" id="playerFrame" ref={frameRef} />
      <p className="player__note">
        Having trouble playing embedded?{" "}
        <a href="#" target="_blank" rel="noopener" id="playerOpen" ref={openRef}>
          Open this video on Vimeo
        </a>
        .
      </p>
    </dialog>
  )
}
