import { motion } from "framer-motion"
import { recap } from "../data/portfolio"
import { Reveal } from "./Reveal"
import SectionHeading from "./SectionHeading"
import { Icon } from "./icons"

const palettes = [
  { from: "#1c2532", to: "#0b1a2b", dot: "#3f5f8a" },
  { from: "#232426", to: "#111318", dot: "#0aff9d" },
  { from: "#2a2333", to: "#15121c", dot: "#b08cff" },
  { from: "#20262b", to: "#0f1417", dot: "#4dd4c8" },
  { from: "#262012", to: "#14100a", dot: "#ffc46b" },
]

export default function Recap() {
  return (
    <section id="recap" className="relative scroll-mt-20 bg-navy py-24 sm:py-32">
      <div className="mx-auto max-w-[110rem] px-6 sm:px-8 lg:px-12">
        <Reveal>
          <SectionHeading index="02" label="Selected Work" />
        </Reveal>

        <Reveal delay={0.1}>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 className="font-display uppercase leading-[0.85] text-offwhite [font-size:clamp(2.4rem,8vw,7.5rem)]">
              Project
              <br />
              Recap<span className="text-accent">*</span>
            </h2>
            <p className="pb-2 font-display text-lg uppercase tracking-[0.2em] text-accent sm:text-2xl">
              [{recap.year}]
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid auto-rows-[9rem] grid-cols-1 gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:auto-rows-[10rem]">
          {recap.items.map((item, i) => {
            const pal = palettes[i % palettes.length]
            const span =
              (item.col === 2 ? " sm:col-span-2" : "") +
              (item.row === 2 ? " lg:row-span-2" : "")
            return (
              <Reveal
                key={item.title}
                delay={(i % 4) * 0.08}
                className={span}
              >
                <motion.a
                  href="#featured"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 24 }}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl"
                  style={{
                    background: `linear-gradient(140deg, ${pal.from}, ${pal.to})`,
                  }}
                  aria-label={item.title}
                >
                  {/* generative pattern */}
                  <svg
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="absolute inset-0 h-full w-full opacity-40 transition-opacity duration-500 group-hover:opacity-60"
                  >
                    <defs>
                      <mask id={`m${i}`}>
                        <rect width="100" height="100" fill="white" />
                        <circle cx={18 + (i * 23) % 60} cy={22 + (i * 41) % 60} r={14 + (i % 4) * 6} fill="black" />
                        <rect x={48 + (i * 17) % 30} y={55 + (i * 29) % 30} width={28} height={18} transform={`rotate(${i * 20} 50 50)`} fill="black" />
                      </mask>
                    </defs>
                    <rect width="100" height="100" fill={pal.dot} mask={`url(#m${i})`} />
                  </svg>

                  {/* grain */}
                  <div
                    className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
                    style={{
                      backgroundImage:
                        "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)' opacity='0.6'/%3E%3C/svg%3E\")",
                    }}
                  />

                  {/* hover zoom backdrop */}
                  <div className="absolute inset-0 scale-110 bg-offwhite/5 mix-blend-luminosity opacity-0 transition-all duration-500 group-hover:scale-100 group-hover:opacity-100" />

                  {/* top meta */}
                  <div className="relative z-10 flex items-start justify-between p-4 sm:p-5">
                    <span className="rounded-full bg-black/30 px-3 py-1 text-[10px] uppercase tracking-[0.16em] text-offwhite/80 backdrop-blur-sm">
                      {item.category}
                    </span>
                    <span className="font-display text-sm text-offwhite/50">
                      {item.ratio}
                    </span>
                  </div>

                  {/* bottom overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between gap-3 p-4 sm:p-5">
                    <div className="translate-y-1 transition-transform duration-400 group-hover:translate-y-0">
                      <p className="font-display text-base uppercase leading-tight text-offwhite sm:text-lg">
                        {item.title}
                      </p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-offwhite/50">
                        {item.note}
                      </p>
                    </div>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-base opacity-0 transition-all duration-400 group-hover:opacity-100">
                      <Icon name="arrow" size={16} />
                    </span>
                  </div>
                </motion.a>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}