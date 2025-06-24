'use client'

import { useState } from 'react'
import Sidebar from './_components/Sidebar'
import { Menu } from 'lucide-react'

export default function DashboardLayout({ children }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Mobile Top Bar */}
        <div className="md:hidden bg-[#471396] text-white p-4 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)}>
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-2xl font-bold   md:flex items-center gap-1">
            <span className="text-[#FFCC00]">$</span>
            pend
            <span className="text-[#FFCC00]">Track</span>
          </h2>
        </div>

        {/* Page Content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
