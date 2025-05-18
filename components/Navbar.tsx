"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { isAuthenticated, logout } from "@/lib/auth"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsLoggedIn(isAuthenticated())
  }, [pathname])

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = () => {
    logout()
    setIsLoggedIn(false)
    router.push("/")
  }

  const publicLinks = [
    { name: "About Us", href: "#about" },
    { name: "Why CortexCRM", href: "#why" },
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "Comparison", href: "#comparison" },
    { name: "Reviews", href: "#reviews" },
  ]

  const privateLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Leads", href: "/leads" },
    { name: "Tickets", href: "/tickets" },
    { name: "AI Assistant", href: "/ai-assistant" },
    { name: "Analytics", href: "/analytics" },
    { name: "Settings", href: "/settings" },
  ]

  const links = isLoggedIn ? privateLinks : publicLinks

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="relative h-8 w-8 mr-2">
              <div className="absolute inset-0 bg-blue-900 rounded-md flex items-center justify-center">
                <span className="text-gold-400 font-bold text-lg">C</span>
              </div>
            </div>
            <span className="text-blue-900 font-bold text-xl">CortexCRM</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-gray-600 hover:text-blue-900 transition-colors px-2 py-1 text-sm font-medium ${
                  pathname === link.href ? "text-blue-900 font-semibold" : ""
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Button */}
          <div className="hidden md:block">
            {isLoggedIn ? (
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
              >
                Logout
              </Button>
            ) : (
              <Button asChild className="bg-blue-900 text-white hover:bg-blue-800">
                <Link href="/login">Login</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-blue-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white border-b border-gray-200"
          >
            <div className="container mx-auto px-4 py-4 space-y-3">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`block text-gray-600 hover:text-blue-900 transition-colors py-2 text-base font-medium ${
                    pathname === link.href ? "text-blue-900 font-semibold" : ""
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-2">
                {isLoggedIn ? (
                  <Button
                    onClick={() => {
                      handleLogout()
                      setIsOpen(false)
                    }}
                    variant="outline"
                    className="w-full border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white"
                  >
                    Logout
                  </Button>
                ) : (
                  <Button asChild className="w-full bg-blue-900 text-white hover:bg-blue-800">
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      Login
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
