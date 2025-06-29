'use client';
import React, { useEffect, useRef, useState } from 'react';
import { Space_Grotesk, Orbitron } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700'],
});

export default function Quote() {
    const [isVisible, setIsVisible] = useState(false);
    const quoteRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -50px 0px'
            }
        );

        if (quoteRef.current) {
            observer.observe(quoteRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section className="relative mb-20 px-5 py-10 flex justify-center" ref={quoteRef}>
            <div className={`
                group relative max-w-4xl w-full bg-zinc-900/80 border border-cyan-400/20 
                p-8 rounded-lg shadow-2xl overflow-hidden
                transition-all duration-700 ease-out
                hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}>
                {/* Top border hover effect */}
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                {/* Hexagon grid effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                    <div className="hexagon-grid">
                        {Array.from({ length: 24 }).map((_, i) => (
                            <div
                                key={i}
                                className="hexagon"
                                style={{
                                    '--delay': `${i * 0.1}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Quote Icon */}
                <div className={`
                    text-6xl text-cyan-400/30 leading-none mb-4 relative z-10
                    transition-all duration-500 ease-out delay-200
                    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                `}>
                    "
                </div>

                {/* Quote Text */}
                <blockquote className={`
                    ${spaceGrotesk.className} text-slate-300 text-lg md:text-xl leading-relaxed 
                    font-medium italic mb-6 relative z-10 text-center
                    transition-all duration-700 ease-out delay-300
                    group-hover:text-cyan-300
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
                `}>
                    "The important thing is not to stop questioning. Curiosity has its own reason for existing."
                </blockquote>

                {/* Author Section */}
                <div className="flex items-center justify-between relative z-10">
                    <cite className={`
                        ${orbitron.className} text-cyan-400 font-semibold not-italic 
                        text-sm md:text-base uppercase tracking-wide
                        transition-all duration-700 ease-out delay-500
                        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}
                    `}>
                        — Albert Einstein
                    </cite>

                    {/* Animated Dots */}
                    <div className="flex space-x-2">
                        {[0, 1, 2].map((index) => (
                            <div
                                key={index}
                                className={`
                                    w-2 h-2 rounded-full bg-cyan-400
                                    transition-all duration-500 ease-out
                                    ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
                                `}
                                style={{
                                    transitionDelay: `${700 + index * 100}ms`,
                                    animation: isVisible ? `pulse 2s infinite ${index * 0.3}s` : 'none'
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                {/* Left accent line */}
                <div className={`
                    absolute left-0 top-0 w-1 bg-gradient-to-b from-cyan-400 to-violet-500 
                    transition-all duration-1000 ease-out delay-400 rounded-full
                    ${isVisible ? 'h-full opacity-100' : 'h-0 opacity-0'}
                `} />
            </div>

            <style jsx>{`
                .hexagon-grid {
                    display: grid;
                    grid-template-columns: repeat(8, 1fr);
                    grid-template-rows: repeat(4, 1fr);
                    gap: 12px;
                    padding: 20px;
                    height: 100%;
                    width: 100%;
                }
                
                .hexagon {
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(138, 43, 226, 0.3));
                    clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
                    animation: hexagonPulse 2s infinite ease-in-out;
                    animation-delay: var(--delay);
                }
                
                @keyframes hexagonPulse {
                    0%, 100% { 
                        opacity: 0.3; 
                        transform: scale(0.8); 
                    }
                    50% { 
                        opacity: 0.8; 
                        transform: scale(1.1); 
                    }
                }
                
                @keyframes pulse {
                    0%, 100% { 
                        opacity: 0.4; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.2); 
                    }
                }
            `}</style>
        </section>
    );
}