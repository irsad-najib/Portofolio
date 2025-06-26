"use client"
import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../SectionTitle'
import SkillCard from './SkillCard'

export default function Skills() {
    const [isVisible, setIsVisible] = useState(false)
    const [showCards, setShowCards] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    // Delay cards animation after title animation completes
                    setTimeout(() => {
                        setShowCards(true)
                    }, 1200) // Title animation (700ms) + underline (1000ms with 500ms delay)
                }
            },
            {
                threshold: 0.3,
                rootMargin: '0px 0px -100px 0px'
            }
        )

        if (sectionRef.current) {
            observer.observe(sectionRef.current)
        }

        return () => observer.disconnect()
    }, [])

    return (
        <section
            ref={sectionRef}
            className="min-h-screen flex flex-col items-center justify-center px-5 py-10"
        >
            <SectionTitle title="SKILLS" isVisible={isVisible} />
            <SkillCard isVisible={showCards} />
        </section>
    )
}