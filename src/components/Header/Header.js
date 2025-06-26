"use client"
import { useState, useEffect } from 'react'
import ProfilePhoto from './ProfilePhoto'
import AnimatedLine from '../AnimatedLine'
import ScrollIndicator from '../ScrollIndicator'
import { Orbitron, Space_Grotesk } from 'next/font/google'

const orbitron = Orbitron({
    subsets: ['latin'],
    weight: ['700', '800', '900'],
})
const spaceGrotesk = Space_Grotesk({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
})

export default function Header() {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        setIsVisible(true)
    }, [])

    return (
        <section className="min-h-screen flex flex-col items-center justify-center relative overflow-visible px-4 py-8 md:py-0">
            <AnimatedLine
                className="absolute top-0 left-1/2 transform -translate-x-1/2 z-40"
                delay={500}
                direction="down"
            />

            {/* Main content container */}
            <div className="flex flex-col items-center justify-center flex-1">
                <ProfilePhoto isVisible={isVisible} />

                <h1 className={`
          text-xl md:text-5xl font-bold text-center mt-3 md:mt-5 mb-3 relative
          transition-all duration-1000 ease-out delay-[350ms] ${orbitron.className}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}
        `}>
                    IRSAD NAJIB EKA PUTRA
                    <div className={`
            absolute -bottom-3 left-1/2 transform -translate-x-1/2 h-0.5 
            bg-gradient-to-r from-cyan-400 to-violet-500
            transition-all duration-1000 ease-out delay-[500ms]
            ${isVisible ? 'w-48 md:w-60' : 'w-0'}
          `} />
                </h1>

                {/* <p className={`
          text-sm md:text-lg text-center text-gray-400 mt-4 md:mt-6
          transition-all duration-1000 ease-out delay-[600ms] ${spaceGrotesk.className}
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}
        `}>
                    Undergraduate Information Engineering
                </p> */}
            </div>

            {/* ScrollIndicator terpisah - di atas garis */}
            <div className="absolute bottom-16 md:bottom-0 left-1/2 transform -translate-x-1/2 z-40">
                <ScrollIndicator />
            </div>

            {/* AnimatedLine bottom - tetap di posisi asli */}
            <AnimatedLine
                className="absolute bottom-14 md:bottom-0left-1/2 transform -translate-x-1/2 z-40"
                delay={1000}
                direction="up"
            />
        </section>
    )
}
