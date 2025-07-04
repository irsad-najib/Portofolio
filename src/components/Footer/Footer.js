'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Space_Grotesk, Orbitron } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default function Footer() {
    const [isVisible, setIsVisible] = useState(false);
    const [currentTime, setCurrentTime] = useState('');
    const footerRef = useRef(null);

    // Update time every second
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setCurrentTime(now.toLocaleTimeString('en-US', {
                hour12: false,
                timeZone: 'Asia/Jakarta'
            }));
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Intersection Observer for animation
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/irsad-najib',
            icon: '💻'
        },
        {
            name: 'LinkedIn',
            url: 'https://www.linkedin.com/in/irsad-najib-eka-putra-2479022aa/',
            icon: '💼'
        },
        {
            name: 'Email',
            url: 'https://mail.google.com/mail/?view=cm&fs=1&to=irsad.putra270305@gmail.com&su=Hello%20from%20your%20portfolio',
            icon: '📧'
        },
        {
            name: 'Instagram',
            url: 'https://www.instagram.com/irsadnajibeka/',
            icon: '📸'
        }
    ];

    // Perbaikan: Menggunakan ID yang sesuai dengan yang ada di page.js
    const quickLinks = [
        { name: 'Home', id: 'header' },
        { name: 'About', id: 'about' },
        { name: 'Skills', id: 'skills' },
        { name: 'Projects', id: 'projects' },
        { name: 'Certificates', id: 'certificates' }
    ];

    // Perbaikan: Menggunakan getElementById untuk akurasi yang lebih baik
    const scrollToSection = (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer
            ref={footerRef}
            className={`
                relative bg-zinc-900/95 border-t border-cyan-400/20 mt-20
                transition-all duration-700 ease-out
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
        >
            {/* Top border effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 via-cyan-400 to-violet-500" />

            {/* Hexagon background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none">
                <div className="footer-hexagon-grid">
                    {Array.from({ length: 40 }).map((_, i) => (
                        <div
                            key={i}
                            className="footer-hexagon"
                            style={{
                                '--delay': `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <div className="relative z-10 px-5 py-12">
                <div className="max-w-6xl mx-auto">
                    {/* Main Footer Content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">

                        {/* Brand Section */}
                        <div className={`
                            lg:col-span-2 transition-all duration-700 ease-out delay-100
                            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        `}>
                            <h2 className={`
                                ${orbitron.className} text-2xl font-bold text-cyan-400 mb-4
                                uppercase tracking-wide
                            `}>
                                Irsad Najib Eka Putra
                            </h2>
                            <p className={`
                                ${spaceGrotesk.className} text-slate-300 leading-relaxed mb-4
                                max-w-md
                            `}>
                                Passionate Information Engineering student specializing in fullstack development
                                and modern web technologies. Building the future, one line of code at a time.
                            </p>

                            {/* Live Clock */}
                            <div className="flex items-center gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                    <span className={`${spaceGrotesk.className} text-slate-400`}>
                                        GMT+7
                                    </span>
                                </div>
                                <div className={`
                                    ${orbitron.className} text-cyan-400 font-mono
                                    px-3 py-1 bg-zinc-800/60 border border-cyan-400/20 rounded
                                `}>
                                    {currentTime}
                                </div>
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div className={`
                            transition-all duration-700 ease-out delay-200
                            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        `}>
                            <h3 className={`
                                ${orbitron.className} text-lg font-semibold text-cyan-400 mb-4
                                uppercase tracking-wide
                            `}>
                                Navigation
                            </h3>
                            <ul className="space-y-2">
                                {quickLinks.map((link, index) => (
                                    <li key={link.id}>
                                        <button
                                            onClick={() => scrollToSection(link.id)}
                                            className={`
                                                ${spaceGrotesk.className} text-slate-400 hover:text-cyan-400
                                                transition-all duration-300 text-left
                                                hover:translate-x-2 relative group
                                            `}
                                            style={{ transitionDelay: `${index * 50}ms` }}
                                        >
                                            <span className="relative z-10">{link.name}</span>
                                            <div className="absolute left-0 bottom-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 group-hover:w-full transition-all duration-300" />
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Social Links */}
                        <div className={`
                            transition-all duration-700 ease-out delay-300
                            ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                        `}>
                            <h3 className={`
                                ${orbitron.className} text-lg font-semibold text-cyan-400 mb-4
                                uppercase tracking-wide
                            `}>
                                Connect
                            </h3>
                            <div className="grid grid-cols-2 gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={social.name}
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`
                                            group flex items-center gap-2 p-3
                                            bg-zinc-800/60 border border-cyan-400/20 rounded
                                            hover:border-cyan-400 hover:bg-zinc-800/80
                                            transition-all duration-300 hover:-translate-y-1
                                            hover:shadow-lg hover:shadow-cyan-400/10
                                        `}
                                        style={{ transitionDelay: `${index * 100}ms` }}
                                    >
                                        <span className="text-lg group-hover:scale-110 transition-transform duration-300">
                                            {social.icon}
                                        </span>
                                        <span className={`
                                            ${spaceGrotesk.className} text-slate-400 
                                            group-hover:text-cyan-400 text-sm
                                            transition-colors duration-300
                                        `}>
                                            {social.name}
                                        </span>
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className={`
                        w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent mb-6
                        transition-all duration-1000 ease-out delay-400
                        ${isVisible ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'}
                    `} />

                    {/* Bottom Section */}
                    <div className={`
                        flex flex-col md:flex-row justify-between items-center gap-4
                        transition-all duration-700 ease-out delay-500
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}>
                        {/* Copyright */}
                        <div className={`${spaceGrotesk.className} text-slate-400 text-sm text-center md:text-left`}>
                            © {new Date().getFullYear()} Irsad Najib Eka Putra. All rights reserved.
                        </div>

                        {/* Back to Top Button */}
                        <button
                            onClick={scrollToTop}
                            className={`
                                group flex items-center gap-2 px-4 py-2
                                bg-zinc-800/60 border border-cyan-400/20 rounded
                                hover:border-cyan-400 hover:bg-zinc-800/80
                                transition-all duration-300 hover:-translate-y-1
                                ${spaceGrotesk.className} text-slate-400 hover:text-cyan-400
                                text-sm uppercase tracking-wide
                            `}
                        >
                            <span className="group-hover:animate-bounce">↑</span>
                            Back to Top
                        </button>
                    </div>

                    {/* Tech Stack Info */}
                    <div className={`
                        mt-6 pt-6 border-t border-cyan-400/10
                        transition-all duration-700 ease-out delay-600
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                    `}>
                        <div className={`
                            ${spaceGrotesk.className} text-slate-500 text-xs text-center
                            flex flex-wrap justify-center gap-2 items-center
                        `}>
                            <span>Built with</span>
                            <span className="text-cyan-400">Next.js</span>
                            <span>•</span>
                            <span className="text-cyan-400">Tailwind CSS</span>
                            <span>•</span>
                            <span className="text-cyan-400">Framer Motion</span>
                            <span>•</span>
                            <span>Deployed on</span>
                            <span className="text-cyan-400">Vercel</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Corner indicators */}
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" />
            <div className="absolute bottom-4 right-4 w-2 h-2 bg-violet-500 rounded-full animate-pulse opacity-60" />

            <style jsx>{`
                .footer-hexagon-grid {
                    display: grid;
                    grid-template-columns: repeat(10, 1fr);
                    grid-template-rows: repeat(4, 1fr);
                    gap: 16px;
                    padding: 20px;
                    height: 100%;
                    width: 100%;
                }
                
                .footer-hexagon {
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(45deg, rgba(0, 255, 255, 0.1), rgba(138, 43, 226, 0.1));
                    clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
                    animation: footerHexagonPulse 3s infinite ease-in-out;
                    animation-delay: var(--delay);
                }
                
                @keyframes footerHexagonPulse {
                    0%, 100% { 
                        opacity: 0.1; 
                        transform: scale(0.8); 
                    }
                    50% { 
                        opacity: 0.3; 
                        transform: scale(1.1); 
                    }
                }
            `}</style>
        </footer>
    );
}