import StickyNav from "./components/StickyNav"
import Hero from "./components/Hero"
import Work from "./components/Work"
import Services from "./components/Services"
import Process from "./components/Process"
import Contact from "./components/Contact"
import Footer from "./components/Footer"

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <StickyNav />
      <main id="main">
        <Hero />
        <Work />
        <Services />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
