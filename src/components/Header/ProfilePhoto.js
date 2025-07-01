export default function ProfilePhoto({ isVisible }) {
    return (
        <div className={`
            relative w-32 h-32 md:w-48 md:h-48 rounded-3xl p-0.5 my-5
            transition-all duration-1000 ease-out delay-[250ms]
            ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
        `}>
            {/* Glowing effect dengan custom animation */}
            <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 animate-pulse-subtle" />

            {/* Photo container - FIXED: ganti overflow-auto jadi overflow-hidden */}
            <div className="relative w-full h-full rounded-3xl bg-gray-800">
                <img
                    src="/new.JPG"
                    alt="Irsad Najib Eka Putra"
                    className="w-full h-full object-cover rounded-3xl"
                />
            </div>

            <style jsx>{`
                .animate-pulse-subtle {
                    animation: pulse-subtle 2s infinite;
                }
                
                @keyframes pulse-subtle {
                    0%, 100% {
                        opacity: 1;
                        transform: scale(1);
                    }
                    50% {
                        opacity: 0.7;
                        transform: scale(1.05);
                    }
                }
            `}</style>
        </div>
    )
}