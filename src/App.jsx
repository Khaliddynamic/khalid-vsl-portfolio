import StickyNav from "./components/StickyNav"
import Hero from "./components/Hero"
import Work from "./components/Work"
import About from "./components/About"
import Contact from "./components/Contact"
import Footer from "./components/Footer"
import PlayerDialog from "./components/PlayerDialog"

export default function App() {
  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <StickyNav />
      <main id="main">
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <PlayerDialog />
    </>
  )
}
