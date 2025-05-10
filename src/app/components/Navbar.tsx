'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils' // If you have a className helper, otherwise remove

export default function Navbar() {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setVisible(currentScrollY < lastScrollY || currentScrollY < 10)
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <div
      className={cn(
        'fixed top-4 left-1/2 z-50 -translate-x-1/2 transition-all duration-300',
        visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      )}
    >
      <div className="bg-white/90 backdrop-blur-md shadow-lg rounded-2xl px-6 py-3 flex items-center gap-4 border border-gray-200 min-w-[300px] max-w-[800px] mx-auto">
        <Link href="/" className="text-lg font-semibold text-gray-800 hover:text-gray-900">
          Studio
        </Link>
        <input
          type="text"
          placeholder="Search..."
          className="flex-1 px-3 py-2 rounded-xl border border-gray-300 outline-none focus:ring-2 focus:ring-blue-300 text-sm"
        />
        <Link
          href="/login"
          className="text-sm px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl text-gray-700"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="text-sm px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
        >
          Sign Up
        </Link>
      </div>
    </div>
  )
}
