import React, { useState } from 'react';
import { Space_Grotesk } from 'next/font/google'
import Button from '../Button';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

const skills = [
    {
        "name": "JavaScript / TypeScript",
        "level": 90,
        "category": "Frontend"
    },
    {
        "name": "React / Next.js",
        "level": 85,
        "category": "Frontend"
    },
    {
        "name": "Tailwind CSS / Responsive Design",
        "level": 90,
        "category": "Frontend"
    },
    {
        "name": "HTML / CSS3",
        "level": 90,
        "category": "Frontend"
    },
    {
        "name": "React Native",
        "level": 70,
        "category": "Mobile"
    },
    {
        "name": "Node.js / Express",
        "level": 75,
        "category": "Backend"
    },
    {
        "name": "GraphQL",
        "level": 55,
        "category": "Backend"
    },
    {
        "name": "Python / Django",
        "level": 65,
        "category": "Backend"
    },
    {
        "name": "REST API & JWT Auth",
        "level": 85,
        "category": "Backend"
    },
    {
        "name": "File Upload (Multer, fs)",
        "level": 60,
        "category": "Backend"
    },
    {
        "name": "MySQL / Prisma ORM",
        "level": 85,
        "category": "Database"
    },
    {
        "name": "MongoDB / Firebase / Supabase",
        "level": 75,
        "category": "Database"
    },
    {
        "name": "Database Design & ERD",
        "level": 80,
        "category": "Database"
    },
    {
        "name": "Cloud Technologies (Vercel / Azure)",
        "level": 70,
        "category": "DevOps"
    },
    {
        "name": "DevOps & CI/CD",
        "level": 65,
        "category": "DevOps"
    },
    {
        "name": ".env & Secret Management",
        "level": 85,
        "category": "DevOps"
    },
    {
        "name": "Git / GitHub",
        "level": 75,
        "category": "Tools"
    },
    {
        "name": "Postman / Thunder Client",
        "level": 80,
        "category": "Tools"
    },
    {
        "name": "Browser DevTools",
        "level": 65,
        "category": "Tools"
    },
    {
        "name": "UI/UX Design (Figma)",
        "level": 45,
        "category": "Design"
    },
    {
        "name": "SEO & Accessibility",
        "level": 70,
        "category": "Other"
    },
    {
        "name": "PowerShell & Bash Scripting",
        "level": 60,
        "category": "Other"
    },
    {
        "name": "Machine Learning (Basic)",
        "level": 55,
        "category": "Other"
    }
];

const SkillsCard = ({ isVisible }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const displayedSkills = skills.slice(0, 6);
    const hiddenSkills = skills.slice(6);

    const openModal = () => {
        setIsModalOpen(true);
        setTimeout(() => setModalVisible(true), 10);
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
    };

    const SkillCardComponent = ({ skill, index, isModalCard = false }) => (
        <div
            className={`
                bg-zinc-900/80 border border-cyan-400/20 p-6 
                hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1 
                relative overflow-hidden group ${spaceGrotesk.className}
                ${!isModalCard && isVisible
                    ? 'opacity-100 translate-x-0'
                    : !isModalCard ? 'opacity-0 translate-x-8' : 'opacity-100'
                }
                ${isModalCard ? 'transition-all duration-300' : ''}
            `}
            style={!isModalCard ? {
                transition: `
                    opacity 700ms ease-out ${index * 150}ms,
                    transform 700ms ease-out ${index * 150}ms,
                    border-color 300ms ease-out,
                    box-shadow 300ms ease-out
                `
            } : {}}
        >
            {/* Hexagon background effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                <div className="card-hexagon-grid">
                    {Array.from({ length: 12 }).map((_, i) => (
                        <div
                            key={i}
                            className="card-hexagon"
                            style={{ '--delay': `${i * 0.05}s` }}
                        />
                    ))}
                </div>
            </div>

            {/* Top border effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

            {/* Category badge */}
            <div className="absolute top-2 right-2 px-2 py-1 bg-cyan-400/10 border border-cyan-400/30 rounded text-xs text-cyan-400 font-mono">
                {skill.category}
            </div>

            {/* Skill name */}
            <div className="font-mono text-lg font-semibold mb-4 text-cyan-400 relative z-10 mt-4">
                {skill.name}
            </div>

            {/* Progress bar container */}
            <div className="w-full h-2 bg-slate-500/30 rounded overflow-hidden relative mb-3 z-10">
                <div
                    className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 transition-all duration-1000 ease-out rounded"
                    style={{
                        width: `${skill.level}%`,
                        transitionDelay: isModalCard ? '0ms' : `${index * 150 + 600}ms`
                    }}
                />
            </div>

            {/* Percentage text */}
            <div className="text-right text-sm text-slate-400 font-mono relative z-10">
                {skill.level}%
            </div>

            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    );

    return (
        <section className="mb-20 relative">
            {/* Main skills grid (first 6) */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative z-10">
                {displayedSkills.map((skill, index) => (
                    <SkillCardComponent key={index} skill={skill} index={index} />
                ))}
            </div>

            {/* View More Button */}
            <div className="flex justify-center mt-12">
                <Button
                    variant="ghost"
                    size="medium"
                    onClick={openModal}
                    className={`
                        transition-all duration-700 ease-out
                        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                    style={{ transitionDelay: '900ms' }}
                >
                    <span>🔍</span>
                    View More Skills
                </Button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className={`
                    fixed inset-0 z-50 flex items-center justify-center p-4
                    transition-all duration-300 ease-out
                    ${modalVisible ? 'opacity-100' : 'opacity-0'}
                `}>
                    {/* Backdrop */}
                    <div
                        className={`
                            absolute inset-0 bg-black/80 backdrop-blur-sm
                            transition-opacity duration-300
                            ${modalVisible ? 'opacity-100' : 'opacity-0'}
                        `}
                        onClick={closeModal}
                    />

                    {/* Modal Content */}
                    <div className={`
                        relative bg-zinc-900/95 border border-cyan-400/20 rounded-lg 
                        max-w-6xl w-full max-h-[90vh] overflow-hidden
                        transition-all duration-300 ease-out
                        ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
                    `}>
                        {/* Modal Header */}
                        <div className="flex justify-between items-center p-6 border-b border-cyan-400/20">
                            <h3 className={`${spaceGrotesk.className} text-2xl font-bold text-cyan-400`}>
                                All Skills
                            </h3>
                            <button
                                onClick={closeModal}
                                className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-2xl font-bold"
                            >
                                ×
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                            {/* All skills grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                {skills.map((skill, index) => (
                                    <SkillCardComponent
                                        key={index}
                                        skill={skill}
                                        index={index}
                                        isModalCard={true}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="flex justify-end p-6 border-t border-cyan-400/20">
                            <Button
                                variant="secondary"
                                size="medium"
                                onClick={closeModal}
                            >
                                Close
                            </Button>
                        </div>

                        {/* Modal border effects */}
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400" />

                        {/* Corner indicators */}
                        <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <div className="absolute bottom-2 left-2 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                    </div>
                </div>
            )}

            <style jsx>{`
                .card-hexagon-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(3, 1fr);
                    gap: 6px;
                    padding: 12px;
                    height: 100%;
                    width: 100%;
                }
                
                .card-hexagon {
                    width: 12px;
                    height: 12px;
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