'use client';
import React, { useState, useEffect } from 'react';
import { Space_Grotesk, Orbitron } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['400', '700'],
});

const certificates = [
    {
        id: 1,
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2023",
        image: "/certificates/aws-cert.jpg",
        description: "Cloud architecture and AWS services expertise"
    },
    {
        id: 2,
        title: "Google Cloud Professional",
        issuer: "Google Cloud",
        date: "2023",
        image: "/certificates/gcp-cert.jpg",
        description: "Google Cloud Platform services and solutions"
    },
    {
        id: 3,
        title: "Meta Frontend Developer",
        issuer: "Meta",
        date: "2023",
        image: "/certificates/meta-cert.jpg",
        description: "React, JavaScript, and modern web development"
    },
    {
        id: 4,
        title: "Microsoft Azure Fundamentals",
        issuer: "Microsoft",
        date: "2022",
        image: "/certificates/azure-cert.jpg",
        description: "Azure cloud services and fundamentals"
    }
];

const CertificateModal = ({ certificate, isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="relative max-w-4xl w-full bg-zinc-900 border border-cyan-400/30 rounded-lg overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-zinc-800 hover:bg-zinc-700 border border-cyan-400/50 rounded-full flex items-center justify-center text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                    ×
                </button>

                {/* Modal content */}
                <div className="p-6">
                    <div className="aspect-[16/9] w-full mb-4 rounded-lg overflow-hidden bg-zinc-800">
                        <img
                            src={certificate.image}
                            alt={certificate.title}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                                e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPltDRVJUSUZJQ0FURV0=';
                            }}
                        />
                    </div>
                    <h3 className={`${orbitron.className} text-xl font-bold text-cyan-400 mb-2`}>
                        {certificate.title}
                    </h3>
                    <p className={`${spaceGrotesk.className} text-slate-300 mb-1`}>
                        {certificate.issuer} • {certificate.date}
                    </p>
                    <p className={`${spaceGrotesk.className} text-slate-400 text-sm`}>
                        {certificate.description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const CertificateCardItem = ({ certificate, index, isVisible, onClick }) => {
    useEffect(() => {
        // Inject CSS animations dynamically untuk setiap certificate
        const styleId = `certificate-animations-${index}`;
        if (!document.getElementById(styleId)) {
            const style = document.createElement('style');
            style.id = styleId;
            style.textContent = `
                @keyframes scanLineCert${index} {
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
                
                @keyframes pulseDotCert${index} {
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
                
                @keyframes gridGlowCert${index} {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.3; }
                }
                
                .scan-line-cert-${index} {
                    animation: scanLineCert${index} 3s ease-in-out infinite;
                }
                
                .pulse-dot-cert-${index} {
                    animation: pulseDotCert${index} 2s ease-in-out infinite;
                }
                
                .grid-lines-cert-${index} {
                    animation: gridGlowCert${index} 2s infinite ease-in-out;
                }
            `;
            document.head.appendChild(style);
        }
    }, [index]);

    return (
        <div
            className={`
                group relative bg-zinc-900/80 border border-cyan-400/20 rounded-lg
                overflow-hidden cursor-pointer
                transition-all duration-700 ease-out
                hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
            style={{
                transitionDelay: `${index * 150}ms`
            }}
            onClick={onClick}
        >
            {/* Top border hover effect */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

            {/* Certificate Image */}
            <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-700 overflow-hidden flex items-center justify-center">
                <img
                    src={certificate.image}
                    alt={certificate.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1zbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzc0MTUxIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk0YTNiOCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPltDRVJUSUZJQ0FURV0=';
                    }}
                />

                {/* Scan Line Effect */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className={`scan-line-cert-${index}`}
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
                    className={`pulse-dot-cert-${index}`}
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
                        className={`grid-lines-cert-${index}`}
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

                {/* View overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className={`${spaceGrotesk.className} text-cyan-400 font-semibold text-sm uppercase tracking-wide`}>
                        Click to View
                    </span>
                </div>
            </div>

            {/* Certificate Content */}
            <div className="p-6">
                <h3 className={`
                    ${orbitron.className} font-bold mb-2 text-cyan-400 uppercase tracking-wide
                    transition-colors duration-300 group-hover:text-cyan-300
                    line-clamp-2 text-sm
                `}>
                    {certificate.title}
                </h3>

                <p className={`${spaceGrotesk.className} text-slate-300 text-sm mb-1 transition-colors duration-300 group-hover:text-slate-200`}>
                    {certificate.issuer}
                </p>

                <p className={`${spaceGrotesk.className} text-slate-400 text-xs mb-3`}>
                    {certificate.date}
                </p>

                <p className={`${spaceGrotesk.className} text-slate-400 text-xs leading-relaxed line-clamp-2`}>
                    {certificate.description}
                </p>
            </div>

            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none" />
        </div>
    );
};

const CertificateCard = ({ isVisible }) => {
    const [selectedCertificate, setSelectedCertificate] = useState(null);

    return (
        <>
            <section className="mb-20 relative w-full max-w-6xl" id="certificates">

                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 relative z-10">
                    {certificates.map((certificate, index) => (
                        <CertificateCardItem
                            key={certificate.id}
                            certificate={certificate}
                            index={index}
                            isVisible={isVisible}
                            onClick={() => setSelectedCertificate(certificate)}
                        />
                    ))}
                </div>

                <style jsx>{`
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                `}</style>
            </section>

            {/* Modal */}
            <CertificateModal
                certificate={selectedCertificate}
                isOpen={!!selectedCertificate}
                onClose={() => setSelectedCertificate(null)}
            />
        </>
    );
};

export default CertificateCard;