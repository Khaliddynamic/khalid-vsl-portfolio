import { motion } from "framer-motion"

export function Reveal({
  children,
  delay = 0,
  y = 18,
  className = "",
  innerClassName = "",
  as: Tag = "div",
}) {
  return (
    <Tag className={className}>
      <motion.div
        data-reveal
        className={innerClassName}
        initial={{ opacity: 0, y }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </Tag>
  )
}
