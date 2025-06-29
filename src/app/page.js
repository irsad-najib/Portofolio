"use client"
import Header from '../components/Header/Header'
import About from '../components/About/About'
import ScrollIndicator from '../components/ScrollIndicator'
import BackgroundPattern from '../components/BackgroundPattern'
import Skills from '../components/Skills/Skill'
import Projects from '../components/Projects/Project'
import Certificate from '@/components/Certificate/Certificates'
import Quote from '@/components/Quote/quote'
import Button from '@/components/Button'
import Footer from '@/components/Footer/Footer'

export default function Home() {
  const openPdf = () => {
    const pdfUrl = '/resume.pdf';
    window.open(pdfUrl, '_blank');
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
        <BackgroundPattern />
        <div id="header">
          <Header />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="certificates">
          <Certificate />
        </div>
        <Quote />
        <Button onClick={openPdf} variant="primary" size="large" className="mt-5 mx-auto block">
          Download Resume
        </Button>

        <ScrollIndicator />
        <Footer />
      </div>
    </>
  )
}