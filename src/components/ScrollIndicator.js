"use client"
import { useState, useEffect } from 'react'

export default function ScrollIndicator() {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setIsVisible(false)
            } else {
                setIsVisible(true)
            }
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div className={`
            flex flex-col items-center text-white text-sm
            animate-bounce transition-opacity duration-500
            ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
            <span>Scroll</span>
            <div className="mt-2 text-xl">↓</div>
        </div>
    )
}
