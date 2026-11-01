import { site } from "../data/portfolio"

export default function Footer() {
  function toTop(e) {
    e.preventDefault()
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span className="footer__brand">khalid.vsl</span>
        <span className="footer__legal">
          © <span id="footYear">{site.year}</span> Khalid — {site.role}
        </span>
        <nav className="footer__links" aria-label="Footer">
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={site.whatsapp} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
          <a href={`mailto:${site.email}`}>Email</a>
          <a href="#top" onClick={toTop}>
            Back to top
          </a>
        </nav>
      </div>
    </footer>
  )
}
