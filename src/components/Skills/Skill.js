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
                    setTimeout(() => {
                        setShowCards(true)
                    }, 1200)
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
            className="min-h-screen flex flex-col items-center justify-center px-4 md:px-8 py-10 w-full max-w-full overflow-x-hidden"
        >
            <div className="w-full max-w-7xl mx-auto overflow-x-hidden">
                <SectionTitle title="SKILLS" isVisible={isVisible} />
                <SkillCard isVisible={showCards} />
            </div>
        </section>
    )
}