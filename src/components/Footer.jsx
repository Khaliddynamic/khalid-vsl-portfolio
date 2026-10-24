import { site } from "../data/portfolio"
import { Icon } from "./icons"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <span className="footer__brand">
          <span className="dot" aria-hidden="true" />
          khalid<span className="k">.vsl</span>
        </span>
        <span className="footer__loc">© {site.year} · Editing &amp; motion graphics</span>
        <a
          className="toTop"
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          <Icon name="up" size={13} />
          Back to top
        </a>
      </div>
    </footer>
  )
}
