/**
 * @file premium-header.tsx
 * @module components/dashboard
 * @description Premium feature-rich header with branding, search, quick launch, and hover panels
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { useAuth } from "@/lib/auth-context"
import { useTheme } from "next-themes"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Search,
  FolderKanban,
  CheckSquare,
  FileText,
  Users,
  BarChart3,
  Target,
  Bell,
  MessageSquare,
  Video,
  Globe,
  Palette,
  Settings,
  User,
  Briefcase,
  Clock,
  LogOut,
  Zap,
  Activity,
  TrendingUp,
  ChevronDown,
  Star,
  Sparkles,
} from "lucide-react"

interface PremiumHeaderProps {
  onSearchOpen?: () => void
  onToggleChat?: () => void
}

export function PremiumHeader({ onSearchOpen, onToggleChat }: PremiumHeaderProps) {
  const router = useRouter()
  const { user, logout } = useAuth()
  const { theme, setTheme } = useTheme()
  
  // Hover panel states
  const [hoveredPanel, setHoveredPanel] = useState<string | null>(null)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  
  // Stats ticker
  const [currentStat, setCurrentStat] = useState(0)
  const stats = [
    { label: "Projects", value: "12", icon: FolderKanban },
    { label: "Tasks", value: "48", icon: CheckSquare },
    { label: "Team", value: "24", icon: Users },
    { label: "Progress", value: "67%", icon: TrendingUp },
  ]

  // Rotate stats ticker
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStat((prev) => (prev + 1) % stats.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // Quick launch items
  const quickLaunchItems = [
    { id: "projects", icon: FolderKanban, label: "Projects", badge: 12, color: "text-primary" },
    { id: "tasks", icon: CheckSquare, label: "Tasks", badge: 8, color: "text-accent" },
    { id: "documents", icon: FileText, label: "Documents", badge: null, color: "text-secondary" },
    { id: "team", icon: Users, label: "Team", badge: 24, color: "text-primary" },
    { id: "reports", icon: BarChart3, label: "Reports", badge: null, color: "text-accent" },
    { id: "goals", icon: Target, label: "Goals", badge: 3, color: "text-secondary" },
  ]

  // Notifications
  const notifications = [
    { id: 1, title: "New task assigned", time: "2m ago", type: "task", unread: true },
    { id: 2, title: "Project milestone reached", time: "1h ago", type: "project", unread: true },
    { id: 3, title: "Team meeting in 30 minutes", time: "3h ago", type: "meeting", unread: false },
  ]

  // Messages
  const messages = [
    { id: 1, name: "Sarah Chen", message: "Can you review the designs?", time: "5m ago", avatar: "SC", unread: true },
    { id: 2, name: "Project Team", message: "Meeting notes attached", time: "1h ago", avatar: "PT", unread: true },
    { id: 3, name: "Mike Johnson", message: "Thanks for the update!", time: "2h ago", avatar: "MJ", unread: false },
  ]

  const unreadNotifications = notifications.filter(n => n.unread).length
  const unreadMessages = messages.filter(m => m.unread).length

  return (
    <motion.header
      className="relative h-[72px] bg-card/80 backdrop-blur-xl border-b border-border/50 z-50"
      style={{
        background: "linear-gradient(to right, hsl(var(--card)) 0%, hsl(var(--card)/0.95) 100%)",
        boxShadow: "0 2px 8px -2px hsl(var(--primary) / 0.1), 0 0 0 1px hsl(var(--border) / 0.5)",
      }}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between h-full px-6 gap-6">
        
        {/* LEFT SECTION - Branding */}
        <div className="flex items-center gap-6">
          {/* Logo with Gradient Glow */}
          <motion.div
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => router.push("/")}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div
              className="w-11 h-11 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center shadow-lg relative"
              style={{
                boxShadow: "0 4px 14px hsl(var(--primary) / 0.4), 0 0 20px hsl(var(--primary) / 0.2)",
              }}
            >
              <Logo size={24} strokeColor="white" />
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary to-primary-hover opacity-0"
                animate={{ opacity: [0, 0.3, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-primary-hover bg-clip-text text-transparent font-heading">
                  Novologic
                </h1>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">PRO</Badge>
              </div>
              <p className="text-[11px] text-muted-foreground">Construction Management</p>
            </div>
          </motion.div>

          {/* Live Status Indicator */}
          <div className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full">
            <motion.div
              className="w-2 h-2 bg-accent rounded-full"
              animate={{ scale: [1, 1.2, 1], opacity: [1, 0.8, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="text-xs font-medium text-accent">System Online</span>
          </div>

          {/* Stats Ticker */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStat}
              className="hidden xl:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
            >
              {(() => {
                const StatIcon = stats[currentStat].icon
                return (
                  <>
                    <StatIcon className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs font-semibold text-foreground">{stats[currentStat].value}</span>
                    <span className="text-xs text-muted-foreground">{stats[currentStat].label}</span>
                  </>
                )
              })()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CENTER SECTION - Search & Quick Launch */}
        <div className="flex-1 max-w-2xl flex items-center gap-4">
          {/* Universal Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search projects, tasks, documents, people... (⌘K)"
              className="pl-9 pr-4 h-10 bg-background/50 border-border/50 focus:bg-background transition-colors"
              onClick={onSearchOpen}
              readOnly
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground bg-muted border border-border rounded">⌘K</kbd>
            </div>
          </div>

          {/* Quick Launch Icons */}
          <div className="hidden lg:flex items-center gap-1">
            {quickLaunchItems.map((item) => (
              <div
                key={item.id}
                className="relative"
                onMouseEnter={() => setHoveredPanel(item.id)}
                onMouseLeave={() => setHoveredPanel(null)}
              >
                <motion.button
                  className={`relative p-2 rounded-lg hover:bg-accent/10 transition-colors ${item.color}`}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.badge && (
                    <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center text-[9px] px-1">
                      {item.badge}
                    </Badge>
                  )}
                </motion.button>

                {/* Hover Panel */}
                <AnimatePresence>
                  {hoveredPanel === item.id && (
                    <motion.div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl p-3 z-50"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className="text-sm font-semibold mb-2 flex items-center gap-2">
                        <item.icon className="w-4 h-4" />
                        {item.label}
                      </h4>
                      <div className="space-y-1.5">
                        <div className="text-xs text-muted-foreground hover:text-foreground cursor-pointer p-1.5 rounded hover:bg-accent/10 transition-colors">
                          Recent {item.label}
                        </div>
                        <div className="text-xs text-muted-foreground hover:text-foreground cursor-pointer p-1.5 rounded hover:bg-accent/10 transition-colors flex items-center gap-1">
                          <Star className="w-3 h-3" />
                          Starred
                        </div>
                        <div className="text-xs text-muted-foreground hover:text-foreground cursor-pointer p-1.5 rounded hover:bg-accent/10 transition-colors">
                          View All
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SECTION - Feature Icons & User */}
        <div className="flex items-center gap-2">
          
          {/* Notifications */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredPanel("notifications")}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <motion.button
              className="relative p-2 rounded-lg hover:bg-accent/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bell className="w-5 h-5 text-foreground" />
              {unreadNotifications > 0 && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {unreadNotifications}
                </motion.div>
              )}
            </motion.button>

            {/* Notifications Panel */}
            <AnimatePresence>
              {hoveredPanel === "notifications" && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Notifications</h4>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">Mark all read</Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-border/50 hover:bg-accent/5 cursor-pointer transition-colors ${
                          notif.unread ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-start gap-2">
                          {notif.unread && <div className="w-2 h-2 bg-primary rounded-full mt-1.5" />}
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{notif.title}</p>
                            <p className="text-xs text-muted-foreground">{notif.time}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 bg-muted/30">
                    <Button variant="ghost" size="sm" className="w-full h-8 text-xs">
                      View All Notifications
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Messages */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredPanel("messages")}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <motion.button
              className="relative p-2 rounded-lg hover:bg-accent/10 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleChat}
            >
              <MessageSquare className="w-5 h-5 text-foreground" />
              {unreadMessages > 0 && (
                <motion.div
                  className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-accent rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {unreadMessages}
                </motion.div>
              )}
            </motion.button>

            {/* Messages Panel */}
            <AnimatePresence>
              {hoveredPanel === "messages" && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="p-4 border-b border-border flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Messages</h4>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">New Chat</Button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`p-3 border-b border-border/50 hover:bg-accent/5 cursor-pointer transition-colors ${
                          msg.unread ? "bg-primary/5" : ""
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <Avatar className="w-8 h-8">
                            <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-primary-hover text-white">
                              {msg.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-foreground">{msg.name}</p>
                              <span className="text-xs text-muted-foreground">{msg.time}</span>
                            </div>
                            <p className="text-xs text-muted-foreground truncate">{msg.message}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 bg-muted/30">
                    <Button variant="ghost" size="sm" className="w-full h-8 text-xs">
                      View All Messages
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Video Call */}
          <motion.button
            className="hidden md:block p-2 rounded-lg hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Video className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-border" />

          {/* Theme Switcher */}
          <motion.button
            className="hidden md:block p-2 rounded-lg hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const themes = ["theme-blueprint", "theme-dark", "theme-construction"]
              const currentIndex = themes.indexOf(theme || "theme-blueprint")
              const nextTheme = themes[(currentIndex + 1) % themes.length]
              setTheme(nextTheme)
            }}
          >
            <Palette className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Settings */}
          <motion.button
            className="hidden md:block p-2 rounded-lg hover:bg-accent/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push("/settings")}
          >
            <Settings className="w-5 h-5 text-foreground" />
          </motion.button>

          {/* Divider */}
          <div className="hidden md:block w-px h-6 bg-border" />

          {/* User Profile */}
          <div
            className="relative"
            onMouseEnter={() => setHoveredPanel("user")}
            onMouseLeave={() => setHoveredPanel(null)}
          >
            <motion.button
              className="flex items-center gap-2 p-1.5 pr-3 rounded-lg hover:bg-accent/10 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative">
                <Avatar className="w-9 h-9 border-2 border-primary/20">
                  <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-primary to-primary-hover text-white">
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <motion.div
                  className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-accent border-2 border-card rounded-full"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-sm font-semibold text-foreground leading-none">{user?.name}</p>
                <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
              </div>
              <ChevronDown className="hidden lg:block w-4 h-4 text-muted-foreground" />
            </motion.button>

            {/* User Menu */}
            <AnimatePresence>
              {hoveredPanel === "user" && (
                <motion.div
                  className="absolute top-full right-0 mt-2 w-64 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {/* User Info */}
                  <div className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-accent/5">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="w-12 h-12 border-2 border-primary/20">
                        <AvatarFallback className="text-base font-semibold bg-gradient-to-br from-primary to-primary-hover text-white">
                          {user?.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{user?.name}</p>
                        <p className="text-xs text-muted-foreground">{user?.email}</p>
                        <Badge variant="secondary" className="text-[10px] mt-1 capitalize">
                          {user?.role}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Menu Items */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                      <User className="w-4 h-4" />
                      View Profile
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                      <Briefcase className="w-4 h-4" />
                      My Work
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                      <Clock className="w-4 h-4" />
                      Time Tracking
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-accent/10 rounded-lg transition-colors">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                  </div>

                  {/* Logout */}
                  <div className="p-2 border-t border-border">
                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.header>
  )
}

