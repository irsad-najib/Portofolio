'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState, useMemo } from 'react';

export default function BackgroundPattern() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        setMounted(true);

        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const backgroundStyles = useMemo(() => {
        if (!mounted) return {};

        if (theme === 'dark') {
            return {
                backgroundImage: `
                    radial-gradient(circle at 20% 30%, rgba(0, 255, 255, 0.4) 0%, transparent 40%),
                    radial-gradient(circle at 80% 70%, rgba(138, 43, 226, 0.35) 0%, transparent 45%),
                    radial-gradient(circle at 50% 10%, rgba(0, 255, 127, 0.25) 0%, transparent 50%),
                    radial-gradient(circle at 30% 80%, rgba(255, 20, 147, 0.3) 0%, transparent 35%)
                `,
                transform: `translateX(${scrollY * -0.15}px)`,
                transition: 'transform 0.1s ease-out'
            };
        } else {
            return {
                backgroundColor: 'rgba(248, 250, 252, 0.3)',
                backgroundImage: `
                    radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
                    radial-gradient(circle at 70% 80%, rgba(99, 102, 241, 0.35) 0%, transparent 45%)
                `,
                transform: `translateX(${scrollY * 0.1}px)`,
                transition: 'transform 0.1s ease-out'
            };
        }
    }, [theme, mounted]);

    const gridStyles = useMemo(() => {
        if (!mounted) return {};

        return {
            backgroundImage: theme === 'dark'
                ? `
                    linear-gradient(90deg, transparent 0%, rgba(0, 255, 255, 0.3) 1px, transparent 1px),
                    linear-gradient(0deg, transparent 0%, rgba(138, 43, 226, 0.25) 1px, transparent 1px)
                `
                : `
                    linear-gradient(90deg, rgba(59, 130, 246, 0.1) 0%, rgba(59, 130, 246, 0.3) 1px, rgba(59, 130, 246, 0.1) 2px),
                    linear-gradient(0deg, rgba(99, 102, 241, 0.1) 0%, rgba(99, 102, 241, 0.25) 1px, rgba(99, 102, 241, 0.1) 2px)
                `,
            backgroundSize: '100px 100px',
            transform: theme === 'dark'
                ? `translateX(${scrollY * -0.2}px) translateY(${scrollY * 0.1}px)`
                : `translateX(${scrollY * 0.15}px)`,
            transition: 'transform 0.1s ease-out'
        };
    }, [theme, mounted]);

    const hexPattern = useMemo(() => {
        if (!mounted) return {};

        return {
            backgroundImage: theme === 'dark'
                ? `
                    radial-gradient(circle at center, rgba(0, 255, 255, 0.6) 1px, transparent 1px),
                    radial-gradient(circle at center, rgba(255, 20, 147, 0.4) 0.5px, transparent 0.5px)
                `
                : `
                    radial-gradient(circle at center, rgba(59, 130, 246, 0.4) 1px, transparent 1px),
                    radial-gradient(circle at center, rgba(99, 102, 241, 0.3) 0.5px, transparent 0.5px)
                `,
            backgroundSize: theme === 'dark' ? '50px 50px, 25px 25px' : '60px 60px, 30px 30px',
            backgroundPosition: theme === 'dark' ? '0 0, 25px 25px' : '0 0, 30px 30px',
            transform: theme === 'dark'
                ? `translateX(${scrollY * 0.1}px) translateY(${scrollY * -0.05}px)`
                : `translateX(${scrollY * -0.08}px)`,
            transition: 'transform 0.1s ease-out'
        };
    }, [theme, mounted]);

    if (!mounted) return null;

    return (
        <div className={`
            fixed inset-0 pointer-events-none transition-all duration-1000
            ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}
            overflow-hidden
        `}>
            {/* Main cyber gradient */}
            <div className="absolute inset-0 overflow-hidden" style={backgroundStyles} />

            {/* Cyber grid */}
            <div className={`absolute inset-0 overflow-hidden ${theme === 'dark' ? 'opacity-40' : 'opacity-50'}`} style={gridStyles} />

            {/* Hex pattern dots */}
            <div
                className={`absolute inset-0 overflow-hidden ${theme === 'dark' ? 'opacity-25' : 'opacity-35'}`}
                style={hexPattern}
            />
        </div>
    );
}