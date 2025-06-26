import { Orbitron } from 'next/font/google'

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['700', '800', '900'],
})
export default function SectionTitle({ title, isVisible }) {
  return (
    <h2 className={`
      text-3xl md:text-4xl font-bold text-center mb-8 relative
      transition-all duration-700 ease-out ${orbitron.className}
      ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
    `}>
      {title}
      <div className={`
        absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5
        bg-gradient-to-r from-cyan-400 to-blue-500
        transition-all duration-1000 ease-out delay-500
        ${isVisible ? 'w-36' : 'w-0'}
      `} />
    </h2>
  )
}