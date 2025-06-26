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
        <section className="mb-20" id="skills">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {skills.map((skill, index) => (
                    <div
                        key={index}
                        className={`
                            bg-zinc-900/80 border border-cyan-400/20 p-8 
                            transition-all duration-700 ease-out
                            hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1 
                            relative overflow-hidden group ${spaceGrotesk.className}
                            ${isVisible
                                ? 'opacity-100 translate-x-0'
                                : 'opacity-0 translate-x-8'
                            }
                        `}
                        style={{
                            transitionDelay: `${index * 150}ms`
                        }}
                    >
                        {/* Hover effect overlay */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

                        {/* Skill name */}
                        <div className={`
                            font-mono text-lg font-semibold mb-4 text-cyan-400
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
                            w-full h-2 bg-slate-500/30 rounded overflow-hidden relative mb-3
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
                            text-right text-sm text-slate-400 font-mono
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
        </section>
    );
};

export default SkillsCard;