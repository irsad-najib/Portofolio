import { Space_Grotesk } from 'next/font/google'

const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

export default function AboutCard({ isVisible }) {
    return (
        <div className={`
      relative group max-w-2xl bg-zinc-900/80 border border-cyan-400/20 
      p-8 text-center leading-relaxed shadow-2xl rounded-2xl
      transition-all duration-700 ease-out delay-300
      hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/10 hover:-translate-y-1
      overflow-hidden ${spaceGrotesk.className}
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}>
            {/* Hover effect outline garis */}
            <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-400 to-violet-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />

            {/* Hexagon grid effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500">
                <div className="hexagon-grid">
                    {Array.from({ length: 24 }).map((_, i) => (
                        <div
                            key={i}
                            className="hexagon"
                            style={{
                                '--delay': `${i * 0.1}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            <p className={`
        ${spaceGrotesk.className} text-gray-200 leading-relaxed tracking-wide 
        relative z-10 md:text-lg text-sm
        transition-all duration-300 group-hover:text-cyan-300
      `}>
                I am a student of Information Engineering at Universitas Gadjah Mada
                with a strong interest in information technology, especially in
                fullstack livecode development with expertise in web and mobile
                application development. I am passionate about learning new technologies,
                collaborating on innovative projects, and continuously improving my skills
                to contribute effectively to the tech industry and solve real-world problems.
            </p>

            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-violet-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

            <style jsx>{`
                .hexagon-grid {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    grid-template-rows: repeat(4, 1fr);
                    gap: 8px;
                    padding: 16px;
                    height: 100%;
                    width: 100%;
                }
                
                .hexagon {
                    width: 20px;
                    height: 20px;
                    background: linear-gradient(45deg, rgba(0, 255, 255, 0.3), rgba(138, 43, 226, 0.3));
                    clip-path: polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%);
                    animation: hexagonPulse 2s infinite ease-in-out;
                    animation-delay: var(--delay);
                }
                
                @keyframes hexagonPulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.2); }
                }
            `}</style>
        </div>
    )
}