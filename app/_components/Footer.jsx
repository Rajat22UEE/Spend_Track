'use client'
import Link from 'next/link'
import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative bg-[#090040] text-white  px-6 mt-16 overflow-hidden">
      {/* Clip Path Definition */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <clipPath id="squircleClip" clipPathUnits="objectBoundingBox">
            <path d="M 0,0.5 C 0,0 0,0 0.5,0 S 1,0 1,0.5 1,1 0.5,1 0,1 0,0.5" />
          </clipPath>
        </defs>
      </svg>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
        {/* Contact Info */}
        <div className="text-center md:text-left">
          <h4 className="text-2xl font-bold text-[#FFCC00] mb-2">Contact</h4>
          <p className="text-md">Rajat Debnath</p>
          <p className="text-sm text-white/70">rajatnath6909@gmail.com</p>
        </div>

        {/* Social Icons */}
        <div className="flex gap-x-4">
          {/* GitHub */}
          <Link
            href="https://github.com/Rajat22UEE"
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
          >
            <div
              style={{ clipPath: 'url(#squircleClip)' }}
              className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-600/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Github className="w-8 h-8 text-white" />
            </div>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://www.linkedin.com/in/rajat-debnath/"
            target="_blank"
            rel="noopener noreferrer"
            className="relative"
          >
            <div
              style={{ clipPath: 'url(#squircleClip)' }}
              className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg border border-blue-500/50 cursor-pointer transform transition-all duration-300 ease-out hover:scale-110 hover:-translate-y-2 hover:shadow-2xl"
            >
              <Linkedin className="w-8 h-8 text-white" />
            </div>
          </Link>
        </div>
      </div>

      {/* Footer Bottom Line */}
      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/60">
        &copy; {new Date().getFullYear()} Rajat Debnath. All rights reserved.
      </div>
    </footer>
  )
}
