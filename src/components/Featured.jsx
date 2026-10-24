import { motion } from "framer-motion"
import { featured } from "../data/portfolio"
import { Reveal } from "./Reveal"
import SectionHeading from "./SectionHeading"
import { Icon } from "./icons"

export function VideoPlayer({ src, poster, label }) {
  return (
    <div className="group relative aspect-video overflow-hidden rounded-2xl border border-offwhite/10 bg-black shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        src={src}
        controls
        preload="metadata"
        playsInline
        aria-label={label}
      />
      <div className="pointer-events-none absolute inset-0 bg-navy/20 mix-blend-luminosity" />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-offwhite/10" />
    </div>
  )
}

export default function Featured() {
  return (
    <section id="featured" className="relative scroll-mt-20 bg-base-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[110rem] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading index="03" label="Showreel" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-6">
            <h2 className="font-display uppercase leading-[0.85] text-offwhite [font-size:clamp(2.4rem,8vw,7.5rem)]">
              Featured
              <br />
              Projects
            </h2>
            <div className="flex items-center gap-2 rounded-full border border-offwhite/15 px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-muted">
              <span className="h-2 w-2 rounded-full bg-accent" />
              2 case studies · press play
            </div>
          </div>
        </Reveal>

        <div className="mt-14 space-y-24 lg:mt-24 lg:space-y-36">
          {featured.map((project, i) => {
            const reverse = i % 2 === 1
            return (
              <article key={project.id} className="relative grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
                {/* index marker */}
                <span
                  className={`pointer-events-none absolute -top-14 z-0 select-none font-display uppercase text-offwhite/[0.06] [font-size:clamp(6rem,16vw,14rem)] leading-none lg:-top-20 ${
                    reverse ? "right-0" : "left-0"
                  }`}
                >
                  0{i + 1}
                </span>

                <Reveal
                  className={`relative z-10 ${
                    reverse ? "lg:order-2" : ""
                  } lg:col-span-7`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 40, rotate: reverse ? 1.5 : -1.5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                    className="relative"
                  >
                    <div
                      className={`absolute -top-4 h-full w-full rounded-2xl border border-accent/40 lg:-top-6 ${
                        reverse ? "-left-4 lg:-left-6" : "-right-4 lg:-right-6"
                      }`}
                    />
                    <VideoPlayer
                      src={project.videoUrl}
                      poster={project.poster}
                      label={project.title}
                    />
                  </motion.div>
                </Reveal>

                <div className={`relative z-10 ${reverse ? "lg:order-1" : ""} lg:col-span-5`}>
                  <Reveal delay={0.15}>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-accent px-4 py-1.5 font-display text-xs uppercase tracking-[0.2em] text-base">
                        {project.label}
                      </span>
                      <span className="text-xs uppercase tracking-[0.2em] text-muted">
                        {project.year}
                      </span>
                    </div>
                    <h3 className="mt-5 font-display uppercase leading-[0.95] text-offwhite [font-size:clamp(1.8rem,4.5vw,3.6rem)]">
                      {project.title}
                    </h3>
                  </Reveal>

                  <Reveal delay={0.25}>
                    <p className="mt-6 text-sm leading-relaxed text-offwhite/70 sm:text-base">
                      {project.description}
                    </p>
                  </Reveal>

                  <Reveal delay={0.35}>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      {project.tools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-full border border-offwhite/15 px-3.5 py-1.5 text-xs text-offwhite/70 transition-colors hover:border-accent/60 hover:text-offwhite"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center gap-3 border-t border-offwhite/10 pt-5">
                      <Icon name="play" size={16} className="text-accent" />
                      <p className="text-xs uppercase tracking-[0.2em] text-muted">
                        {project.role}
                      </p>
                    </div>
                  </Reveal>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}