/**
 * @file layout.tsx
 * @module components/dashboard
 * @description Dashboard layout with integrated dual-header, sidebar, bottom bar, and feature panels
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Sidebar } from "./sidebar"
import { Topbar } from "./topbar"
import { BottomBar } from "./bottom-bar"
import { CommandPalette } from "./command-palette"
import { ModuleFeaturePanel } from "./module-feature-panel"
import { ChatListPanel } from "./chat/chat-list-panel"
import { ChatThreadPanel } from "./chat/chat-thread-panel"
import { useChat } from "@/lib/chat-context"
import { motion } from "framer-motion"

interface DashboardLayoutProps {
  children: React.ReactNode
  forceChatOpen?: boolean
}

export function DashboardLayout({ children, forceChatOpen }: DashboardLayoutProps) {
  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  
  // Feature panel state
  const [isFeaturePanelOpen, setIsFeaturePanelOpen] = useState(false)
  
  // Command palette state
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  
  // Chat state
  const { isChatOpen, setChatOpen, selectedChat } = useChat()
  
  // Screen size detection
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const showChatPanel = forceChatOpen || isChatOpen
  const showMainContent = !isSmallScreen || !showChatPanel

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Enhanced Sidebar */}
      <Sidebar
        isOpen={isSidebarOpen}
        isCollapsed={isSidebarCollapsed}
        onToggle={setIsSidebarOpen}
        onCollapse={setIsSidebarCollapsed}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dual-Stacked Header */}
        <Topbar
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onToggleChat={() => setChatOpen(!showChatPanel)}
          onToggleFeaturePanel={() => setIsFeaturePanelOpen(!isFeaturePanelOpen)}
          onSearchOpen={() => setIsCommandPaletteOpen(true)}
        />

        {/* Content Area - Multi-column layout */}
        <motion.div
          className="flex-1 flex overflow-hidden gap-0 relative"
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
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-background pb-16">
              <motion.div
                className="p-6 md:p-8 max-w-7xl mx-auto w-full"
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

        {/* Bottom Slide Bar */}
        <BottomBar onCommandPaletteOpen={() => setIsCommandPaletteOpen(true)} />
      </div>

      {/* Command Palette Modal */}
      <CommandPalette
        open={isCommandPaletteOpen}
        onOpenChange={setIsCommandPaletteOpen}
      />

      {/* Module Feature Panel (Sheet) */}
      <ModuleFeaturePanel
        open={isFeaturePanelOpen}
        onOpenChange={setIsFeaturePanelOpen}
      />
    </div>
  )
}
