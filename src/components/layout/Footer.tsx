import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-charcoal to-sage-green/30 text-white safe-padding-bottom">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {/* Logo and About - Full width on mobile, spans 2 cols on tablet */}
          <div className="space-y-4 sm:space-y-6 sm:col-span-2 lg:col-span-1">
            <div className="bg-white/95 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-xl inline-block">
              <Image
                src="/images/logo/indn-full-logo.jpg"
                alt="Indigenous Nations Diversity Network"
                width={250}
                height={75}
                className="w-full max-w-[200px] sm:max-w-[250px] h-auto"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Supporting Indigenous communities through cultural preservation, youth empowerment, and community connection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Quick Links</h3>
            <nav className="space-y-1 sm:space-y-2">
              <Link href="/about" className="block text-white/80 hover:text-white transition-colors py-1 touch-target">
                About Us
              </Link>
              <Link href="/about/board" className="block text-white/80 hover:text-white transition-colors py-1 touch-target">
                Our Board
              </Link>
              <Link href="/programs" className="block text-white/80 hover:text-white transition-colors py-1 touch-target">
                Programs
              </Link>
              <Link href="/events" className="block text-white/80 hover:text-white transition-colors py-1 touch-target">
                Events
              </Link>
              <Link href="/donate" className="block text-white/80 hover:text-white transition-colors py-1 touch-target">
                Donate
              </Link>
              <Link href="/volunteer" className="block text-white/80 hover:text-white transition-colors py-1 touch-target">
                Volunteer
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-base sm:text-lg mb-3 sm:mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1 text-sm sm:text-base">Elvira Zaragoza Robinson</p>
                <a href="mailto:ezrlaw1948@gmail.com" className="block text-white/80 hover:text-white transition-colors text-sm py-0.5">
                  ezrlaw1948@gmail.com
                </a>
                <a href="tel:+18318015530" className="block text-white/80 hover:text-white transition-colors text-sm py-0.5">
                  (831) 801-5530
                </a>
              </div>
              <div>
                <p className="font-medium mb-1 text-sm sm:text-base">Charles Wall</p>
                <a href="mailto:charleswallandfam@gmail.com" className="block text-white/80 hover:text-white transition-colors text-sm py-0.5">
                  charleswallandfam@gmail.com
                </a>
                <a href="tel:+17752710322" className="block text-white/80 hover:text-white transition-colors text-sm py-0.5">
                  (775) 271-0322
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-10 lg:mt-12 pt-6 sm:pt-8 border-t border-white/20 text-center text-white/60 text-xs sm:text-sm">
          <p>
            &copy; {new Date().getFullYear()} Indigenous Nations Diversity Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
