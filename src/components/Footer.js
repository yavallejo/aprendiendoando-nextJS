'use client'

import Link from 'next/link'
import { Youtube, Twitter, Github, Linkedin } from 'lucide-react'

const socialLinks = [
  { name: 'YouTube', icon: Youtube, href: 'https://www.youtube.com/@AprendiendoAndo' },
  { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/AprendiendoAndo' },
  { name: 'GitHub', icon: Github, href: 'https://github.com/AprendiendoAndo' },
  { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/in/AprendiendoAndo' },
]

const navigation = [
  { name: 'About me', href: '#about-me' },
  { name: 'Videos', href: '#videos' },
  { name: 'Courses', href: '#premium-courses' },
  { name: 'Contact', href: '#contact' },
]

export function Footer() {
  const handleNavClick = (e, href) => {
    e.preventDefault()
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="border-t border-border/50">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Logo & description */}
          <div className="max-w-sm">
            <Link
              href="/"
              onClick={(e) => {
                e.preventDefault()
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-lg font-semibold text-foreground hover:opacity-80 transition-[opacity,transform] duration-200 ease-out hover:scale-[1.02] active:scale-[0.98]"
            >
              AprendiendoAndo
            </Link>
            <p className="mt-3 text-sm text-muted-foreground">
              Developer community learning and growing together.
            </p>
          </div>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-x-8 gap-y-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 ease-out"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-[color,background-color,transform] duration-200 ease-out hover:scale-110 active:scale-95"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/30 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} AprendiendoAndo. All rights reserved.
          </p>
          <p className="text-sm text-muted-foreground">
            Made with <span className="text-red-500">♥</span> for the community
          </p>
        </div>
      </div>
    </footer>
  )
}
