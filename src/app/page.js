"use client";
import { Suspense, lazy } from 'react';
import Header from '../components/Header/Header';
import BackgroundPattern from '../components/BackgroundPattern';
import Loading from '../components/Loading';

// Lazy load components
const About = lazy(() => import('../components/About/About'));
const Skills = lazy(() => import('../components/Skills/Skill'));
const Projects = lazy(() => import('../components/Projects/Project'));
const Certificate = lazy(() => import('../components/Certificate/Certificates'));
const Quote = lazy(() => import('../components/Quote/quote'));
const Footer = lazy(() => import('../components/Footer/Footer'));
const Button = lazy(() => import('../components/Button'));

export default function Home() {
  const openPdf = () => {
    const pdfUrl = '/resume.pdf';
    window.open(pdfUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white overflow-x-hidden transition-colors duration-300">
      <BackgroundPattern />

      {/* Above the fold content - load immediately */}
      <div id="header">
        <Header />
      </div>

      {/* Below the fold content - lazy loaded */}
      <Suspense fallback={<Loading />}>
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

        <div id="quote">
          <Quote />
        </div>

        <div className="flex justify-center py-10">
          <Button
            onClick={openPdf}
            variant="primary"
            size="large"
            className="shadow-lg hover:shadow-cyan-400/20"
          >
            <span>📄</span>
            Download Resume
          </Button>
        </div>

        <Footer />
      </Suspense>
    </div>
  );
}