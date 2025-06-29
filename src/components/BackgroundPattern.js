'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function BackgroundPattern() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Main Background Pattern */}
            <div className="fixed inset-0 pointer-events-none">
                <div
                    className={`
                        absolute inset-0 transition-all duration-1000 ease-out
                        ${theme === 'dark' ? 'opacity-40' : 'opacity-10'}
                    `}
                    style={{
                        background: theme === 'dark'
                            ? `
                                radial-gradient(circle at 15% 30%, rgba(0, 212, 255, 0.15) 0%, transparent 40%),
                                radial-gradient(circle at 85% 20%, rgba(0, 102, 255, 0.12) 0%, transparent 45%),
                                radial-gradient(circle at 45% 85%, rgba(255, 0, 102, 0.1) 0%, transparent 40%),
                                radial-gradient(circle at 75% 70%, rgba(0, 212, 255, 0.08) 0%, transparent 35%),
                                conic-gradient(from 45deg at 50% 50%, 
                                    transparent 0deg, 
                                    rgba(0, 212, 255, 0.05) 90deg, 
                                    transparent 180deg, 
                                    rgba(0, 102, 255, 0.03) 270deg, 
                                    transparent 360deg
                                )
                            `
                            : `
                                radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.08) 0%, transparent 50%),
                                radial-gradient(circle at 80% 30%, rgba(6, 182, 212, 0.06) 0%, transparent 45%)
                            `,
                        animation: theme === 'dark'
                            ? 'darkFloat 8s ease-in-out infinite'
                            : 'lightFloat 12s ease-in-out infinite'
                    }}
                />

                {/* Animated Particles for Dark Mode */}
                {theme === 'dark' && (
                    <>
                        <div
                            className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-60"
                            style={{
                                top: '20%',
                                left: '10%',
                                animation: 'particle1 6s ease-in-out infinite',
                                boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
                            }}
                        />
                        <div
                            className="absolute w-1 h-1 bg-blue-500 rounded-full opacity-40"
                            style={{
                                top: '60%',
                                right: '15%',
                                animation: 'particle2 8s ease-in-out infinite 2s',
                                boxShadow: '0 0 6px rgba(0, 102, 255, 0.6)'
                            }}
                        />
                        <div
                            className="absolute w-1.5 h-1.5 bg-pink-500 rounded-full opacity-50"
                            style={{
                                bottom: '30%',
                                left: '70%',
                                animation: 'particle3 10s ease-in-out infinite 4s',
                                boxShadow: '0 0 8px rgba(255, 0, 102, 0.7)'
                            }}
                        />
                    </>
                )}

                {/* Grid Pattern for Dark Mode */}
                {theme === 'dark' && (
                    <div
                        className="absolute inset-0 opacity-5"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0, 212, 255, 0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0, 212, 255, 0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                            animation: 'gridMove 20s linear infinite'
                        }}
                    />
                )}
            </div>

            {/* CSS Animations */}
            <style jsx>{`
                @keyframes darkFloat {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg) scale(1);
                        filter: hue-rotate(0deg);
                    }
                    25% { 
                        transform: translateY(-20px) rotate(2deg) scale(1.02);
                        filter: hue-rotate(10deg);
                    }
                    50% { 
                        transform: translateY(-10px) rotate(-1deg) scale(0.98);
                        filter: hue-rotate(20deg);
                    }
                    75% { 
                        transform: translateY(-30px) rotate(1deg) scale(1.01);
                        filter: hue-rotate(10deg);
                    }
                }

                @keyframes lightFloat {
                    0%, 100% { 
                        transform: translateY(0px) rotate(0deg);
                        opacity: 0.1;
                    }
                    50% { 
                        transform: translateY(-5px) rotate(1deg);
                        opacity: 0.15;
                    }
                }

                @keyframes particle1 {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px);
                        opacity: 0.6;
                    }
                    33% { 
                        transform: translateY(-30px) translateX(20px);
                        opacity: 0.8;
                    }
                    66% { 
                        transform: translateY(-10px) translateX(-15px);
                        opacity: 0.4;
                    }
                }

                @keyframes particle2 {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) scale(1);
                        opacity: 0.4;
                    }
                    50% { 
                        transform: translateY(40px) translateX(-30px) scale(1.5);
                        opacity: 0.7;
                    }
                }

                @keyframes particle3 {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) rotate(0deg);
                        opacity: 0.5;
                    }
                    25% { 
                        transform: translateY(-20px) translateX(15px) rotate(90deg);
                        opacity: 0.8;
                    }
                    75% { 
                        transform: translateY(10px) translateX(-20px) rotate(270deg);
                        opacity: 0.3;
                    }
                }

                @keyframes gridMove {
                    0% { 
                        transform: translate(0, 0);
                    }
                    100% { 
                        transform: translate(50px, 50px);
                    }
                }

                /* Glowing border animation */
                @keyframes borderGlow {
                    0%, 100% { 
                        border-color: rgba(0, 212, 255, 0.3);
                        box-shadow: 0 0 5px rgba(0, 212, 255, 0.2);
                    }
                    50% { 
                        border-color: rgba(0, 212, 255, 0.6);
                        box-shadow: 0 0 20px rgba(0, 212, 255, 0.4);
                    }
                }
            `}</style>
        </>
    );
}