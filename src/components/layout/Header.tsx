'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Logo } from './Logo'
import { MobileNav } from './MobileNav'

const navigation = [
  { name: 'Home', href: '#home' },
  { name: 'Board', href: '#board' },
  { name: 'Events', href: '#events' },
  { name: 'Sponsors', href: '#sponsors' },
  { name: 'Become a Sponsor', href: '#become-sponsor' },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)

      // Determine active section based on scroll position
      const sections = ['home', 'board', 'events', 'sponsors', 'become-sponsor']
      const scrollPosition = window.scrollY + 100 // Offset for header

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const top = element.offsetTop
          const bottom = top + element.offsetHeight
          if (scrollPosition >= top && scrollPosition < bottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initialize on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Only handle smooth scrolling on the homepage
    if (pathname === '/' && href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        const headerOffset = 100 // Account for fixed header
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    }
  }

  return (
    <header
      className={`
        fixed top-0 left-0 right-0 z-40
        transition-all duration-300 ease-out
        ${
          isScrolled
            ? 'h-16 lg:h-20 bg-white/90 backdrop-blur-xl shadow-elevated'
            : 'h-20 lg:h-24 bg-white/70 backdrop-blur-md'
        }
      `}
    >
      {/* Subtle indigenous pattern background */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23333' fill-opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-full flex items-center justify-between">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => {
              const targetSection = item.href.replace('#', '')
              const isActive = activeSection === targetSection
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`
                    px-4 py-2 rounded-lg font-medium text-sm
                    transition-all duration-200
                    ${
                      isActive
                        ? 'text-terracotta bg-terracotta/10 shadow-soft'
                        : 'text-stone-gray hover:text-charcoal hover:bg-warm-gray/10'
                    }
                  `}
                >
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* TEMPORARILY HIDDEN - Desktop CTA Buttons (Sign In/Sign Up) */}
          {/* Uncomment this section to re-enable authentication buttons */}
          {/*
          <div className="hidden lg:flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              className="text-terracotta hover:text-terracotta/80 hover:bg-terracotta/5"
            >
              <Link href="/login">Sign In</Link>
            </Button>
            <Button
              asChild
              className="bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth"
            >
              <Link href="/register">Sign Up</Link>
            </Button>
          </div>
          */}

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </div>

      {/* Bottom border with gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-warm-gray/20 to-transparent" />
    </header>
  )
}
