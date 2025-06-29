'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Space_Grotesk } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
});

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="fixed top-6 right-6 z-50 w-12 h-12 bg-zinc-800/80 border border-cyan-400/20 rounded-lg" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`
                fixed top-6 right-6 z-50 group
                w-12 h-12 bg-zinc-900/80 border border-cyan-400/20 rounded-lg
                hover:border-cyan-400 hover:bg-zinc-800/90
                transition-all duration-300 hover:-translate-y-0.5
                flex items-center justify-center
                ${spaceGrotesk.className}
            `}
            aria-label="Toggle theme"
        >
            {/* Icon container */}
            <div className="relative w-6 h-6 flex items-center justify-center">
                {theme === 'dark' ? (
                    // Sun icon
                    <div className="text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <circle cx="12" cy="12" r="4" />
                            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 6.34L4.93 4.93M19.07 19.07l-1.41-1.41" />
                        </svg>
                    </div>
                ) : (
                    // Moon icon
                    <div className="text-blue-400 group-hover:text-blue-300 transition-colors duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-violet-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

            {/* Corner indicator */}
            <div className="absolute top-1 right-1 w-1 h-1 bg-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </button>
    );
}