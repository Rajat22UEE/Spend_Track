'use client'
import Link from 'next/link'

export default function Navbar() {

  return (
    <nav className="flex justify-between items-center p-4 shadow bg-gray-800">
      <h1 className="text-xl font-bold">SpendTrack</h1>
      <div className="flex gap-4 items-center">
        <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Dashboard</Link>
        
      </div>
    </nav>
  )
}
