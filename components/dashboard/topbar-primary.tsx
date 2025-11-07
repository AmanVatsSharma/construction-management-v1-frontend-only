/**
 * @file topbar-primary.tsx
 * @module components/dashboard
 * @description Top header with branding, project switcher, and user profile menu
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import { ChevronDown, User, Settings, LogOut, Bell, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { menuVariants } from "@/lib/animations"
import { useRouter } from "next/navigation"

export function TopbarPrimary() {
  const router = useRouter()
  const [showUserMenu, setShowUserMenu] = React.useState(false)

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowUserMenu(false)
    }
    
    if (showUserMenu) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showUserMenu])

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 relative">
      {/* Left: Mobile Menu + Search */}
      <motion.div
        className="flex items-center gap-3 flex-1"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronDown className="w-5 h-5 text-muted-foreground" />
        </button>

        {/* Search Bar */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted/50 hover:bg-muted
                     border border-border rounded-lg transition-all group cursor-pointer flex-1 max-w-md">
          <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search projects, tasks, documents..."
            className="bg-transparent text-sm outline-none flex-1 text-foreground placeholder:text-muted-foreground"
            aria-label="Search"
          />
          <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs
                       bg-card border border-border rounded">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </div>
      </motion.div>

      {/* Right: Notifications & User Menu */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Notifications */}
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors relative group"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowUserMenu(!showUserMenu)
              setShowProjectMenu(false)
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-lg hover:bg-muted
                     transition-all border border-transparent hover:border-border group"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <motion.div
              animate={{ rotate: showUserMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block"
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                variants={menuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-full mt-2 right-0 w-64 bg-card border border-border rounded-lg
                         shadow-lg overflow-hidden z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@novologic.com</p>
                  <p className="text-xs text-muted-foreground mt-1">Administrator</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      router.push("/settings")
                      setShowUserMenu(false)
                    }}
                    className="w-full px-3 py-2 rounded-lg text-left transition-colors
                             hover:bg-muted text-foreground flex items-center gap-3"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button
                    className="w-full px-3 py-2 rounded-lg text-left transition-colors
                             hover:bg-muted text-foreground flex items-center gap-3"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                </div>
                <div className="border-t border-border p-2">
                  <button
                    className="w-full px-3 py-2 rounded-lg text-left transition-colors
                             hover:bg-destructive/10 text-destructive flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

