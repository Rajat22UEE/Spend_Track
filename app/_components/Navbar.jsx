'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.9)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={` sticky top-6 z-50 flex justify-between items-center p-4 mx-auto w-[95%] mt-10 rounded-xl bg-[#090040] text-white shadow-md transition-all duration-300 ${
        scrolled ? 'bg-[#471396]' : 'bg-[#090040]'
      } text-white`}
    >
      <h2 className="text-2xl font-bold flex items-center gap-1">
        <span className="text-[#FFCC00]">$</span>
        pend
        <span className="text-[#FFCC00]">Track</span>
      </h2>
      <div className="flex gap-4 items-center">
        <Link
          href="/dashboard"
          className="bg-[#FFCC00] text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition"
        >
          Dashboard
        </Link>
      </div>
    </nav>
  )
}
