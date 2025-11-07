/**
 * @file sidebar.tsx
 * @module components/dashboard
 * @description Enhanced sidebar with modern animations, hover effects, and smooth transitions
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import {
  X,
  Home,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Layers,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"
import { useSidebar } from "@/lib/sidebar-context"
import { motion, AnimatePresence } from "framer-motion"
import { staggerContainer, staggerItem, slideInFromLeft } from "@/lib/animations"

interface SidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onToggle: (open: boolean) => void
  onCollapse: (collapsed: boolean) => void
}

export function Sidebar({ isOpen, isCollapsed, onToggle, onCollapse }: SidebarProps) {
  const pathname = usePathname()
  const { getEnabledModules } = useSidebar()

  // Always visible items
  const alwaysVisibleItems = [
    { icon: Home, label: "Dashboard", href: "/" },
    { icon: Layers, label: "Modules", href: "/modules" },
  ]

  // Get enabled modules from context
  const enabledModules = getEnabledModules()

  // Convert enabled modules to nav items format
  const enabledNavItems = enabledModules.map((module) => ({
    icon: module.icon,
    label: module.label,
    href: module.href,
  }))

  // Settings is always at the end
  const settingsItem = { icon: Settings, label: "Settings", href: "/settings" }

  // Combine all nav items: Dashboard, Modules, enabled modules, Settings
  const navItems = [...alwaysVisibleItems, ...enabledNavItems, settingsItem]

  return (
    <>
      {/* Mobile overlay with animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-30 bg-black/50 lg:hidden backdrop-blur-sm"
            onClick={() => onToggle(false)}
            role="presentation"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 256,
          x: isOpen || typeof window === "undefined" || window.innerWidth >= 1024 ? 0 : -256,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed lg:static z-40 h-screen flex flex-col shadow-lg border-r border-border bg-card"
      >
        {/* Header with Logo */}
        <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
          <AnimatePresence mode="wait">
            {!isCollapsed ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg 
                           flex items-center justify-center flex-shrink-0 shadow-md"
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Logo size={24} strokeColor="white" />
                </motion.div>
                <div>
                  <h1 className="text-lg font-bold text-foreground font-heading">Novologic</h1>
                  <p className="text-xs text-muted-foreground">v0.1</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg 
                         flex items-center justify-center flex-shrink-0 mx-auto shadow-md hover-scale"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
              >
                <Logo size={24} strokeColor="white" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={() => onCollapse(!isCollapsed)}
            className="hidden lg:flex p-1.5 hover:bg-muted rounded-lg transition-colors"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              animate={{ rotate: isCollapsed ? 0 : 180 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronLeft className="w-5 h-5" />
            </motion.div>
          </motion.button>

          <motion.button
            onClick={() => onToggle(false)}
            className="lg:hidden p-1 hover:bg-muted rounded"
            aria-label="Close sidebar"
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>

        {/* Project Switcher - hidden when collapsed */}
        <AnimatePresence>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="p-4 border-b border-border"
            >
              <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">
                Current Project
              </p>
              <motion.button
                className="w-full px-3 py-2.5 bg-gradient-to-r from-primary/10 to-primary/5 
                         border border-primary/30 rounded-lg text-sm text-foreground font-medium 
                         hover:from-primary/20 hover:to-primary/10 transition-all flex items-center 
                         justify-between group shadow-sm hover:shadow-md"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="truncate group-hover:text-primary transition-colors">
                  Downtown Tower Phase 2
                </span>
                <motion.div
                  animate={{ rotate: 0 }}
                  whileHover={{ rotate: 180 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                </motion.div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Nav Items */}
        <motion.nav
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="flex-1 p-2 space-y-1 overflow-y-auto scrollbar-thin"
        >
          {navItems.map((item, index) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href))
            const Icon = item.icon

            return (
              <motion.div
                key={item.href}
                variants={staggerItem}
                custom={index}
              >
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all group relative ${
                    isActive
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "text-foreground hover:bg-primary/10 hover:text-primary"
                  } ${isCollapsed ? "justify-center" : ""}`}
                  title={isCollapsed ? item.label : undefined}
                  onClick={() => {
                    if (isOpen) onToggle(false)
                  }}
                >
                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-primary-foreground rounded-r-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}

                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 transition-all ${
                        isActive ? "" : "group-hover:scale-110"
                      }`}
                    />
                  </motion.div>

                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium text-sm"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Hover glow effect */}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity bg-primary/5" />
                  )}
                </Link>
              </motion.div>
            )
          })}
        </motion.nav>

        {/* Footer */}
        <div className="p-2 border-t border-border">
          <motion.button
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-foreground 
                     hover:bg-destructive/10 hover:text-destructive transition-all font-medium ${
                       isCollapsed ? "justify-center" : ""
                     }`}
            title={isCollapsed ? "Logout" : undefined}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              whileHover={{ rotate: -15 }}
              transition={{ duration: 0.2 }}
            >
              <LogOut className="w-5 h-5" />
            </motion.div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.aside>
    </>
  )
}
