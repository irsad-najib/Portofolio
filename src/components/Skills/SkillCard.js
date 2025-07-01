import React, { useState, useEffect, useRef } from 'react';
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

const SkillsCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [showCards, setShowCards] = useState(false); // Tambahkan state baru untuk cards
    const [animateProgress, setAnimateProgress] = useState(false);
    const sectionRef = useRef(null);

    const displayedSkills = skills.slice(0, 6);

    // Set up Intersection Observer - SAMAIN SAMA PROJECT
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Delay cards animation setelah section terdeteksi (sama seperti Project)
                    setTimeout(() => {
                        setShowCards(true);
                    }, 600); // Delay untuk entrance cards
                    // Delay progress bar animation setelah cards muncul
                    setTimeout(() => {
                        setAnimateProgress(true);
                    }, 1200); // Delay untuk progress bars
                }
            },
            {
                threshold: 0.3, // Samain dengan Project
                rootMargin: '0px 0px -100px 0px' // Samain dengan Project
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Update CSS animations untuk entrance yang lebih smooth
    useEffect(() => {
        const styleId = 'skill-card-animations';
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            @keyframes skillCardFadeIn {
                0% {
                    opacity: 0;
                    transform: translateY(40px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .skill-card {
                transition: all 300ms ease-in-out;
            }
            
            .skill-card.animated {
                animation: skillCardFadeIn 800ms cubic-bezier(0.17, 0.84, 0.44, 1) forwards;
                animation-delay: var(--delay, 0ms);
            }

            .skill-card:hover {
                transform: translateY(-4px) !important;
                border-color: rgb(34 211 238) !important;
                box-shadow: 0 10px 25px rgba(34, 211, 238, 0.15) !important;
            }

            /* Progress shimmer effect - SEDERHANA */
            @keyframes shimmer {
                0% { left: -100%; }
                100% { left: 100%; }
            }

            /* Sisanya sama... */
        `;
        document.head.appendChild(style);

        return () => {
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) existingStyle.remove();
        };
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
        setTimeout(() => setModalVisible(true), 10);
    };

    const closeModal = () => {
        setModalVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
    };

    // Counter animation hook - UPDATED untuk mengontrol progress bar juga
    const useCounter = (end, duration = 1200, delay = 0, shouldStart = false) => {
        const [count, setCount] = useState(0);
        const [progress, setProgress] = useState(0); // Tracking progress 0-100%

        useEffect(() => {
            if (!shouldStart) return;

            const timer = setTimeout(() => {
                let startTime;
                const animate = (currentTime) => {
                    if (!startTime) startTime = currentTime;
                    const progressRatio = Math.min((currentTime - startTime) / duration, 1);

                    // Use easing function for smooth animation
                    const easeOut = 1 - Math.pow(1 - progressRatio, 3);
                    const currentCount = Math.floor(end * easeOut);

                    setCount(currentCount);
                    setProgress(easeOut * 100); // Untuk CSS variable

                    if (progressRatio < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(end);
                        setProgress(100);
                    }
                };
                requestAnimationFrame(animate);
            }, delay);

            return () => clearTimeout(timer);
        }, [end, duration, delay, shouldStart]);

        return { count, progress };
    };

    const SkillCardComponent = ({ skill, index, isModalCard = false }) => {
        const shouldAnimateCounter = isModalCard || animateProgress;
        const counterDelay = isModalCard ? index * 100 : index * 150 + 800;
        const { count: animatedPercentage, progress: animationProgress } = useCounter(
            skill.level, 1500, counterDelay, shouldAnimateCounter
        );

        // Gunakan useRef untuk menyimpan state opacity asli
        const cardRef = useRef(null);

        return (
            <div
                ref={cardRef}
                className={`
                    skill-card bg-zinc-900/80 border border-cyan-400/20 p-6 rounded-lg
                    relative overflow-hidden group ${spaceGrotesk.className}
                    ${!isModalCard && showCards ? 'animated' : ''}
                `}
                style={{
                    opacity: isModalCard ? 1 : 0, // Start with opacity 0 for non-modal cards
                    transform: isModalCard ? 'none' : 'translateY(40px)', // Start position
                    '--delay': `${index * 120}ms` // Staggered animation delay
                }}
            >
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

                {/* Progress bar container - UPDATED */}
                <div className="w-full h-2 bg-slate-500/30 rounded overflow-hidden relative mb-3 z-10">
                    <div
                        className="h-full bg-gradient-to-r from-cyan-400 to-violet-500 rounded"
                        style={{
                            width: `${shouldAnimateCounter ? (animationProgress * skill.level / 100) : 0}%`,
                            transition: 'none', // Remove default transition
                            position: 'relative',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Shimmer effect inside bar */}
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                                width: '100%',
                                height: '100%',
                                transform: animationProgress > 80 ? 'translateX(100%)' : 'translateX(-100%)',
                                transition: 'transform 500ms ease-out',
                            }}
                        />
                    </div>
                </div>

                {/* Percentage text with counter animation */}
                <div className="text-right text-sm text-slate-400 font-mono relative z-10 skill-percentage">
                    {animatedPercentage}%
                </div>

                {/* Background glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Corner dots */}
                <div className="absolute top-1 left-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-1 right-1 w-1 h-1 bg-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        );
    };

    return (
        <section className="mb-20 relative" ref={sectionRef}>
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
                    className={` bg-zinc-900/80
                        transition-all duration-700 ease-out
                        ${showCards ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                    `}
                    style={{ transitionDelay: '1000ms' }} // Muncul setelah semua cards
                >
                    <span>🔍</span>
                    View More Skills
                </Button>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className={`
                    fixed inset-0 z-50 flex items-center justify-center p-4
                    transition-all duration-500 ease-out
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
                                All Skills & Technologies
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
                        <div className="flex justify-between items-center p-6 border-t border-cyan-400/20">
                            <div className={`${spaceGrotesk.className} text-slate-400 text-sm`}>
                                Total: {skills.length} skills
                            </div>
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
        </section>
    );
};

export default SkillsCard;
