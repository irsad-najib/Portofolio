'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';

export default function BackgroundPattern() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Memoize style calculations
    const backgroundStyles = useMemo(() => {
        if (!mounted) return {};

        if (theme === 'dark') {
            return {
                backgroundImage: `
                    radial-gradient(circle at 25% 25%, rgba(6, 182, 212, 0.3) 0%, transparent 50%),
                    radial-gradient(circle at 75% 75%, rgba(139, 92, 246, 0.2) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.1) 0%, transparent 60%)
                `,
                animation: 'elegantFloat 12s ease-in-out infinite'
            };
        } else {
            return {
                backgroundImage: `
                    radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.15) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(14, 165, 233, 0.12) 0%, transparent 50%),
                    radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 60%)
                `,
                animation: 'lightFloat 15s ease-in-out infinite'
            };
        }
    }, [theme, mounted]);

    const gridStyles = useMemo(() => {
        if (!mounted) return {};

        return {
            backgroundImage: theme === 'dark'
                ? `
                    linear-gradient(90deg, transparent 0%, rgba(6, 182, 212, 0.1) 50%, transparent 100%),
                    linear-gradient(0deg, transparent 0%, rgba(139, 92, 246, 0.1) 50%, transparent 100%)
                `
                : `
                    linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, transparent 30%),
                    linear-gradient(45deg, rgba(14, 165, 233, 0.08) 0%, transparent 25%)
                `,
            backgroundSize: theme === 'dark' ? '800px 1px, 1px 800px' : '400px 400px, 300px 300px',
            animation: theme === 'dark' ? 'subtleScan 20s linear infinite' : 'gentleRotate 25s linear infinite'
        };
    }, [theme, mounted]);

    if (!mounted) return null;

    return (
        <div className={`
            fixed inset-0 pointer-events-none transition-all duration-1000
            ${theme === 'dark' ? 'opacity-10' : 'opacity-15'}
        `}>
            {/* Main gradient */}
            <div className="absolute inset-0" style={backgroundStyles} />

            {/* Grid pattern */}
            <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-20' : 'opacity-25'}`} style={gridStyles} />

            {/* Dots pattern */}
            <div
                className={`absolute inset-0 ${theme === 'dark' ? 'opacity-15' : 'opacity-10'}`}
                style={{
                    backgroundImage: `radial-gradient(circle at center, ${theme === 'dark'
                            ? 'rgba(6, 182, 212, 0.4) 1px, transparent 1px'
                            : 'rgba(59, 130, 246, 0.3) 0.5px, transparent 0.5px'
                        })`,
                    backgroundSize: theme === 'dark' ? '60px 60px' : '80px 80px',
                    animation: theme === 'dark' ? 'dotPulse 15s ease-in-out infinite' : 'lightDotPulse 18s ease-in-out infinite'
                }}
            />

            <style jsx>{`
                @keyframes elegantFloat {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-20px) scale(1.05); }
                }
                
                @keyframes lightFloat {
                    0%, 100% { transform: translateX(0px) translateY(0px) scale(1); }
                    33% { transform: translateX(15px) translateY(-10px) scale(1.02); }
                    66% { transform: translateX(-10px) translateY(15px) scale(0.98); }
                }
                
                @keyframes subtleScan {
                    0% { transform: translateX(-50%) translateY(-50%); opacity: 0; }
                    50% { opacity: 0.3; }
                    100% { transform: translateX(50%) translateY(50%); opacity: 0; }
                }
                
                @keyframes gentleRotate {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                
                @keyframes dotPulse {
                    0%, 100% { opacity: 0.15; transform: scale(1); }
                    50% { opacity: 0.3; transform: scale(1.1); }
                }
                
                @keyframes lightDotPulse {
                    0%, 100% { opacity: 0.1; transform: scale(1); }
                    50% { opacity: 0.2; transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
}