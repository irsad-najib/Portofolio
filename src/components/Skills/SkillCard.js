import React from 'react';
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

const skills = [
    {
        name: "JavaScript / TypeScript",
        level: 95,
    },
    {
        name: "React / Next.js",
        level: 90,
    },
    {
        name: "Node.js / Express",
        level: 85,
    },
    {
        name: "Python / Django",
        level: 80,
    },
    {
        name: "Database Design",
        level: 88,
    },
    {
        name: "Cloud Technologies",
        level: 75,
    },
    {
        name: "DevOps & CI/CD",
        level: 70,
    },
    {
        name: "UI/UX Design",
        level: 78,
    },
    {
        name: "Mobile Development",
        level: 65,
    },
];

const SkillsCard = ({ isVisible }) => {
    return (
        <section className="mb-20 relative" id="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className={`
                            bg-zinc-900/80 border border-cyan-400/20 p-8 
                            hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1 
                            relative overflow-hidden group ${spaceGrotesk.className}
                            ${isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-8'
                            }
                        `}
                        style={{
                            // Hanya untuk initial animation
                            transition: `
                                opacity 700ms ease-out ${index * 150}ms,
                                transform 700ms ease-out ${index * 150}ms,
                                border-color 300ms ease-out,
                                box-shadow 300ms ease-out
                            `
                        }}
                    >
                        {/* Individual card hover effect */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                            <div className="card-hexagon-grid">
                                {Array.from({ length: 15 }).map((_, i) => (
                                    <div
                                        key={i}
                                        className="card-hexagon"
                                        style={{
                                            '--delay': `${i * 0.05}s`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Hover effect overlay */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                        {/* Skill name */}
                        <div className={`
                            font-mono text-lg font-semibold mb-4 text-cyan-400 relative z-10
                            transition-all duration-500 ease-out
                            ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4'
                            }
                        `}
                            style={{
                                transitionDelay: `${index * 150 + 200}ms`
                            }}
                        >
                            {skill.name}
                        </div>

                        {/* Progress bar container */}
                        <div className={`
                            w-full h-2 bg-slate-500/30 rounded overflow-hidden relative mb-3 z-10
                            transition-all duration-500 ease-out
                            ${isVisible
                                ? 'opacity-100 scale-x-100'
                                : 'opacity-0 scale-x-0'
                            }
                        `}
                            style={{
                                transitionDelay: `${index * 150 + 400}ms`,
                                transformOrigin: 'left'
                            }}
                        >
                            {/* Progress bar fill */}
                            <div
                                className={`
                                    h-full bg-gradient-to-r from-cyan-400 to-violet-500 
                                    transition-all duration-1000 ease-out rounded
                                    ${isVisible ? 'animate-pulse' : ''}
                                `}
                                style={{
                                    width: isVisible ? `${skill.level}%` : '0%',
                                    transitionDelay: `${index * 150 + 600}ms`
                                }}
                            />
                        </div>

                        {/* Percentage text */}
                        <div className={`
                            text-right text-sm text-slate-400 font-mono relative z-10
                            transition-all duration-500 ease-out
                            ${isVisible
                                ? 'opacity-100 translate-y-0'
                                : 'opacity-0 translate-y-4'
                            }
                        `}
                            style={{
                                transitionDelay: `${index * 150 + 800}ms`
                            }}
                        >
                            {isVisible ? skill.level : 0}%
                        </div>

                        {/* Background glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                ))}
            </div>
            <style jsx>{`
                .card-hexagon-grid {
                    display: grid;
                    grid-template-columns: repeat(5, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 8px;
                    padding: 16px;
                    height: 100%;
                    width: 100%;
                }
                
                .card-hexagon {
                    width: 16px;
                    height: 16px;
                    background: linear-gradient(45deg, rgba(0, 255, 255, 0.4), rgba(138, 43, 226, 0.4));
                    clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
                    animation: hexagonPulse 2s infinite ease-in-out;
                    animation-delay: var(--delay);
                }
                
                @keyframes hexagonPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
            `}</style>
        </section>
    );
};

export default SkillsCard;