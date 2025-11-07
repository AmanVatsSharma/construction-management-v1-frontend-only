/**
 * @file premium-layout.tsx
 * @module components/dashboard
 * @description Premium dashboard layout with all enhanced components integrated
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { PremiumHeader } from "./premium-header"
import { ContextHeader } from "./context-header"
import { PremiumSidebar } from "./premium-sidebar"
import { ContextSidebar } from "./context-sidebar"
import { CommandCenter } from "./command-center"
import { CommandPalette } from "./command-palette"
import { ChatListPanel } from "./chat/chat-list-panel"
import { ChatThreadPanel } from "./chat/chat-thread-panel"
import { useChat } from "@/lib/chat-context"
import { motion } from "framer-motion"

interface PremiumLayoutProps {
  children: React.ReactNode
  forceChatOpen?: boolean
}

export function PremiumLayout({ children, forceChatOpen }: PremiumLayoutProps) {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  // Context sidebar state (right sidebar)
  const [isContextSidebarOpen, setIsContextSidebarOpen] = useState(false)
  
  // Command palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  
  // Chat state
  const { isChatOpen, setChatOpen, selectedChat } = useChat()
  
  // Screen size detection
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
      if (window.innerWidth < 1024) {
        setIsSidebarCollapsed(true)
        setIsContextSidebarOpen(false)
      }
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K for command palette
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsCommandPaletteOpen(true)
      }
      // Cmd/Ctrl + B for sidebar toggle
      if ((e.metaKey || e.ctrlKey) && e.key === "b") {
        e.preventDefault()
        setIsSidebarCollapsed(!isSidebarCollapsed)
      }
      // Cmd/Ctrl + Shift + F for context sidebar toggle
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === "f") {
        e.preventDefault()
        setIsContextSidebarOpen(!isContextSidebarOpen)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isSidebarCollapsed, isContextSidebarOpen])

  const showChatPanel = forceChatOpen || isChatOpen
  const showMainContent = !isSmallScreen || !showChatPanel

  return (
    <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
      {/* Premium Header - Full Width at Top */}
      <PremiumHeader
        onSearchOpen={() => setIsCommandPaletteOpen(true)}
        onToggleChat={() => setChatOpen(!showChatPanel)}
      />

      {/* Context Header - Secondary Navigation */}
      <ContextHeader onToggleFeaturePanel={() => setIsContextSidebarOpen(!isContextSidebarOpen)} />

      {/* Content Area Below Headers */}
      <div className="flex flex-1 overflow-hidden">
        {/* Premium Sidebar - Left Navigation */}
        <PremiumSidebar
          isOpen={isSidebarOpen}
          isCollapsed={isSidebarCollapsed}
          onToggle={setIsSidebarOpen}
          onCollapse={setIsSidebarCollapsed}
        />

        {/* Main Content Area with Chat */}
        <div className="flex-1 flex overflow-hidden relative">
          {/* Content Area - Multi-column layout */}
          <motion.div
            className="flex-1 flex overflow-hidden gap-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {/* Chat List Panel */}
            {showChatPanel && !isSmallScreen && (
              <ChatListPanel
                onChatSelect={() => {
                  // Chat selection handled in context
                }}
              />
            )}

            {/* Main Content Panel */}
            {showMainContent && (
              <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background">
                <motion.div
                  className="p-6 md:p-8 max-w-7xl mx-auto w-full pb-20"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                >
                  {children}
                </motion.div>
              </div>
            )}

            {/* Chat Thread Panel */}
            {showChatPanel && selectedChat && (
              <ChatThreadPanel
                onClose={() => setChatOpen(false)}
                onBackMobile={() => {
                  if (isSmallScreen) setChatOpen(false)
                }}
              />
            )}
          </motion.div>

          {/* Context-Aware Right Sidebar */}
          <ContextSidebar
            isOpen={isContextSidebarOpen}
            onClose={() => setIsContextSidebarOpen(false)}
          />
        </div>
      </div>

      {/* Command Center - Bottom Bar */}
      <CommandCenter onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />

      {/* Command Palette Modal */}
      <CommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
      />
    </div>
  )
}

