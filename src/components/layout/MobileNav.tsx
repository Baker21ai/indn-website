'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, Users, Calendar, Home, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from './Logo'

const navigation = [
  { name: 'Home', href: '#home', icon: Home },
  { name: 'Board', href: '#board', icon: UserCheck },
  { name: 'Events', href: '#events', icon: Calendar },
  { name: 'Sponsors', href: '#sponsors', icon: Users },
  { name: 'Become a Sponsor', href: '#become-sponsor', icon: Heart },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()

  // Ensure we only render portal on client
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      // Determine active section based on scroll position
      const sections = ['home', 'board', 'events', 'sponsors', 'become-sponsor']
      const scrollPosition = window.scrollY + 100

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
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (pathname === '/' && href.startsWith('#')) {
      e.preventDefault()
      const targetId = href.substring(1)
      const element = document.getElementById(targetId)
      if (element) {
        const headerOffset = 80 // Reduced for mobile
        const elementPosition = element.getBoundingClientRect().top
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
        toggleMenu() // Close menu after navigation
      }
    } else {
      toggleMenu()
    }
  }

  // Drawer content to be portaled
  const drawerContent = (
    <>
      {/* Backdrop */}
      <div
        className={`
          fixed inset-0 bg-charcoal/50 backdrop-blur-sm
          transition-opacity duration-300
          ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
        `}
        style={{ zIndex: 9998 }}
        onClick={toggleMenu}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 bottom-0 w-[85vw] max-w-[320px] bg-white
          shadow-2xl overflow-hidden
          transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
        style={{ zIndex: 9999 }}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
      >
        {/* Header with Close Button */}
        <div className="flex items-center justify-between p-4 border-b border-warm-gray/20 bg-white">
          <Logo />
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="w-10 h-10 rounded-full hover:bg-warm-gray/10"
            aria-label="Close menu"
          >
            <X className="w-6 h-6 text-charcoal" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 py-6 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 130px)' }}>
          {navigation.map((item) => {
            const Icon = item.icon
            const targetSection = item.href.replace('#', '')
            const isActive = activeSection === targetSection
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`
                  flex items-center gap-4 px-4 py-4 rounded-xl
                  transition-all duration-200 group
                  ${
                    isActive
                      ? 'bg-gradient-to-r from-terracotta/15 to-sage-green/10 border border-terracotta/20'
                      : 'hover:bg-warm-gray/5 active:bg-warm-gray/10'
                  }
                `}
              >
                <div className={`
                  w-10 h-10 rounded-lg flex items-center justify-center shrink-0
                  ${isActive ? 'bg-terracotta/10' : 'bg-warm-gray/5 group-hover:bg-terracotta/10'}
                  transition-colors
                `}>
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? 'text-terracotta'
                        : 'text-stone-gray group-hover:text-terracotta'
                    } transition-colors`}
                  />
                </div>
                <span
                  className={`font-medium text-base ${
                    isActive ? 'text-charcoal' : 'text-stone-gray group-hover:text-charcoal'
                  } transition-colors`}
                >
                  {item.name}
                </span>
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-warm-gray/20 bg-white">
          <p className="text-xs text-stone-gray text-center">
            Indigenous Nations Diversity Network
          </p>
        </div>
      </div>
    </>
  )

  return (
    <div className="xl:hidden">
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative w-11 h-11 sm:w-12 sm:h-12 hover:bg-warm-gray/10"
        aria-label="Toggle menu"
        aria-expanded={isOpen}
      >
        <Menu className="w-6 h-6 sm:w-7 sm:h-7 text-charcoal" />
      </Button>

      {/* Portal the drawer to body so it's outside header's stacking context */}
      {mounted && createPortal(drawerContent, document.body)}
    </div>
  )
}
