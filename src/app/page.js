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

export default function Home() {
  const openPdf = () => {
    // Ganti dengan URL PDF kamu
    const pdfUrl = '/resume.pdf';

    // Membuka PDF di tab baru
    window.open(pdfUrl, '_blank');
  };
  return (
    <>

      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white overflow-x-hidden">
        <BackgroundPattern />
        <Header />
        <About />
        <Skills />
        <Projects />
        <Certificate />
        <Quote />
        <Button onClick={openPdf} variant="primary" size="large" className="mt-5 mx-auto block">
          Download Resume
        </Button>

        <ScrollIndicator />
      </div>
    </>
  )
}