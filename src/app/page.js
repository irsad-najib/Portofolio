import Header from '../components/Header'
import About from '../components/About'
import ScrollIndicator from '../components/ScrollIndicator'
import BackgroundPattern from '../components/BackgroundPattern'
import Skills from '../components/Skill'

export default function Home() {
  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
        <BackgroundPattern />
        <Header />
        <About />
        <Skills />

        <ScrollIndicator />
      </div>
    </>
  )
}