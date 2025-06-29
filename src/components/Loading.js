'use client';
import { memo } from 'react';

const Loading = memo(() => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
            <div className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-4">
                    <div className="absolute inset-0 border-4 border-cyan-400/20 rounded-full"></div>
                    <div className="absolute inset-0 border-4 border-transparent border-t-cyan-400 rounded-full animate-spin"></div>
                </div>
                <p className="text-cyan-400 text-sm font-mono">Loading Portfolio...</p>
            </div>
        </div>
    );
});

Loading.displayName = 'Loading';

export default Loading;