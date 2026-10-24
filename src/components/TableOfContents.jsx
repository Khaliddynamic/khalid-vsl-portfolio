import { motion } from "framer-motion"
import { tocFull } from "../data/portfolio"
import { Reveal } from "./Reveal"

export default function TableOfContents() {
  function jump(e, id) {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative bg-base-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[110rem] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-accent" />
            <span className="font-display text-sm uppercase tracking-[0.3em] text-accent">
              00
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-muted">
              Index
            </span>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display uppercase leading-[0.85] text-offwhite [font-size:clamp(2.6rem,9vw,8.5rem)]">
            Table of
            <br />
            Contents
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className="mt-14 flex max-w-4xl flex-wrap gap-3.5 sm:mt-20">
            {tocFull.map((item, i) => (
              <motion.button
                key={item.id}
                onClick={(e) => jump(e, item.id)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 22 }}
                className="group flex items-center gap-3 rounded-full border border-offwhite/20 px-6 py-3.5 font-display text-lg uppercase tracking-wide text-offwhite transition-colors duration-300 hover:border-accent hover:bg-accent hover:text-base sm:px-8 sm:py-4 sm:text-2xl"
              >
                <span className="text-xs text-accent transition-colors group-hover:text-base/70">
                  0{i + 1}
                </span>
                {item.label}
              </motion.button>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <p className="mt-12 max-w-2xl text-sm leading-relaxed text-muted">
            Scroll is the timeline. Each section below is cut, trimmed and
            exported in one take — no filler, no B-roll of me waving at a
            camera.
          </p>
        </Reveal>
      </div>
    </section>
  )
}