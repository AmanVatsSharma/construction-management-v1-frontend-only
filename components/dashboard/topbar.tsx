/**
 * @file topbar.tsx
 * @module components/dashboard
 * @description Dual-stacked header wrapper with sticky positioning and shadow on scroll
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import { TopbarPrimary } from "./topbar-primary"
import { TopbarSecondary } from "./topbar-secondary"
import { motion } from "framer-motion"

interface TopbarProps {
  onToggleSidebar: () => void
  onToggleChat: () => void
  onToggleFeaturePanel?: () => void
  onSearchOpen?: () => void
}

export function Topbar({
  onToggleSidebar,
  onToggleChat,
  onToggleFeaturePanel,
  onSearchOpen,
}: TopbarProps) {
  const [isScrolled, setIsScrolled] = React.useState(false)

  // Detect scroll to add shadow
  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.header
      className={`sticky top-0 z-20 backdrop-blur-md bg-card/95 transition-shadow duration-300 ${
        isScrolled ? "shadow-md" : ""
      }`}
      initial={{ y: -32 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Top Header: Branding + Project Switcher + User Menu */}
      <TopbarPrimary />
      
      {/* Bottom Header: Breadcrumbs + Page Title + Actions */}
      <TopbarSecondary
        onToggleChat={onToggleChat}
        onToggleFeaturePanel={onToggleFeaturePanel}
        onSearchOpen={onSearchOpen}
      />
    </motion.header>
  )
}
