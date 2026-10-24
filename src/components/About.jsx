import { motion } from "framer-motion"
import { about, site } from "../data/portfolio"
import { Reveal } from "./Reveal"
import SectionHeading from "./SectionHeading"

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-20 bg-base py-24 sm:py-32">
      <div className="mx-auto max-w-[110rem] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading index="01" label="About" />
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-5xl font-display uppercase leading-[0.9] text-offwhite [font-size:clamp(2.4rem,8vw,7.5rem)]">
            {site.role.split(" ").slice(0, 2).join(" ")}
            <span className="text-accent">.</span>
            <br />
            {site.location.split(",")[0]}
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          {/* Portrait */}
          <Reveal className="lg:col-span-5">
            <div className="relative">
              <div className="absolute -left-4 -top-4 h-full w-full border border-accent/60" />
              <motion.img
                src={site.portrait}
                alt={`${site.name} portrait`}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative aspect-[3/4] w-full object-cover contrast-125 saturate-0 [filter:grayscale(1)_sepia(0.35)_hue-rotate(90deg)_saturate(0.6)]"
              />
              <div className="absolute bottom-0 right-0 translate-x-4 translate-y-4 bg-accent px-4 py-2 font-display text-sm uppercase tracking-[0.2em] text-base">
                {site.location.split(",")[0]} · MA
              </div>
            </div>
          </Reveal>

          {/* Bio + skills */}
          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <div className="space-y-5 text-base leading-relaxed text-offwhite/75 sm:text-lg">
                {about.bio.map((p) => (
                  <p key={p.slice(0, 24)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {/* Software skills */}
            <Reveal delay={0.2}>
              <div id="skills" className="mt-12 scroll-mt-24 border-t border-offwhite/10 pt-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-muted">
                    Software Skills
                  </h3>
                </div>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {about.software.map((soft) => (
                    <div
                      key={soft.name}
                      className="group flex items-center gap-2.5 rounded-full border border-offwhite/15 py-2 pl-2 pr-5 transition-colors duration-300 hover:border-accent/60 hover:bg-accent/10"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy font-display text-xs text-accent">
                        {soft.name.charAt(0)}
                      </span>
                      <span className="text-sm font-medium text-offwhite">
                        {soft.name}
                      </span>
                      <span className="hidden text-[11px] text-muted sm:inline">
                        {soft.note}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Experience */}
            <Reveal delay={0.3}>
              <div id="experience" className="mt-12 scroll-mt-24 border-t border-offwhite/10 pt-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-muted">
                    Experience
                  </h3>
                </div>
                <ul className="mt-6 space-y-0 divide-y divide-offwhite/10 border-y border-offwhite/10">
                  {about.experience.map((exp) => (
                    <li key={exp.role} className="group py-6 sm:flex sm:items-baseline sm:justify-between sm:gap-8">
                      <div className="sm:w-1/2">
                        <p className="font-display text-lg uppercase tracking-wide text-offwhite transition-colors group-hover:text-accent sm:text-xl">
                          {exp.role}
                        </p>
                        <p className="mt-1 text-sm text-muted">
                          {exp.org}
                        </p>
                      </div>
                      <div className="mt-3 sm:mt-0 sm:w-1/2 sm:text-right">
                        <p className="font-display text-sm uppercase tracking-[0.2em] text-accent">
                          {exp.period}
                        </p>
                        <p className="mt-1 max-w-[34ch] text-sm leading-relaxed text-offwhite/60 sm:ml-auto">
                          {exp.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Languages */}
            <Reveal delay={0.4}>
              <div className="mt-12 border-t border-offwhite/10 pt-8">
                <div className="flex items-center gap-3">
                  <span className="h-px w-6 bg-accent" />
                  <h3 className="text-xs uppercase tracking-[0.3em] text-muted">
                    Languages
                  </h3>
                </div>
                <div className="mt-6 grid gap-6 sm:grid-cols-3">
                  {about.languages.map((lang, i) => (
                    <div key={lang.name}>
                      <div className="flex items-baseline justify-between">
                        <p className="font-display text-base uppercase tracking-wide text-offwhite">
                          {lang.name}
                        </p>
                        <span className="text-xs text-muted">{lang.note}</span>
                      </div>
                      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-offwhite/10">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${lang.percent}%` }}
                          viewport={{ once: true, margin: "-40px" }}
                          transition={{ duration: 1, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
                          className="h-full rounded-full bg-accent"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}