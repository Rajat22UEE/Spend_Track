'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Wallet, Receipt, X } from 'lucide-react'
import clsx from 'clsx'

const navItems = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Budgets', href: '/dashboard/budgets', icon: Wallet },
  { label: 'Expenses', href: '/dashboard/expenses', icon: Receipt },
]

export default function Sidebar({ isOpen, onClose }) {
  const pathname = usePathname()
  const activeIndex = navItems.findIndex(item => item.href === pathname)

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 z-30 md:hidden" onClick={onClose} />
      )}

      <aside
        className={clsx(
          'fixed z-40  md:static md:translate-x-0 transition-transform duration-300 ease-in-out w-64 h-full p-6 bg-[#471396] text-white rounded-r-3xl',
          {
            'translate-x-0': isOpen,
            '-translate-x-full': !isOpen,
          }
        )}
      >
        {/* Close button for mobile */}
        <div className="md:hidden flex justify-end mb-4">
          <button onClick={onClose}>
            <X className="w-6 h-6 text-white" />
          </button>
        </div>

        <h2 className="text-2xl font-bold mb-6 hidden md:flex items-center gap-1">
          <span className="text-[#FFCC00]">$</span>
          pend
          <span className="text-[#FFCC00]">Track</span>
        </h2>

        <div className="radio-container" style={{ '--total-radio': navItems.length }}>
          {navItems.map(({ label, href, icon: Icon }, idx) => (
            <div key={href} className="relative">
              <input
                type="radio"
                name="sidebar"
                id={`radio-${idx}`}
                checked={pathname === href}
                readOnly
                className="hidden"
              />
              <label
                htmlFor={`radio-${idx}`}
                className="flex items-center gap-3 px-4 py-3 text-lg relative z-10 cursor-pointer"
              >
                <Icon className="w-6 h-6" />
                {label}
                <Link href={href} className="absolute inset-0 z-0" />
              </label>
            </div>
          ))}

          {activeIndex !== -1 && (
            <div className="glider-container">
              <div
                className="glider"
                style={{ transform: `translateY(${activeIndex * 100}%)` }}
              />
            </div>
          )}
        </div>
      </aside>
    </>
  )
}
