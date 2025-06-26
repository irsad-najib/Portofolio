import { useState, useEffect } from 'react'

export default function AnimatedLine({ className, delay = 0, direction = 'down' }) {
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(true)
        }, delay)

        return () => clearTimeout(timer)
    }, [delay])

    const gradientClass = direction === 'down'
        ? 'bg-gradient-to-b'
        : 'bg-gradient-to-t'

    return (
        <div className={`
            w-1 ${gradientClass}
            from-transparent via-cyan-400 to-transparent
            transition-all duration-1000 ease-out
            ${isAnimating ? 'h-32 opacity-100' : 'h-0 opacity-0'}
            ${className}
        `} />
    )
}