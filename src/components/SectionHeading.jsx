export default function SectionHeading({ index, label, className = "" }) {
  return (
    <span className={`sec__label ${className}`}>
      <b>{index}</b> {label}
    </span>
  )
}
