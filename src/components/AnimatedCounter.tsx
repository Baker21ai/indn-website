'use client'

import { useEffect, useState, useRef } from 'react'

interface AnimatedCounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  className?: string
  labelAbove?: string
  labelBelow?: string
}

export function AnimatedCounter({
  end,
  suffix = '',
  prefix = '',
  duration = 2000,
  className = '',
  labelAbove,
  labelBelow,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0)
  const [hasAnimated, setHasAnimated] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true)
            animateCount()
          }
        })
      },
      { threshold: 0.3 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [hasAnimated])

  const animateCount = () => {
    const startTime = performance.now()
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Easing function - ease out cubic for satisfying deceleration
      const easeOutCubic = 1 - Math.pow(1 - progress, 3)
      
      setCount(Math.floor(easeOutCubic * end))
      
      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }
    
    requestAnimationFrame(animate)
  }

  return (
    <div 
      ref={ref} 
      className={`text-center ${className}`}
    >
      {labelAbove && (
        <p className="text-white/70 font-sans text-sm sm:text-base uppercase tracking-widest mb-2">
          {labelAbove}
        </p>
      )}
      <div className="font-serif font-bold tracking-tight">
        <span className="tabular-nums">
          {prefix}{count.toLocaleString()}{suffix}
        </span>
      </div>
      {labelBelow && (
        <p className="text-white/80 font-sans text-base sm:text-lg mt-2">
          {labelBelow}
        </p>
      )}
    </div>
  )
}

