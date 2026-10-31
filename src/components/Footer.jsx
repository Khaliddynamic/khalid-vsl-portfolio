import { site } from "../data/portfolio"

export default function Footer() {
  function toTop(e) {
    e.preventDefault()
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div className="footer__brand">
            <b>
              khalid.vsl<sup>®</sup>
            </b>
            <span>Independent Video Editor &amp; Motion Designer</span>
          </div>
          <nav className="footer__links" aria-label="Footer">
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={`mailto:${site.email}`}>Email</a>
            <a href="#top" onClick={toTop}>
              Back to Top
            </a>
          </nav>
        </div>
        <div className="footer__legal">
          <span>
            © <span id="footYear">{site.year}</span> {site.brand} — Crafted with intention.
          </span>
          <span>Casablanca · Worldwide</span>
        </div>
      </div>
    </footer>
  )
}
