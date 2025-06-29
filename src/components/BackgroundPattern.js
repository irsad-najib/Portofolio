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
        <div className="fixed inset-0 opacity-10 pointer-events-none">
            <div
                className={`
                    absolute inset-0 transition-opacity duration-500
                    ${theme === 'dark' ? 'opacity-100' : 'opacity-30'}
                `}
                style={{
                    backgroundImage: theme === 'dark'
                        ? `
                            radial-gradient(circle at 20% 50%, #00f5ff 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #0080ff 0%, transparent 50%),
                            radial-gradient(circle at 40% 80%, #00f5ff 0%, transparent 50%)
                        `
                        : `
                            radial-gradient(circle at 20% 50%, #06b6d4 0%, transparent 50%),
                            radial-gradient(circle at 80% 20%, #3b82f6 0%, transparent 50%),
                            radial-gradient(circle at 40% 80%, #06b6d4 0%, transparent 50%)
                        `,
                    animation: 'float 6s ease-in-out infinite'
                }}
            />

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    33% { transform: translateY(-10px) rotate(1deg); }
                    66% { transform: translateY(5px) rotate(-1deg); }
                }
            `}</style>
        </div>
    );
}