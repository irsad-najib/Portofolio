'use client';
import React, { useEffect, useState, memo, useMemo, useCallback, lazy, Suspense } from 'react';
import { Space_Grotesk, Orbitron } from 'next/font/google';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import BackgroundPattern from '@/components/BackgroundPattern';
import ThemeToggle from '@/components/ThemeToggle';


// Lazy load Button component
const Button = dynamic(() => import('../../components/Button'), {
    ssr: false,
    loading: () => <div className="h-10 w-20 bg-zinc-800 animate-pulse rounded" />
});


const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['700', '800', '900'],
})

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

// Memoize project data to prevent recreation
const projectsData = [
    {
        id: 1,
        title: "Web Eqariah",
        description: "A full-stack platform with comprehensive features using Prisma, JWT, and React Native.",
        fullDescription: "Web Eqariah is a full-featured platform that includes JWT authentication, dynamic dashboards, and a production-ready backend using Prisma and MySQL. The frontend is built with React and also available as a mobile app via React Native. The backend is hosted on Azure, while the frontend is deployed on Vercel for seamless CI/CD.",
        technologies: ["React", "React Native", "JWT", "Prisma", "MySQL", "Azure"],
        previewLink: "https://eqariah.com", // fill if available
        githubLink: "https://github.com/irsad-najib/WebEqariah",
        status: "In Progress"
    },
    {
        id: 2,
        title: "SMA PGRI School Website",
        description: "A school website with article submission and Firebase media storage.",
        fullDescription: "This project was built for SMA PGRI 1 Gombong, featuring an article management system using Quill Editor and Firebase for storing media and content. The system supports different user roles and is designed as a full-stack solution tailored for educational institutions.",
        technologies: ["React", "Quill", "Firebase", "Tailwind CSS"],
        previewLink: "https://smapgrisatugombong.sch.id",
        githubLink: "https://github.com/irsad-najib/smaPgri",
        status: "Completed"
    },
    {
        id: 3,
        title: "Store System",
        description: "A full-stack POS system for retail businesses.",
        fullDescription: "A modern point-of-sale (POS) web application for small to medium businesses. It includes inventory management, transaction tracking, daily reports, and receipt generation. Built with a REST API backend and a lightweight, responsive frontend.",
        technologies: ["React", "Node.js", "Express", "MySQL", "Tailwind CSS"],
        previewLink: "",
        githubLink: "https://github.com/irsad-najib/Store-system",
        status: "Completed"
    },
    {
        id: 4,
        title: "Machine Learning – Regression & Classification",
        description: "Decision tree experiments for both regression and classification tasks.",
        fullDescription: "This project utilizes Jupyter Notebook to implement decision tree models for various regression and classification tasks. It focuses on optimizing system performance and tuning parameters to reduce runtime. A good showcase of basic machine learning and analytics skills.",
        technologies: ["Python", "Jupyter Notebook", "scikit-learn"],
        previewLink: "",
        githubLink: "https://github.com/irsad-najib/machine-learning",
        status: "Completed"
    },
    {
        id: 5,
        title: "Personal Portfolio Website",
        description: "An interactive portfolio site with modal-based project viewer.",
        fullDescription: "A clean and professional portfolio website featuring a dynamic project showcase using modal windows. Built with Next.js and Tailwind CSS, this site is SEO-optimized and responsive, perfect for presenting projects to clients and recruiters.",
        technologies: ["Next.js", "Tailwind CSS", "TypeScript"],
        previewLink: "https://web-portofolio-irsad-najib.vercel.app",
        githubLink: "https://github.com/irsad-najib/Portofolio",
        status: "Completed"
    },
    {
        id: 6,
        title: "Wi-Fi User Simulation (CLI + Google Colab)",
        description: "Simulates campus Wi-Fi usage using CLI and Colab notebooks.",
        fullDescription: "This project models Wi-Fi user behavior on a campus network using CLI scripts and Google Colab. It visualizes user distribution and network load to help analyze system bottlenecks using probability-based simulations.",
        technologies: ["Python", "Google Colab", "CLI"],
        previewLink: "",
        githubLink: "https://github.com/irsad-najib/TPS-project",
        status: "Completed"
    },
    {
        id: 7,
        title: "REST API Implementation (web-dev-2)",
        description: "REST API practice project using Next.js.",
        fullDescription: "This project is a learning exercise focused on implementing and consuming REST APIs using Next.js. It features modern fetch patterns, modular components, and integration best practices.",
        technologies: ["Next.js", "REST API"],
        previewLink: "",
        githubLink: "https://github.com/irsad-najib/web-dev-2",
        status: "Completed"
    },
    {
        id: 8,
        title: "Valentine Website (Fun Project)",
        description: "A personal and playful Valentine's Day website.",
        fullDescription: "A small web project made for my girlfriend as a Valentine’s surprise. Built with pure HTML, CSS, and JavaScript, it includes playful animations and romantic UI elements—an example of a fun and lighthearted design experiment.",
        technologies: ["HTML", "CSS", "JavaScript"],
        previewLink: "",
        githubLink: "https://github.com/irsad-najib/valentine",
        status: "Completed"
    },
    {
        id: 9,
        title: "Expo SMALSA",
        description: "Promotional website for college introduction event (unofficial).",
        fullDescription: "Built with basic HTML and CSS, this website was designed to introduce college departments and student life to high school students at SMALSA. A static promotional site created independently as part of a student initiative.",
        technologies: ["HTML", "CSS"],
        previewLink: "",
        githubLink: "https://github.com/irsad-najib/exposmalsa",
        status: "Completed"
    },
    {
        id: 10,
        title: "Hackathon Frontend (Unfinished)",
        description: "Frontend concept design for a planned hackathon project.",
        fullDescription: "This project was meant for a hackathon but wasn't completed due to time constraints. It contains initial layout and UI components built with React and Tailwind CSS.",
        technologies: ["React", "Tailwind CSS"],
        previewLink: "",
        githubLink: "https://github.com/irsadNajib/hacketonFE",
        status: "Not Completed"
    },
    {
        id: 11,
        title: ".NET MAUI App (Team Project)",
        description: "A cross-platform app built using .NET MAUI and MongoDB.",
        fullDescription: "Collaborative team project built with .NET MAUI for both frontend and backend, using MongoDB for database storage. Designed for an Object-Oriented Programming (OOP) course with emphasis on cross-platform structure and modular architecture.",
        technologies: [".NET MAUI", ".NET", "MongoDB"],
        previewLink: "",
        githubLink: "",
        status: "Completed"
    }
];


const ProjectCard = memo(({ project, index, isVisible }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    // Memoize animation styles to prevent recalculation
    const animationStyles = useMemo(() => ({
        transitionDelay: `${index * 150}ms`
    }), [index]);

    // Memoize callbacks
    const openModal = useCallback(() => {
        setIsModalOpen(true);
        requestAnimationFrame(() => setModalVisible(true));
    }, []);

    const closeModal = useCallback(() => {
        setModalVisible(false);
        setTimeout(() => setIsModalOpen(false), 300);
    }, []);

    const handlePreview = useCallback(() => {
        window.open(project.previewLink, '_blank', 'noopener,noreferrer');
    }, [project.previewLink]);

    const handleCode = useCallback(() => {
        window.open(project.githubLink, '_blank', 'noopener,noreferrer');
    }, [project.githubLink]);

    // Optimize animation injection
    useEffect(() => {
        const styleId = `project-animations-${index}`;
        if (document.getElementById(styleId)) return;

        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = `
            .scan-line-${index} { animation: scanLine${index} 3s ease-in-out infinite; }
            .pulse-dot-${index} { animation: pulseDot${index} 2s ease-in-out infinite; }
            .grid-lines-${index} { animation: gridGlow${index} 2s infinite ease-in-out; }
            
            @keyframes scanLine${index} {
                0%, 100% { opacity: 0; transform: translateY(0); }
                50% { opacity: 1; transform: translateY(192px); }
            }
            @keyframes pulseDot${index} {
                0%, 100% { opacity: 0.3; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.5); box-shadow: 0 0 10px #00FFFF; }
            }
            @keyframes gridGlow${index} {
                0%, 100% { opacity: 0.1; }
                50% { opacity: 0.3; }
            }
        `;
        document.head.appendChild(style);

        return () => {
            const existingStyle = document.getElementById(styleId);
            if (existingStyle) existingStyle.remove();
        };
    }, [index]);

    return (
        <>
            <article
                className={`max-w-2xl w-full mx-auto cursor-pointer
                    group relative bg-zinc-900/80 border border-cyan-500/20 overflow-hidden rounded-lg
                    transition-all duration-700 ease-out hover:border-cyan-400
                    hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                `}
                style={animationStyles}
                onClick={openModal}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openModal()}
            >
                {/* Project Image */}
                <div className="relative w-full h-40 sm:h-48 lg:h-64 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center overflow-hidden">
                    <div className="relative w-full h-full">
                        <Image
                            src={`/project/${project.id}.jpg`}
                            alt={`${project.title} screenshot`}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover"
                            priority={index < 2}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                            }}
                        />
                        <div className="absolute inset-0 hidden items-center justify-center">
                            <span className="font-mono text-slate-500 text-lg">[PROJECT SCREENSHOT]</span>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div className={`
                        absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold
                        ${project.status === 'Completed'
                            ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                            : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'
                        }
                    `}>
                        {project.status}
                    </div>

                    {/* Optimized effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className={`scan-line-${index}`} style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '2px',
                            background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
                            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                            animationDelay: `${index * 1}s`
                        }} />
                    </div>

                    <div className={`pulse-dot-${index}`} style={{
                        position: 'absolute', top: '8px', right: '8px',
                        width: '4px', height: '4px', backgroundColor: '#00FFFF',
                        borderRadius: '50%', animationDelay: `${index * 0.7}s`
                    }} />

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                        <div className={`grid-lines-${index}`} style={{
                            width: '100%', height: '100%',
                            backgroundImage: `
                                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="text-center">
                            <div className={`${spaceGrotesk.className} text-cyan-400 font-semibold text-lg uppercase tracking-wide mb-2`}>
                                View Details
                            </div>
                            <div className="w-12 h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 mx-auto animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* Project Content */}
                <div className="p-4 sm:p-6">
                    <h3 className="font-mono text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-cyan-400 uppercase tracking-wide transition-colors duration-300 group-hover:text-cyan-300">
                        {project.title}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-5 transition-colors duration-300 group-hover:text-slate-200">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1 sm:gap-2">
                        {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span
                                key={tech}
                                className="px-2 sm:px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-wide font-medium transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 rounded-sm"
                                style={{ transitionDelay: `${techIndex * 50}ms` }}
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 3 && (
                            <span className="px-2 sm:px-3 py-1 bg-slate-500/10 border border-slate-500/30 text-slate-400 text-xs uppercase tracking-wide font-medium rounded-sm">
                                +{project.technologies.length - 3} more
                            </span>
                        )}
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </article>

            {/* Modal with lazy loading */}
            {isModalOpen && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ease-out ${modalVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${modalVisible ? 'opacity-100' : 'opacity-0'}`} onClick={closeModal} />

                    <div className={`relative bg-zinc-900/95 border border-cyan-400/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
                        <div className="flex justify-between items-center p-4 sm:p-6 border-b border-cyan-400/20">
                            <div>
                                <h2 className={`${spaceGrotesk.className} text-xl sm:text-2xl font-bold text-cyan-400 mb-2`}>
                                    {project.title}
                                </h2>
                                <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-400/20 text-green-400 border border-green-400/30' : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'}`}>
                                    {project.status}
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-2xl font-bold">×</button>
                        </div>

                        <div className="p-4 sm:p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="relative w-full h-48 sm:h-64 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={`/project/${project.id}.jpg`}
                                        alt={`${project.title} preview`}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 60vw"
                                        className="object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    <div className="absolute inset-0 hidden items-center justify-center">
                                        <span className="font-mono text-slate-500 text-xl">[PROJECT PREVIEW]</span>
                                    </div>
                                </div>
                                <div className="absolute inset-0 opacity-10">
                                    <div style={{
                                        width: '100%', height: '100%',
                                        backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)`,
                                        backgroundSize: '30px 30px'
                                    }} />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className={`${spaceGrotesk.className} text-base sm:text-lg font-semibold text-cyan-400 mb-3`}>Project Overview</h3>
                                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">{project.fullDescription}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className={`${spaceGrotesk.className} text-base sm:text-lg font-semibold text-cyan-400 mb-3`}>Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="px-2 py-1 sm:px-3 sm:py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs sm:text-sm font-medium rounded transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row justify-between items-center p-4 sm:p-6 border-t border-cyan-400/20 gap-3">
                            <div className="flex gap-2 w-full sm:w-auto order-1 sm:order-2 mb-3 sm:mb-0 justify-center">
                                <Suspense fallback={<div className="h-10 w-24 bg-zinc-800 animate-pulse rounded" />}>
                                    <Button
                                        variant="ghost"
                                        size="medium"
                                        onClick={handleCode}
                                        className="flex-1 sm:flex-none justify-center"
                                    >
                                        <span className="mr-1">💻</span> View Code
                                    </Button>

                                    {project.previewLink && (
                                        <Button
                                            variant="primary"
                                            size="medium"
                                            onClick={handlePreview}
                                            className="flex-1 sm:flex-none justify-center"
                                        >
                                            <span className="mr-1">🌐</span> Live Preview
                                        </Button>
                                    )}
                                </Suspense>
                            </div>
                        </div>

                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500" />
                        <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-violet-500 to-cyan-400" />
                        <div className="absolute top-2 right-2 w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
                        <div className="absolute bottom-2 left-2 w-2 h-2 bg-violet-500 rounded-full animate-pulse" />
                    </div>
                </div>
            )}
        </>
    );
});

ProjectCard.displayName = 'ProjectCard';

const ProjectsSection = memo(({ isVisible }) => {
    const [mounted, setMounted] = useState(false);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Trigger animation setelah component mount
        const timer = setTimeout(() => {
            setVisible(true);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    // Gunakan isVisible prop jika ada, kalau tidak gunakan state lokal
    const shouldShow = isVisible !== undefined ? isVisible : visible;

    if (!mounted) {
        // Prevent hydration mismatch
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white">
                <BackgroundPattern />
                <ThemeToggle />
                <div className={`container mx-auto px-4 sm:px-6 py-20 relative z-10 ${spaceGrotesk.className}`}>
                    <h2 className={`${orbitron.className} text-3xl sm:text-4xl font-bold text-cyan-400 mb-6`}>
                        Projects
                    </h2>
                    <p className={`text-slate-300 mb-8 ${spaceGrotesk.className}`}>
                        Here are some of the projects I have worked on, spanning a variety of technologies and approaches.
                    </p>
                    <div className="relative mb-20" id="projects">
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 ${spaceGrotesk.className}`}>
                            {/* Loading placeholder */}
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="max-w-2xl w-full mx-auto h-96 bg-zinc-900/50 animate-pulse rounded-lg" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 text-white">
            <BackgroundPattern />
            <ThemeToggle />
            <div className={`container mx-auto px-4 sm:px-6 py-20 relative z-10 ${spaceGrotesk.className}`}>
                <h2 className={`${orbitron.className} text-3xl sm:text-4xl font-bold text-cyan-400 mb-6 transition-all duration-700 ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Projects
                </h2>
                <p className={`text-slate-300 mb-8 transition-all duration-700 delay-200 ${shouldShow ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    Here are some of the projects I have worked on, spanning a variety of technologies and approaches.
                </p>
                <div className="relative mb-20" id="projects">
                    <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 ${spaceGrotesk.className}`}>
                        {projectsData.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                isVisible={shouldShow}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;