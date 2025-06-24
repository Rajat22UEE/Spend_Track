'use client'
import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function MonthSelector({ month, setMonth }) {
  const [open, setOpen] = useState(false)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const dropdownRef = useRef(null)

  // Generate month list for the selected year
  const months = [...Array(12)].map((_, i) => {
    const key = `${selectedYear}-${String(i + 1).padStart(2, '0')}`
    const label = `${new Date(selectedYear, i).toLocaleString('default', {
      month: 'long',
    })} ${selectedYear}`
    return { key, label }
  })

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = e => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative w-60" ref={dropdownRef}>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full bg-[#471396] text-white px-4 py-2 rounded shadow hover:bg-[#5d19bb] transition"
      >
        {months.find(m => m.key === month)?.label || 'Select Month'}
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 bg-[#471396] border rounded w-full mt-1 shadow-lg">
          {/* Year Controls */}
          <div className="flex justify-between items-center px-4 py-2 text-white border-b border-white">
            <button
              onClick={() => setSelectedYear(prev => prev - 1)}
              className="hover:text-[#FFCC00] transition"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-semibold">{selectedYear}</span>
            <button
              onClick={() => setSelectedYear(prev => prev + 1)}
              className="hover:text-[#FFCC00] transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>

          {/* Month List */}
          <ul>
            {months.map(m => (
              <li
                key={m.key}
                onClick={() => {
                  setMonth(m.key)
                  setOpen(false)
                }}
                className="px-4 py-2 cursor-pointer hover:bg-[#FFCC00] hover:text-black transition-colors"
              >
                {m.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
