export default function ProfilePhoto({ isVisible }) {
    return (
        <div className={`
      relative w-32 h-32 md:w-48 md:h-48 rounded-3xl p-1 my-5
      transition-all duration-1000 ease-out delay-[250ms]
      ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}
    `}>
            {/* Glowing effect */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-cyan-400 to-violet-500 animate-pulse" />

            {/* Photo container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden bg-gray-800">
                <img
                    src="/new.JPG"
                    alt="Irsad Najib Eka Putra"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    )
}