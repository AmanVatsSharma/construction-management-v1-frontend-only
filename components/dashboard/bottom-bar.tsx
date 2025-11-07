/**
 * @file bottom-bar.tsx
 * @module components/dashboard
 * @description Bottom slide bar with quick actions, recent items, and command palette trigger
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import {
  Plus,
  FileText,
  Calendar,
  DollarSign,
  Users,
  Command,
  ChevronUp,
  ChevronDown,
  Clock,
  TrendingUp,
  CheckCircle2,
  AlertCircle,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { slideInFromBottom } from "@/lib/animations"

interface QuickAction {
  id: string
  label: string
  icon: React.ElementType
  color: string
  action: () => void
}

interface RecentItem {
  id: string
  title: string
  type: string
  timestamp: string
  status: "active" | "completed" | "pending"
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: "new-project",
    label: "New Project",
    icon: Plus,
    color: "text-primary",
    action: () => console.log("New Project"),
  },
  {
    id: "new-task",
    label: "New Task",
    icon: CheckCircle2,
    color: "text-accent",
    action: () => console.log("New Task"),
  },
  {
    id: "quick-report",
    label: "Quick Report",
    icon: FileText,
    color: "text-secondary",
    action: () => console.log("Quick Report"),
  },
  {
    id: "schedule",
    label: "Schedule",
    icon: Calendar,
    color: "text-blue-500",
    action: () => console.log("Schedule"),
  },
  {
    id: "budget",
    label: "Budget",
    icon: DollarSign,
    color: "text-green-500",
    action: () => console.log("Budget"),
  },
  {
    id: "team",
    label: "Team",
    icon: Users,
    color: "text-purple-500",
    action: () => console.log("Team"),
  },
]

const RECENT_ITEMS: RecentItem[] = [
  {
    id: "1",
    title: "Downtown Tower Phase 2",
    type: "Project",
    timestamp: "2 hours ago",
    status: "active",
  },
  {
    id: "2",
    title: "Budget Review Meeting",
    type: "Task",
    timestamp: "4 hours ago",
    status: "completed",
  },
  {
    id: "3",
    title: "Site Inspection Report",
    type: "Report",
    timestamp: "Yesterday",
    status: "pending",
  },
]

interface BottomBarProps {
  onCommandPaletteOpen?: () => void
}

export function BottomBar({ onCommandPaletteOpen }: BottomBarProps) {
  const [isExpanded, setIsExpanded] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const getStatusIcon = (status: RecentItem["status"]) => {
    switch (status) {
      case "active":
        return <TrendingUp className="w-3 h-3" />
      case "completed":
        return <CheckCircle2 className="w-3 h-3" />
      case "pending":
        return <AlertCircle className="w-3 h-3" />
    }
  }

  const getStatusColor = (status: RecentItem["status"]) => {
    switch (status) {
      case "active":
        return "text-accent bg-accent/10"
      case "completed":
        return "text-green-500 bg-green-500/10"
      case "pending":
        return "text-secondary bg-secondary/10"
    }
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 z-30"
      initial="initial"
      animate={isHovered || isExpanded ? "animate" : "initial"}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <AnimatePresence>
        {(isExpanded || isHovered) && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="bg-card/95 backdrop-blur-md border-t border-border shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-6 py-4">
              {/* Quick Actions Grid */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Plus className="w-4 h-4 text-primary" />
                    Quick Actions
                  </h3>
                  <span className="text-xs text-muted-foreground">
                    {QUICK_ACTIONS.length} actions
                  </span>
                </div>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {QUICK_ACTIONS.map((action, index) => {
                    const Icon = action.icon
                    return (
                      <motion.button
                        key={action.id}
                        onClick={action.action}
                        className="flex flex-col items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted
                                 border border-border hover:border-primary/50 transition-all group"
                        whileHover={{ scale: 1.05, y: -4 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <div
                          className={`w-10 h-10 rounded-lg bg-background border border-border
                                   flex items-center justify-center group-hover:border-primary/50 transition-colors`}
                        >
                          <Icon className={`w-5 h-5 ${action.color} group-hover:scale-110 transition-transform`} />
                        </div>
                        <span className="text-xs font-medium text-foreground group-hover:text-primary transition-colors text-center">
                          {action.label}
                        </span>
                      </motion.button>
                    )
                  })}
                </div>
              </div>

              {/* Recent Items */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    Recent Activity
                  </h3>
                  <button className="text-xs text-primary hover:underline">View All</button>
                </div>
                <div className="flex gap-3 overflow-x-auto scrollbar-thin pb-2">
                  {RECENT_ITEMS.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="flex items-center gap-3 min-w-[280px] p-3 rounded-lg bg-muted/50
                               border border-border hover:border-primary/50 transition-all cursor-pointer group"
                      whileHover={{ scale: 1.02, y: -2 }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center ${getStatusColor(
                          item.status
                        )}`}
                      >
                        {getStatusIcon(item.status)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                          {item.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>{item.type}</span>
                          <span>•</span>
                          <span>{item.timestamp}</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Bar Trigger */}
      <div className="bg-card/95 backdrop-blur-md border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
          {/* Left: Status Indicators */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
              <span className="text-xs text-muted-foreground hidden md:inline">
                System Active
              </span>
            </div>
            <div className="hidden md:flex items-center gap-2 text-xs text-muted-foreground">
              <TrendingUp className="w-3 h-3" />
              <span>3 active projects</span>
            </div>
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>Last sync: 2 min ago</span>
            </div>
          </div>

          {/* Center: Command Palette Trigger */}
          <motion.button
            onClick={onCommandPaletteOpen}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-hover
                     text-primary-foreground rounded-lg shadow-md hover:shadow-lg transition-all group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Command className="w-4 h-4" />
            <span className="text-sm font-medium hidden md:inline">Command Palette</span>
            <kbd className="hidden lg:flex items-center gap-1 px-2 py-0.5 text-xs bg-primary-foreground/20
                         border border-primary-foreground/30 rounded">
              <span>⌘</span>
              <span>K</span>
            </kbd>
          </motion.button>

          {/* Right: Expand/Collapse Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 px-3 py-2 hover:bg-muted rounded-lg transition-colors group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-xs font-medium text-foreground hidden md:inline">
              {isExpanded ? "Hide" : "Quick Actions"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              ) : (
                <ChevronUp className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              )}
            </motion.div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  )
}

