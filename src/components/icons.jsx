const paths = {
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.2" fill="currentColor" />
    </>
  ),
  tiktok: (
    <path
      d="M14.5 3v10.6a3.9 3.9 0 1 1-3.9-3.9M11 3v5.5a3.9 3.9 0 1 0 3.5 3.9V3M9 3h5.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12.5" rx="3.5" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.4 9.6v5l4.6-2.5z" fill="currentColor" />
    </>
  ),
  behance: (
    <path
      d="M3 7.5h5.2a3.1 3.1 0 0 1 0 6.2l.1.1H3zM3 7.5h5.4a3 3 0 0 1 .4 6H3zM10.6 13a2.6 2.6 0 0 1 5.2-.5h-5.2zM13.4 8.2a2.7 2.7 0 0 0 1.4 5.3h1.8v-2M17.3 12.2h-3.8"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  play: (
    <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
  ),
  arrow: (
    <path d="M4 12h15M13 6l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  upRight: (
    <path d="M7 17 17 7M8 7h9v9" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  up: (
    <path d="M12 19V5M5 12l7-7 7 7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  ),
}

export function Icon({ name, size = 22, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
    >
      {paths[name] ?? null}
    </svg>
  )
}