'use client';
import React, { useState, useEffect } from 'react';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

const Button = ({
    children,
    variant = 'primary',
    size = 'medium',
    disabled = false,
    loading = false,
    onClick,
    className = '',
    ...props
}) => {
    const [isHovered, setIsHovered] = useState(false);
    const [ripples, setRipples] = useState([]);

    // Handle ripple effect
    const handleClick = (e) => {
        if (disabled || loading) return;

        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newRipple = {
            x,
            y,
            id: Date.now()
        };

        setRipples(prev => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
        }, 600);

        if (onClick) onClick(e);
    };

    // Variant styles
    const variants = {
        primary: {
            base: 'bg-zinc-900/80 border-cyan-400/20 text-cyan-400 hover:border-cyan-400 hover:text-cyan-300 hover:shadow-cyan-400/20',
            glow: 'from-cyan-400/20 to-violet-500/20'
        },
        secondary: {
            base: 'bg-zinc-800/60 border-slate-500/30 text-slate-300 hover:border-slate-400 hover:text-slate-200 hover:shadow-slate-400/20',
            glow: 'from-slate-400/20 to-zinc-400/20'
        },
        danger: {
            base: 'bg-zinc-900/80 border-red-400/20 text-red-400 hover:border-red-400 hover:text-red-300 hover:shadow-red-400/20',
            glow: 'from-red-400/20 to-orange-500/20'
        },
        ghost: {
            base: 'bg-transparent border-cyan-400/40 text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400 hover:shadow-cyan-400/20',
            glow: 'from-cyan-400/10 to-violet-500/10'
        }
    };

    // Size styles
    const sizes = {
        small: 'px-4 py-2 text-sm',
        medium: 'px-6 py-3 text-base',
        large: 'px-8 py-4 text-lg'
    };

    const currentVariant = variants[variant];
    const currentSize = sizes[size];

    return (
        <button
            className={`
                ${spaceGrotesk.className} relative group overflow-hidden
                border font-medium uppercase tracking-wide
                transition-all duration-300 ease-out
                disabled:opacity-50 disabled:cursor-not-allowed
                focus:outline-none focus:ring-2 focus:ring-cyan-400/50
                ${currentVariant.base}
                ${currentSize}
                ${disabled ? 'hover:transform-none' : 'hover:-translate-y-0.5 hover:shadow-lg'}
                ${className}
            `}
            disabled={disabled || loading}
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            {...props}
        >
            {/* Top border hover effect */}
            <div className={`
                absolute top-0 left-0 w-full h-0.5 
                bg-gradient-to-r from-cyan-400 to-violet-500 
                transform transition-transform duration-500
                ${isHovered ? 'translate-x-0' : '-translate-x-full'}
            `} />

            {/* Background glow effect */}
            <div className={`
                absolute inset-0 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300
                bg-gradient-to-r ${currentVariant.glow}
            `} />

            {/* Hexagon particles on hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none">
                <div className="button-hexagon-grid">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div
                            key={i}
                            className="button-hexagon"
                            style={{
                                '--delay': `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Ripple effects */}
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="absolute bg-cyan-400/30 rounded-full animate-ripple pointer-events-none"
                    style={{
                        left: ripple.x - 20,
                        top: ripple.y - 20,
                        width: '40px',
                        height: '40px',
                    }}
                />
            ))}

            {/* Scan line effect */}
            <div className={`
                absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100
                transition-opacity duration-300
            `}>
                <div className="scan-line-button" />
            </div>

            {/* Content */}
            <span className={`
                relative z-10 flex items-center justify-center gap-2
                transition-all duration-300
                ${loading ? 'opacity-0' : 'opacity-100'}
            `}>
                {children}
            </span>

            {/* Loading spinner */}
            {loading && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="loading-spinner" />
                </div>
            )}

            {/* Corner indicators */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-1 left-1 w-1 h-1 bg-violet-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <style jsx>{`
                .button-hexagon-grid {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-template-rows: repeat(2, 1fr);
                    gap: 4px;
                    padding: 8px;
                    height: 100%;
                    width: 100%;
                }
                
                .button-hexagon {
                    width: 8px;
                    height: 8px;
                    background: linear-gradient(45deg, rgba(0, 255, 255, 0.4), rgba(138, 43, 226, 0.4));
                    clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
                    animation: hexagonPulse 1.5s infinite ease-in-out;
                    animation-delay: var(--delay);
                }
                
                .scan-line-button {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 1px;
                    background: linear-gradient(90deg, transparent, #00FFFF, transparent);
                    box-shadow: 0 0 4px rgba(0, 255, 255, 0.5);
                    animation: scanLineButton 2s ease-in-out infinite;
                }
                
                .loading-spinner {
                    width: 16px;
                    height: 16px;
                    border: 2px solid transparent;
                    border-top: 2px solid #00FFFF;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                }
                
                @keyframes hexagonPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
                
                @keyframes scanLineButton {
                    0%, 100% { 
                        opacity: 0; 
                        transform: translateY(0); 
                    }
                    50% { 
                        opacity: 1; 
                        transform: translateY(100%); 
                    }
                }
                
                @keyframes ripple {
                    0% {
                        transform: scale(0);
                        opacity: 1;
                    }
                    100% {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
                
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
        </button>
    );
};

export default Button;