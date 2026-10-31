import { motion, useReducedMotion } from "framer-motion"

export function Reveal({
  children,
  delay = 0,
  y = 14,
  className = "",
  innerClassName = "",
  as: Tag = "div",
}) {
  const reduced = useReducedMotion()
  return (
    <Tag className={className}>
      <motion.div
        data-reveal
        className={innerClassName}
        initial={reduced ? false : { opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </Tag>
  )
}
