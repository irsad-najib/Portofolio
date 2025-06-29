'use client';
import React, { useEffect, useState, memo, useMemo, useCallback, lazy, Suspense } from 'react';
import { Space_Grotesk } from 'next/font/google';
import dynamic from 'next/dynamic';

// Lazy load Button component
const Button = dynamic(() => import('../Button'), {
    ssr: false,
    loading: () => <div className="h-10 w-20 bg-zinc-800 animate-pulse rounded" />
});

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

// Memoize project data to prevent recreation
const projectsData = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with real-time inventory management, payment integration, and advanced analytics dashboard.",
        fullDescription: "This comprehensive e-commerce platform features a modern React frontend with a robust Node.js backend. It includes user authentication, product catalog management, shopping cart functionality, secure payment processing via Stripe, order tracking, and an admin dashboard with analytics. The platform is built with scalability in mind and follows best practices for security and performance.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe", "Express", "JWT"],
        previewLink: "https://ecommerce-demo.vercel.app",
        githubLink: "https://github.com/irsadnajib/ecommerce-platform",
        status: "Completed"
    },
    {
        id: 2,
        title: "AI Analytics Dashboard",
        description: "Machine learning-powered analytics platform with predictive modeling and real-time data visualization capabilities.",
        fullDescription: "An advanced analytics dashboard that leverages machine learning to provide insights and predictions. Features include real-time data processing, interactive charts and graphs, predictive modeling using TensorFlow, automated reporting, and customizable dashboards. The platform can handle large datasets and provides actionable insights for business decision-making.",
        technologies: ["Python", "TensorFlow", "React", "PostgreSQL", "FastAPI", "Chart.js"],
        previewLink: "https://ai-analytics-demo.vercel.app",
        githubLink: "https://github.com/irsadnajib/ai-analytics-dashboard",
        status: "In Progress"
    },
    {
        id: 3,
        title: "Blockchain Wallet",
        description: "Secure cryptocurrency wallet with multi-chain support, DeFi integration, and advanced security features.",
        fullDescription: "A next-generation cryptocurrency wallet that supports multiple blockchain networks. Features include secure key management, transaction history, DeFi protocol integration, NFT support, staking capabilities, and cross-chain asset transfers. Built with security as a top priority, implementing industry-standard encryption and security practices.",
        technologies: ["Web3.js", "Solidity", "React", "MetaMask", "Ethereum", "IPFS"],
        previewLink: "https://crypto-wallet-demo.vercel.app",
        githubLink: "https://github.com/irsadnajib/blockchain-wallet",
        status: "Completed"
    },
    {
        id: 4,
        title: "Task Management App",
        description: "Collaborative task management application with real-time updates, team collaboration features, and advanced project tracking.",
        fullDescription: "A comprehensive task management solution designed for teams and individuals. Features include project organization, task assignment and tracking, real-time collaboration, file sharing, time tracking, gantt charts, and detailed reporting. The application supports multiple project methodologies including Agile and Kanban.",
        technologies: ["Next.js", "TypeScript", "Prisma", "Socket.io", "PostgreSQL", "Tailwind"],
        previewLink: "https://task-manager-demo.vercel.app",
        githubLink: "https://github.com/irsadnajib/task-management-app",
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
                <div className="relative w-full h-48 lg:h-64 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center overflow-hidden">
                    <span className="font-mono text-slate-500 text-lg">[PROJECT SCREENSHOT]</span>

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
                <div className="p-6">
                    <h3 className="font-mono text-xl font-semibold mb-3 text-cyan-400 uppercase tracking-wide transition-colors duration-300 group-hover:text-cyan-300">
                        {project.title}
                    </h3>

                    <p className="text-slate-300 leading-relaxed mb-5 transition-colors duration-300 group-hover:text-slate-200">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 4).map((tech, techIndex) => (
                            <span
                                key={tech}
                                className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-wide font-medium transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 rounded-sm"
                                style={{ transitionDelay: `${techIndex * 50}ms` }}
                            >
                                {tech}
                            </span>
                        ))}
                        {project.technologies.length > 4 && (
                            <span className="px-3 py-1 bg-slate-500/10 border border-slate-500/30 text-slate-400 text-xs uppercase tracking-wide font-medium rounded-sm">
                                +{project.technologies.length - 4} more
                            </span>
                        )}
                    </div>
                </div>

                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />
                <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
            </article>

            {/* Modal with lazy loading */}
            {isModalOpen && (
                <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ease-out ${modalVisible ? 'opacity-100' : 'opacity-0'}`}>
                    <div className={`absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 ${modalVisible ? 'opacity-100' : 'opacity-0'}`} onClick={closeModal} />

                    <div className={`relative bg-zinc-900/95 border border-cyan-400/20 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden transition-all duration-300 ease-out ${modalVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}`}>
                        <div className="flex justify-between items-center p-6 border-b border-cyan-400/20">
                            <div>
                                <h2 className={`${spaceGrotesk.className} text-2xl font-bold text-cyan-400 mb-2`}>
                                    {project.title}
                                </h2>
                                <div className={`inline-block px-2 py-1 rounded text-xs font-semibold ${project.status === 'Completed' ? 'bg-green-400/20 text-green-400 border border-green-400/30' : 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/30'}`}>
                                    {project.status}
                                </div>
                            </div>
                            <button onClick={closeModal} className="text-slate-400 hover:text-cyan-400 transition-colors duration-200 text-2xl font-bold">×</button>
                        </div>

                        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
                            <div className="relative w-full h-64 bg-gradient-to-br from-zinc-800 to-zinc-700 rounded-lg mb-6 flex items-center justify-center overflow-hidden">
                                <span className="font-mono text-slate-500 text-xl">[PROJECT PREVIEW]</span>
                                <div className="absolute inset-0 opacity-10">
                                    <div style={{
                                        width: '100%', height: '100%',
                                        backgroundImage: `linear-gradient(rgba(0, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.3) 1px, transparent 1px)`,
                                        backgroundSize: '30px 30px'
                                    }} />
                                </div>
                            </div>

                            <div className="mb-6">
                                <h3 className={`${spaceGrotesk.className} text-lg font-semibold text-cyan-400 mb-3`}>Project Overview</h3>
                                <p className="text-slate-300 leading-relaxed">{project.fullDescription}</p>
                            </div>

                            <div className="mb-6">
                                <h3 className={`${spaceGrotesk.className} text-lg font-semibold text-cyan-400 mb-3`}>Technologies Used</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.technologies.map((tech) => (
                                        <span key={tech} className="px-3 py-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-sm font-medium rounded transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/50">
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-between items-center p-6 border-t border-cyan-400/20">
                            <Suspense fallback={<div className="h-10 w-16 bg-zinc-800 animate-pulse rounded" />}>
                                <Button variant="secondary" size="medium" onClick={closeModal}>Close</Button>
                            </Suspense>

                            <div className="flex gap-3">
                                <Suspense fallback={<div className="h-10 w-24 bg-zinc-800 animate-pulse rounded" />}>
                                    <Button variant="ghost" size="medium" onClick={handleCode}>
                                        <span>💻</span> View Code
                                    </Button>
                                    <Button variant="primary" size="medium" onClick={handlePreview}>
                                        <span>🌐</span> Live Preview
                                    </Button>
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
    return (
        <section className="relative mb-20" id="projects">
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 ${spaceGrotesk.className}`}>
                {projectsData.map((project, index) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        index={index}
                        isVisible={isVisible}
                    />
                ))}
            </div>
        </section>
    );
});

ProjectsSection.displayName = 'ProjectsSection';

export default ProjectsSection;