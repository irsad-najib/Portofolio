"use client"
import { useEffect, useRef, useState } from 'react'
import SectionTitle from '../SectionTitle'
import AboutCard from './AboutCard'

export default function About() {
    const [isVisible, setIsVisible] = useState(false)
    const sectionRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true)
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
            <SectionTitle title="ABOUT ME" isVisible={isVisible} />
            <AboutCard isVisible={isVisible} />
        </section>
    )
}