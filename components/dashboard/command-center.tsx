/**
 * @file command-center.tsx
 * @module components/dashboard
 * @description Enhanced bottom bar command center with quick launch panel and utilities
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Activity,
  Wifi,
  RefreshCw,
  Users,
  Zap,
  MessageSquare,
  Video,
  Mic,
  Mail,
  Megaphone,
  PlusCircle,
  CheckSquare,
  FileText,
  Calendar,
  Target,
  BarChart3,
  Search,
  Calculator,
  TrendingUp,
  Map,
  Clock,
  Star,
  Palette,
  Smartphone,
  Keyboard,
  HelpCircle,
  BellOff,
  Bell,
  Sun,
  Moon,
  HardHat,
  Sparkles,
} from "lucide-react"

interface CommandCenterProps {
  onCommandPaletteOpen?: () => void
}

export function CommandCenter({ onCommandPaletteOpen }: CommandCenterProps) {
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)
  const [doNotDisturb, setDoNotDisturb] = useState(false)

  // Mock data
  const activeUsers = 24
  const lastSync = "2m ago"

  // Quick launch categories
  const communicationActions = [
    { icon: MessageSquare, label: "Start Chat", action: () => router.push("/chat") },
    { icon: Video, label: "Video Call", action: () => {} },
    { icon: Mic, label: "Voice Memo", action: () => {} },
    { icon: Mail, label: "Email", action: () => {} },
    { icon: Megaphone, label: "Announcement", action: () => {} },
  ]

  const createActions = [
    { icon: PlusCircle, label: "New Project", action: () => router.push("/projects/new") },
    { icon: CheckSquare, label: "New Task", action: () => router.push("/tasks/new") },
    { icon: FileText, label: "New Document", action: () => router.push("/documents/new") },
    { icon: Calendar, label: "Schedule Meeting", action: () => {} },
    { icon: Target, label: "Set Goal", action: () => {} },
  ]

  const toolsActions = [
    { icon: BarChart3, label: "Generate Report", action: () => {} },
    { icon: Search, label: "Advanced Search", action: onCommandPaletteOpen },
    { icon: Calculator, label: "Calculator", action: () => {} },
    { icon: TrendingUp, label: "Quick Chart", action: () => {} },
    { icon: Map, label: "Site Map", action: () => {} },
  ]

  const shortcutsActions = [
    { icon: Clock, label: "Recent Items", action: () => {} },
    { icon: Star, label: "Starred", action: () => {} },
    { icon: Zap, label: "Frequently Used", action: () => {} },
    { icon: Sparkles, label: "Custom Shortcuts", action: () => {} },
  ]

  const cycleTheme = () => {
    const themes = ["theme-blueprint", "theme-dark", "theme-construction"]
    const currentIndex = themes.indexOf(theme || "theme-blueprint")
    const nextTheme = themes[(currentIndex + 1) % themes.length]
    setTheme(nextTheme)
  }

  const getThemeIcon = () => {
    switch (theme) {
      case "theme-dark":
        return Moon
      case "theme-construction":
        return HardHat
      default:
        return Sun
    }
  }

  const ThemeIcon = getThemeIcon()

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      {/* Quick Launch Panel (Slides up on hover) */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            className="absolute bottom-full left-0 right-0 mb-2 bg-card/95 backdrop-blur-xl border border-border rounded-t-xl shadow-2xl overflow-hidden"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              maxHeight: "400px",
              boxShadow: "0 -8px 32px hsl(var(--primary) / 0.15)",
            }}
          >
            <div className="grid grid-cols-4 gap-6 p-6">
              {/* Communication */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5" />
                  Communication
                </h4>
                <div className="space-y-1">
                  {communicationActions.map((action, index) => (
                    <QuickActionButton key={index} {...action} />
                  ))}
                </div>
              </div>

              {/* Create */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <PlusCircle className="w-3.5 h-3.5" />
                  Create
                </h4>
                <div className="space-y-1">
                  {createActions.map((action, index) => (
                    <QuickActionButton key={index} {...action} />
                  ))}
                </div>
              </div>

              {/* Tools */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Zap className="w-3.5 h-3.5" />
                  Tools
                </h4>
                <div className="space-y-1">
                  {toolsActions.map((action, index) => (
                    <QuickActionButton key={index} {...action} />
                  ))}
                </div>
              </div>

              {/* Shortcuts */}
              <div>
                <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 flex items-center gap-2">
                  <Star className="w-3.5 h-3.5" />
                  Shortcuts
                </h4>
                <div className="space-y-1">
                  {shortcutsActions.map((action, index) => (
                    <QuickActionButton key={index} {...action} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Bar */}
      <motion.div
        className="h-12 bg-card/90 backdrop-blur-xl border-t border-border flex items-center justify-between px-6 gap-4"
        style={{
          boxShadow: "0 -2px 16px hsl(var(--primary) / 0.08)",
        }}
      >
        {/* LEFT - System Status */}
        <div className="flex items-center gap-4">
          {/* Online Indicator */}
          <div className="flex items-center gap-2 px-2.5 py-1.5 bg-accent/10 rounded-full">
            <motion.div
              className="relative w-2 h-2"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="absolute inset-0 bg-accent rounded-full" />
              <motion.div
                className="absolute inset-0 bg-accent rounded-full"
                animate={{ scale: [1, 1.5, 2], opacity: [1, 0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="text-xs font-medium text-accent">Online</span>
          </div>

          {/* Sync Status */}
          <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <RefreshCw className="w-3.5 h-3.5" />
            </motion.div>
            <span>Synced {lastSync}</span>
          </div>

          {/* Active Users */}
          <div
            className="hidden lg:flex items-center gap-2 px-2.5 py-1.5 bg-primary/5 rounded-lg cursor-pointer hover:bg-primary/10 transition-colors group relative"
          >
            <Users className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-foreground">{activeUsers} active</span>
            
            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
              <div className="bg-card border border-border rounded-lg shadow-xl p-2 min-w-[120px]">
                <p className="text-xs font-semibold mb-1">Active Users</p>
                <p className="text-[10px] text-muted-foreground">24 team members online</p>
              </div>
            </div>
          </div>
        </div>

        {/* CENTER - Quick Launch Trigger */}
        <div className="flex items-center gap-2">
          <motion.div
            className="flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg cursor-pointer hover:from-primary/20 hover:to-accent/20 transition-colors"
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
          >
            <Zap className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-foreground hidden sm:inline">Quick Launch</span>
            <Badge variant="secondary" className="text-[9px] h-4 px-1.5 hidden md:flex">
              Hover
            </Badge>
          </motion.div>

          <Separator orientation="vertical" className="h-6 hidden md:block" />

          {/* Quick Actions */}
          <div className="hidden md:flex items-center gap-1">
            <QuickButton icon={MessageSquare} label="Chat" onClick={() => router.push("/chat")} badge={5} />
            <QuickButton icon={Video} label="Meet" onClick={() => {}} />
            <QuickButton icon={Search} label="Search" onClick={onCommandPaletteOpen} />
          </div>
        </div>

        {/* RIGHT - Utilities */}
        <div className="flex items-center gap-2">
          {/* Theme Switcher */}
          <motion.button
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors relative group"
            onClick={cycleTheme}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ThemeIcon className="w-4 h-4 text-muted-foreground" />
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
              <div className="bg-card border border-border rounded-lg shadow-xl p-2 whitespace-nowrap">
                <p className="text-xs">Switch Theme</p>
              </div>
            </div>
          </motion.button>

          {/* Mobile App QR */}
          <motion.button
            className="hidden lg:block p-2 rounded-lg hover:bg-accent/10 transition-colors relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Smartphone className="w-4 h-4 text-muted-foreground" />
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
              <div className="bg-card border border-border rounded-lg shadow-xl p-2 whitespace-nowrap">
                <p className="text-xs">Mobile App</p>
              </div>
            </div>
          </motion.button>

          {/* Keyboard Shortcuts */}
          <motion.button
            className="hidden md:block p-2 rounded-lg hover:bg-accent/10 transition-colors relative group"
            onClick={onCommandPaletteOpen}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Keyboard className="w-4 h-4 text-muted-foreground" />
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
              <div className="bg-card border border-border rounded-lg shadow-xl p-2 whitespace-nowrap">
                <p className="text-xs">Shortcuts (⌘K)</p>
              </div>
            </div>
          </motion.button>

          {/* Help */}
          <motion.button
            className="p-2 rounded-lg hover:bg-accent/10 transition-colors relative group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <HelpCircle className="w-4 h-4 text-muted-foreground" />
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
              <div className="bg-card border border-border rounded-lg shadow-xl p-2 whitespace-nowrap">
                <p className="text-xs">Help & Support</p>
              </div>
            </div>
          </motion.button>

          {/* Do Not Disturb */}
          <motion.button
            className={`p-2 rounded-lg transition-colors relative group ${
              doNotDisturb ? "bg-destructive/10" : "hover:bg-accent/10"
            }`}
            onClick={() => setDoNotDisturb(!doNotDisturb)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {doNotDisturb ? (
              <BellOff className="w-4 h-4 text-destructive" />
            ) : (
              <Bell className="w-4 h-4 text-muted-foreground" />
            )}
            <div className="absolute bottom-full right-0 mb-2 hidden group-hover:block z-10">
              <div className="bg-card border border-border rounded-lg shadow-xl p-2 whitespace-nowrap">
                <p className="text-xs">{doNotDisturb ? "Enable" : "Disable"} Notifications</p>
              </div>
            </div>
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
}

// Quick Action Button Component
function QuickActionButton({ icon: Icon, label, action }: any) {
  return (
    <motion.button
      className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors text-left"
      onClick={action}
      whileHover={{ x: 2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <Icon className="w-4 h-4 text-muted-foreground" />
      {label}
    </motion.button>
  )
}

// Quick Button Component
function QuickButton({ icon: Icon, label, onClick, badge }: any) {
  return (
    <motion.button
      className="relative p-2 rounded-lg hover:bg-accent/10 transition-colors group"
      onClick={onClick}
      whileHover={{ scale: 1.05, y: -1 }}
      whileTap={{ scale: 0.95 }}
    >
      <Icon className="w-4 h-4 text-muted-foreground" />
      {badge && (
        <Badge className="absolute -top-1 -right-1 h-4 min-w-4 text-[9px] px-1">
          {badge}
        </Badge>
      )}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-10">
        <div className="bg-card border border-border rounded-lg shadow-xl px-2 py-1 whitespace-nowrap">
          <p className="text-xs">{label}</p>
        </div>
      </div>
    </motion.button>
  )
}

