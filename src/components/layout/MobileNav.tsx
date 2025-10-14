'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X, Heart, Users, Calendar, Info, UserCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Logo } from './Logo'

const navigation = [
  { name: 'About', href: '/about', icon: Info },
  { name: 'Board', href: '/about/board', icon: UserCheck },
  { name: 'Programs', href: '/programs', icon: Users },
  { name: 'Events', href: '/events', icon: Calendar },
  { name: 'Donate', href: '/donate', icon: Heart },
]

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <div className="lg:hidden">
      {/* Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleMenu}
        className="relative z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-charcoal" />
        ) : (
          <Menu className="w-6 h-6 text-charcoal" />
        )}
      </Button>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-40 animate-in fade-in duration-200"
          onClick={toggleMenu}
        />
      )}

      {/* Drawer */}
      <div
        className={`
          fixed top-0 right-0 h-full w-[280px] bg-white/95 backdrop-blur-xl
          shadow-elevated-lg z-50 transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}
        `}
      >
        {/* Subtle indigenous pattern background */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30 30 0z' fill='%23333' fill-opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: '40px 40px',
            }}
          />
        </div>

        <div className="relative h-full flex flex-col">
          {/* Header */}
          <div className="p-6 border-b border-warm-gray/20">
            <Logo />
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={toggleMenu}
                  className={`
                    flex items-center gap-4 px-4 py-3 rounded-xl
                    transition-all duration-200 group
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-terracotta/10 to-sage-green/10 shadow-soft'
                        : 'hover:bg-warm-gray/5 hover:shadow-soft'
                    }
                  `}
                >
                  <Icon
                    className={`w-5 h-5 ${
                      isActive
                        ? 'text-terracotta'
                        : 'text-stone-gray group-hover:text-terracotta'
                    } transition-colors`}
                  />
                  <span
                    className={`font-medium ${
                      isActive ? 'text-charcoal' : 'text-stone-gray'
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              )
            })}
          </nav>

          {/* CTA Section */}
          <div className="p-6 border-t border-warm-gray/20 space-y-3">
            <Button
              asChild
              className="w-full bg-terracotta hover:bg-terracotta/90 text-white shadow-elevated hover:shadow-elevated-lg transition-depth"
            >
              <Link href="/register">Sign Up</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="w-full border-terracotta/30 text-terracotta hover:bg-terracotta/5"
            >
              <Link href="/login">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
