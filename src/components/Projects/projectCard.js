'use client';
import React, { useEffect } from 'react';
import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

const projects = [
    {
        id: 1,
        title: "E-Commerce Platform",
        description: "A full-stack e-commerce solution with real-time inventory management, payment integration, and advanced analytics dashboard.",
        technologies: ["React", "Node.js", "MongoDB", "Stripe"]
    },
    {
        id: 2,
        title: "AI Analytics Dashboard",
        description: "Machine learning-powered analytics platform with predictive modeling and real-time data visualization capabilities.",
        technologies: ["Python", "TensorFlow", "React", "PostgreSQL"]
    },
    {
        id: 3,
        title: "Blockchain Wallet",
        description: "Secure cryptocurrency wallet with multi-chain support, DeFi integration, and advanced security features.",
        technologies: ["Web3.js", "Solidity", "React", "MetaMask"]
    }
];

const ProjectCard = ({ project, index, isVisible }) => {
    useEffect(() => {
        // Inject CSS animations dynamically
        const styleId = `project-animations-${index}`;
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes scanLine${index} {
                    0%, 100% { 
                        opacity: 0; 
                        transform: translateY(0); 
                    }
                    10% { 
                        opacity: 0.8; 
                    }
                    50% { 
                        opacity: 1; 
                        transform: translateY(192px); 
                    }
                    90% { 
                        opacity: 0.8; 
                    }
                }
                
                @keyframes pulseDot${index} {
                    0%, 100% { 
                        opacity: 0.3; 
                        transform: scale(1); 
                    }
                    50% { 
                        opacity: 1; 
                        transform: scale(1.5); 
                        box-shadow: 0 0 10px #00FFFF; 
                    }
                }
                
                @keyframes gridGlow${index} {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
                
                .scan-line-${index} {
                    animation: scanLine${index} 3s ease-in-out infinite;
                }
                
                .pulse-dot-${index} {
                    animation: pulseDot${index} 2s ease-in-out infinite;
                }
                
                .grid-lines-${index} {
                    animation: gridGlow${index} 2s infinite ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
    }, [index]);

    return (
        <div
            className={` max-w-2xl w-full mx-auto
                group relative bg-zinc-900/80 border border-cyan-500/20 overflow-hidden rounded-lg
                transition-all duration-700 ease-out hover:border-cyan-400
                hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/10
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{
                transitionDelay: `${index * 150}ms`
            }}
        >
            {/* Project Image */}
            <div className="relative w-full h-48 lg:h-64 bg-gradient-to-br from-zinc-800 to-zinc-700 flex items-center justify-center overflow-hidden">
                <span className="font-mono text-slate-500 text-lg">[PROJECT SCREENSHOT]</span>

                {/* Scan Line Effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className={`scan-line-${index}`}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '2px',
                            background: 'linear-gradient(90deg, transparent, #00FFFF, transparent)',
                            boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)',
                            animationDelay: `${index * 1}s`
                        }}
                    ></div>
                </div>

                {/* Pulse Dot */}
                <div
                    className={`pulse-dot-${index}`}
                    style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '4px',
                        height: '4px',
                        backgroundColor: '#00FFFF',
                        borderRadius: '50%',
                        animationDelay: `${index * 0.7}s`
                    }}
                />

                {/* Grid Lines Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none">
                    <div
                        className={`grid-lines-${index}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            backgroundImage: `
                                linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '20px 20px'
                        }}
                    ></div>
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

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                        <span
                            key={tech}
                            className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs uppercase tracking-wide font-medium transition-all duration-300 hover:bg-cyan-500/20 hover:border-cyan-500/50 rounded-sm"
                            style={{
                                transitionDelay: `${techIndex * 50}ms`
                            }}
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover Effect Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-lg" />

            {/* Top border hover effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
        </div>
    );
};

export default function ProjectsSection({ isVisible }) {
    return (
        <section className="relative mb-20" id="projects">
            {/* Projects Grid */}
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 ${spaceGrotesk.className}`}>
                {projects.map((project, index) => (
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
}