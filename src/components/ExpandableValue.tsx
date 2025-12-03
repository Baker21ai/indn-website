'use client'

import { useState } from 'react'

interface Value {
  title: string
  description: string
}

interface FlipCardValueProps {
  value: Value
  isFlipped: boolean
  onToggle: () => void
  index: number
}

export function FlipCardValue({ value, isFlipped, onToggle, index }: FlipCardValueProps) {
  return (
    <div 
      className="w-full sm:w-auto"
      style={{ 
        perspective: '1000px',
        animationDelay: `${index * 100}ms` 
      }}
    >
      <button
        onClick={onToggle}
        className={`
          relative w-full sm:w-[280px] sm:h-[180px] lg:w-[200px] lg:h-[200px]
          cursor-pointer
          transition-transform duration-600
          focus:outline-none focus-visible:ring-2 focus-visible:ring-terracotta focus-visible:ring-offset-2
        `}
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        aria-label={isFlipped ? `Hide description of ${value.title}` : `Learn more about ${value.title}`}
      >
        {/* Front Face - Title */}
        <div
          className={`
            absolute inset-0 group
            bg-white/90 backdrop-blur-sm
            rounded-2xl sm:rounded-3xl lg:rounded-full
            flex flex-col items-center justify-center text-center
            p-5 sm:p-6 lg:p-8
            border-[3px] border-transparent
            shadow-editorial
            hover:shadow-editorial-hover hover:border-terracotta/30
            transition-shadow duration-300
          `}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <h3 className="text-lg sm:text-xl lg:text-xl font-semibold text-charcoal tracking-tight font-serif">
            {value.title}
          </h3>
          
          {/* Subtle indicator line */}
          <div className="mt-3 w-8 h-0.5 rounded-full bg-stone-gray/30 group-hover:bg-terracotta/50 transition-colors" />
        </div>

        {/* Back Face - Description */}
        <div
          className={`
            absolute inset-0
            bg-charcoal text-white
            rounded-2xl sm:rounded-3xl lg:rounded-full
            flex flex-col items-center justify-center text-center
            p-5 sm:p-6 lg:p-6
            border-[3px] border-terracotta
            shadow-warm-lg
          `}
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-sm sm:text-[0.9rem] leading-relaxed text-white/90">
            {value.description}
          </p>
          
          {/* Subtle indicator line */}
          <div className="mt-3 w-8 h-0.5 rounded-full bg-terracotta/50" />
        </div>
      </button>
    </div>
  )
}

interface ExpandableValuesGridProps {
  values: Value[]
  allowMultiple?: boolean
}

export function ExpandableValuesGrid({ values, allowMultiple = true }: ExpandableValuesGridProps) {
  const [flippedIndices, setFlippedIndices] = useState<number[]>([])

  const handleToggle = (index: number) => {
    if (allowMultiple) {
      setFlippedIndices(prev => 
        prev.includes(index) 
          ? prev.filter(i => i !== index)
          : [...prev, index]
      )
    } else {
      setFlippedIndices(prev => 
        prev.includes(index) ? [] : [index]
      )
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-[1000px] mx-auto justify-items-center">
      {values.map((value, index) => (
        <FlipCardValue
          key={index}
          value={value}
          isFlipped={flippedIndices.includes(index)}
          onToggle={() => handleToggle(index)}
          index={index}
        />
      ))}
    </div>
  )
}

// Keep the old export name for backwards compatibility
export { FlipCardValue as ExpandableValue }
