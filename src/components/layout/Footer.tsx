import Link from 'next/link'
import Image from 'next/image'

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-charcoal to-sage-green/30 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and About */}
          <div className="space-y-6">
            <div className="bg-white/95 backdrop-blur-sm px-6 py-4 rounded-xl inline-block">
              <Image
                src="/images/logo/indn-full-logo.jpg"
                alt="Indigenous Nations Diversity Network"
                width={250}
                height={75}
                className="w-full max-w-[250px] h-auto"
              />
            </div>
            <p className="text-white/80 text-sm leading-relaxed">
              Supporting Indigenous communities through cultural preservation, youth empowerment, and community connection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-2">
              <Link href="/about" className="block text-white/80 hover:text-white transition-colors">
                About Us
              </Link>
              <Link href="/about/board" className="block text-white/80 hover:text-white transition-colors">
                Our Board
              </Link>
              <Link href="/programs" className="block text-white/80 hover:text-white transition-colors">
                Programs
              </Link>
              <Link href="/events" className="block text-white/80 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/donate" className="block text-white/80 hover:text-white transition-colors">
                Donate
              </Link>
              <Link href="/volunteer" className="block text-white/80 hover:text-white transition-colors">
                Volunteer
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">Elvira Zaragoza Robinson</p>
                <a href="mailto:ezrlaw1948@gmail.com" className="block text-white/80 hover:text-white transition-colors text-sm">
                  ezrlaw1948@gmail.com
                </a>
                <a href="tel:+18318015530" className="block text-white/80 hover:text-white transition-colors text-sm">
                  (831) 801-5530
                </a>
              </div>
              <div>
                <p className="font-medium mb-1">Charles Wall</p>
                <a href="mailto:charleswallandfam@gmail.com" className="block text-white/80 hover:text-white transition-colors text-sm">
                  charleswallandfam@gmail.com
                </a>
                <a href="tel:+17752710322" className="block text-white/80 hover:text-white transition-colors text-sm">
                  (775) 271-0322
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-white/60 text-sm">
          <p>
            &copy; {new Date().getFullYear()} Indigenous Nations Diversity Network. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
