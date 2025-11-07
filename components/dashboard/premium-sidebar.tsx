/**
 * @file premium-sidebar.tsx
 * @module components/dashboard
 * @description Enhanced premium sidebar with gradient, project card, grouped modules, and rich animations
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  BarChart3,
  FolderKanban,
  Layers,
  PlusCircle,
  CheckSquare,
  AlertCircle,
  Users,
  UserPlus,
  FileText,
  FolderOpen,
  DollarSign,
  CreditCard,
  Calendar,
  CalendarDays,
  Target,
  TrendingUp,
  Settings,
  Cog,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  HardDrive,
  HelpCircle,
  Sparkles,
  Building2,
  Gauge,
  Zap,
} from "lucide-react"
import { staggerContainer, staggerItem } from "@/lib/animations"

interface PremiumSidebarProps {
  isOpen: boolean
  isCollapsed: boolean
  onToggle: (open: boolean) => void
  onCollapse: (collapsed: boolean) => void
}

// Module groups configuration
const moduleGroups = [
  {
    id: "overview",
    label: "Overview",
    icon: Gauge,
    items: [
      { id: "dashboard", label: "Dashboard", icon: Home, href: "/", badge: null },
      { id: "analytics", label: "Analytics", icon: BarChart3, href: "/analytics", badge: null },
    ],
  },
  {
    id: "projects",
    label: "Projects",
    icon: FolderKanban,
    items: [
      { id: "all-projects", label: "All Projects", icon: Layers, href: "/projects", badge: 12 },
      { id: "active-projects", label: "Active", icon: Zap, href: "/projects/active", badge: 8 },
      { id: "planning", label: "Planning", icon: PlusCircle, href: "/projects/planning", badge: 4 },
    ],
  },
  {
    id: "tasks",
    label: "Tasks & Issues",
    icon: CheckSquare,
    items: [
      { id: "my-tasks", label: "My Tasks", icon: CheckSquare, href: "/tasks", badge: 15 },
      { id: "issues", label: "Issues", icon: AlertCircle, href: "/tasks/issues", badge: 3 },
    ],
  },
  {
    id: "team",
    label: "Team & Resources",
    icon: Users,
    items: [
      { id: "team-members", label: "Team Members", icon: Users, href: "/team", badge: 24 },
      { id: "resources", label: "Resources", icon: UserPlus, href: "/team/resources", badge: null },
    ],
  },
  {
    id: "documents",
    label: "Documents & Files",
    icon: FileText,
    items: [
      { id: "all-docs", label: "All Documents", icon: FileText, href: "/documents", badge: null },
      { id: "folders", label: "Folders", icon: FolderOpen, href: "/documents/folders", badge: null },
    ],
  },
  {
    id: "budget",
    label: "Budget & Finance",
    icon: DollarSign,
    items: [
      { id: "budget-overview", label: "Overview", icon: DollarSign, href: "/budget", badge: null },
      { id: "invoices", label: "Invoices", icon: CreditCard, href: "/budget/invoices", badge: 5 },
    ],
  },
  {
    id: "schedule",
    label: "Schedule & Calendar",
    icon: Calendar,
    items: [
      { id: "calendar", label: "Calendar", icon: Calendar, href: "/schedule", badge: null },
      { id: "milestones", label: "Milestones", icon: CalendarDays, href: "/schedule/milestones", badge: 7 },
    ],
  },
  {
    id: "goals",
    label: "Goals & KPIs",
    icon: Target,
    items: [
      { id: "goals", label: "Goals", icon: Target, href: "/goals", badge: null },
      { id: "kpis", label: "KPIs", icon: TrendingUp, href: "/goals/kpis", badge: null },
    ],
  },
  {
    id: "settings",
    label: "Settings",
    icon: Settings,
    items: [
      { id: "general", label: "General", icon: Settings, href: "/settings", badge: null },
      { id: "advanced", label: "Advanced", icon: Cog, href: "/settings/advanced", badge: null },
    ],
  },
]

// Current project data
const currentProject = {
  id: "1",
  name: "Downtown Office Complex",
  progress: 67,
  status: "active",
  team: 24,
  budget: "$12.5M",
}

export function PremiumSidebar({ isOpen, isCollapsed, onToggle, onCollapse }: PremiumSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [expandedGroups, setExpandedGroups] = useState<string[]>(["overview", "projects"])

  const toggleGroup = (groupId: string) => {
    if (expandedGroups.includes(groupId)) {
      setExpandedGroups(expandedGroups.filter((id) => id !== groupId))
    } else {
      setExpandedGroups([...expandedGroups, groupId])
    }
  }

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/"
    return pathname?.startsWith(href)
  }

  // Storage usage (mock data)
  const storageUsed = 42
  const storageTotal = 100

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          className="relative h-full border-r border-border flex flex-col overflow-hidden"
          style={{
            background: "linear-gradient(180deg, hsl(var(--card)) 0%, hsl(var(--card)/0.95) 100%)",
            boxShadow: "2px 0 12px hsl(var(--primary) / 0.05)",
          }}
          initial={{ x: -300, opacity: 0 }}
          animate={{
            x: 0,
            opacity: 1,
            width: isCollapsed ? "72px" : "280px",
          }}
          exit={{ x: -300, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          {/* Gradient Glow Border */}
          <div className="absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary/0 via-primary/30 to-primary/0" />

          {/* Project Switcher Card */}
          {!isCollapsed && (
            <motion.div
              className="p-4 border-b border-border bg-gradient-to-br from-primary/5 to-accent/5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-start gap-3 p-3 bg-card rounded-lg hover:bg-accent/5 transition-colors cursor-pointer border border-border/50">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center text-white font-bold shadow-md">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary to-primary-hover opacity-0"
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  {/* Progress Ring */}
                  <svg className="absolute -inset-1 w-12 h-12" style={{ transform: "rotate(-90deg)" }}>
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="hsl(var(--border))"
                      strokeWidth="2"
                    />
                    <circle
                      cx="24"
                      cy="24"
                      r="22"
                      fill="none"
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeDasharray={`${2 * Math.PI * 22}`}
                      strokeDashoffset={`${2 * Math.PI * 22 * (1 - currentProject.progress / 100)}`}
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {currentProject.name}
                    </p>
                    <ChevronDown className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {currentProject.team}
                    </span>
                    <span>•</span>
                    <span className="font-semibold text-primary">{currentProject.progress}%</span>
                  </div>
                  <Badge variant="secondary" className="mt-1.5 text-[10px] capitalize">
                    {currentProject.status}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}

          {/* Collapsed Mini Icon */}
          {isCollapsed && (
            <motion.div
              className="p-4 border-b border-border flex justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-hover rounded-lg flex items-center justify-center text-white shadow-md relative">
                <Building2 className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 h-4 min-w-4 flex items-center justify-center text-[9px] px-1">
                  {currentProject.progress}
                </Badge>
              </div>
            </motion.div>
          )}

          {/* Navigation */}
          <motion.nav
            className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent p-3 space-y-1"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {moduleGroups.map((group, groupIndex) => {
              const isExpanded = expandedGroups.includes(group.id)
              const GroupIcon = group.icon

              return (
                <motion.div key={group.id} variants={staggerItem} custom={groupIndex}>
                  {/* Group Header */}
                  <motion.button
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                      isCollapsed ? "justify-center" : ""
                    } hover:bg-accent/10 group`}
                    onClick={() => !isCollapsed && toggleGroup(group.id)}
                    whileHover={{ x: isCollapsed ? 0 : 2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`relative ${isCollapsed ? "" : ""}`}>
                      <GroupIcon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      {isCollapsed && group.items.some((item) => item.badge) && (
                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full" />
                      )}
                    </div>
                    {!isCollapsed && (
                      <>
                        <span className="flex-1 text-xs font-semibold text-muted-foreground group-hover:text-foreground text-left uppercase tracking-wide">
                          {group.label}
                        </span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 text-muted-foreground transition-transform ${
                            isExpanded ? "rotate-90" : ""
                          }`}
                        />
                      </>
                    )}
                  </motion.button>

                  {/* Group Items */}
                  {!isCollapsed && (
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          className="ml-4 mt-1 space-y-0.5"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {group.items.map((item) => {
                            const ItemIcon = item.icon
                            const active = isActive(item.href)

                            return (
                              <motion.button
                                key={item.id}
                                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-all relative group ${
                                  active
                                    ? "bg-gradient-to-r from-primary/10 to-accent/10 text-primary font-medium"
                                    : "text-foreground hover:bg-accent/10"
                                }`}
                                onClick={() => router.push(item.href)}
                                whileHover={{ x: 2, scale: 1.01 }}
                                whileTap={{ scale: 0.98 }}
                              >
                                {active && (
                                  <motion.div
                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary to-accent rounded-r-full"
                                    layoutId="activeNav"
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  />
                                )}
                                <ItemIcon
                                  className={`w-4 h-4 ${
                                    active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                                  }`}
                                />
                                <span className="flex-1 text-sm text-left">{item.label}</span>
                                {item.badge && (
                                  <Badge
                                    variant={active ? "default" : "secondary"}
                                    className="h-5 min-w-5 flex items-center justify-center text-[10px] px-1.5"
                                  >
                                    {item.badge}
                                  </Badge>
                                )}
                              </motion.button>
                            )
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}

                  {/* Collapsed Tooltip */}
                  {isCollapsed && (
                    <div className="relative group">
                      <div className="absolute left-full top-0 ml-2 hidden group-hover:block z-50">
                        <motion.div
                          className="bg-card border border-border rounded-lg shadow-xl p-2 min-w-[180px]"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                        >
                          <p className="text-xs font-semibold mb-2 text-foreground">{group.label}</p>
                          <div className="space-y-1">
                            {group.items.map((item) => (
                              <button
                                key={item.id}
                                className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-foreground hover:bg-accent/10 rounded transition-colors text-left"
                                onClick={() => router.push(item.href)}
                              >
                                <item.icon className="w-3.5 h-3.5" />
                                {item.label}
                                {item.badge && (
                                  <Badge variant="secondary" className="ml-auto h-4 text-[9px] px-1">
                                    {item.badge}
                                  </Badge>
                                )}
                              </button>
                            ))}
                          </div>
                        </motion.div>
                      </div>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </motion.nav>

          {/* Bottom Section */}
          <div className="border-t border-border p-3 space-y-3">
            {/* Storage Indicator */}
            {!isCollapsed && (
              <motion.div
                className="p-3 bg-muted/30 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs font-medium text-foreground">Storage</span>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {storageUsed}GB / {storageTotal}GB
                  </span>
                </div>
                <Progress value={storageUsed} className="h-1.5" />
                <p className="text-[10px] text-muted-foreground mt-1.5">
                  {storageTotal - storageUsed}GB available
                </p>
              </motion.div>
            )}

            {/* Action Buttons */}
            <div className={`flex gap-2 ${isCollapsed ? "flex-col" : ""}`}>
              {isCollapsed ? (
                <>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-accent/10 transition-colors flex items-center justify-center"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <HelpCircle className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-accent/10 transition-colors flex items-center justify-center"
                    onClick={() => onCollapse(false)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" className="flex-1 h-8 text-xs gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5" />
                    Help
                  </Button>
                  <motion.button
                    className="p-2 rounded-lg hover:bg-accent/10 transition-colors"
                    onClick={() => onCollapse(true)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft className="w-4 h-4 text-muted-foreground" />
                  </motion.button>
                </>
              )}
            </div>

            {/* Pro Badge */}
            {!isCollapsed && (
              <motion.div
                className="p-2.5 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  <Badge variant="default" className="text-[9px] px-1.5 py-0">PRO</Badge>
                </div>
                <p className="text-[10px] text-foreground font-medium mb-0.5">Premium Features</p>
                <p className="text-[9px] text-muted-foreground">Unlock advanced tools & analytics</p>
              </motion.div>
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  )
}

