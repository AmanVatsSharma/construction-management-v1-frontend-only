/**
 * @file context-header.tsx
 * @module components/dashboard
 * @description Context-aware secondary header with dynamic toolbars based on current module
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import {
  Home,
  FolderKanban,
  CheckSquare,
  Users,
  FileText,
  DollarSign,
  Calendar,
  Target,
  Settings,
  Filter,
  SortAsc,
  Grid3x3,
  List,
  Download,
  Share2,
  Plus,
  Upload,
  HelpCircle,
  LayoutGrid,
  LayoutList,
  Kanban,
  ChevronRight,
  Clock,
  AlertCircle,
  TrendingUp,
} from "lucide-react"

interface ContextHeaderProps {
  onToggleFeaturePanel?: () => void
}

export function ContextHeader({ onToggleFeaturePanel }: ContextHeaderProps) {
  const pathname = usePathname()

  // Determine current module from pathname
  const getCurrentModule = () => {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard"
    if (pathname?.startsWith("/projects")) return "projects"
    if (pathname?.startsWith("/tasks")) return "tasks"
    if (pathname?.startsWith("/team")) return "team"
    if (pathname?.startsWith("/documents")) return "documents"
    if (pathname?.startsWith("/budget")) return "budget"
    if (pathname?.startsWith("/schedule")) return "schedule"
    if (pathname?.startsWith("/goals")) return "goals"
    if (pathname?.startsWith("/settings")) return "settings"
    return "dashboard"
  }

  const currentModule = getCurrentModule()

  // Module configurations
  const moduleConfig = {
    dashboard: {
      icon: Home,
      title: "Dashboard",
      breadcrumbs: ["Home", "Dashboard"],
      actions: [],
      toolbar: [],
    },
    projects: {
      icon: FolderKanban,
      title: "Projects",
      breadcrumbs: ["Home", "Projects"],
      actions: [
        { icon: Plus, label: "New Project", variant: "default" as const },
        { icon: Upload, label: "Import", variant: "outline" as const },
        { icon: Download, label: "Export", variant: "outline" as const },
      ],
      toolbar: [
        { icon: Filter, label: "Filter", action: "filter" },
        { icon: SortAsc, label: "Sort", action: "sort" },
        { icon: Grid3x3, label: "Grid View", action: "view-grid" },
        { icon: List, label: "List View", action: "view-list" },
        { icon: Calendar, label: "Gantt", action: "gantt" },
      ],
    },
    tasks: {
      icon: CheckSquare,
      title: "Tasks & Issues",
      breadcrumbs: ["Home", "Tasks"],
      actions: [
        { icon: Plus, label: "New Task", variant: "default" as const },
        { icon: Share2, label: "Assign", variant: "outline" as const },
      ],
      toolbar: [
        { icon: Filter, label: "Filter", action: "filter" },
        { icon: Kanban, label: "Kanban", action: "view-kanban" },
        { icon: List, label: "List", action: "view-list" },
        { icon: AlertCircle, label: "Priority", action: "priority" },
      ],
    },
    team: {
      icon: Users,
      title: "Team & Resources",
      breadcrumbs: ["Home", "Team"],
      actions: [
        { icon: Plus, label: "Add Member", variant: "default" as const },
        { icon: Download, label: "Export", variant: "outline" as const },
      ],
      toolbar: [
        { icon: Filter, label: "Filter", action: "filter" },
        { icon: Grid3x3, label: "Grid", action: "view-grid" },
        { icon: List, label: "List", action: "view-list" },
      ],
    },
    documents: {
      icon: FileText,
      title: "Documents & Files",
      breadcrumbs: ["Home", "Documents"],
      actions: [
        { icon: Upload, label: "Upload", variant: "default" as const },
        { icon: Plus, label: "New Folder", variant: "outline" as const },
        { icon: Share2, label: "Share", variant: "outline" as const },
      ],
      toolbar: [
        { icon: Filter, label: "Filter", action: "filter" },
        { icon: SortAsc, label: "Sort", action: "sort" },
        { icon: Grid3x3, label: "Grid", action: "view-grid" },
        { icon: List, label: "List", action: "view-list" },
        { icon: Clock, label: "Version", action: "version" },
      ],
    },
    budget: {
      icon: DollarSign,
      title: "Budget & Finance",
      breadcrumbs: ["Home", "Budget"],
      actions: [
        { icon: Plus, label: "New Entry", variant: "default" as const },
        { icon: Download, label: "Export", variant: "outline" as const },
      ],
      toolbar: [
        { icon: Filter, label: "Filter", action: "filter" },
        { icon: Calendar, label: "Period", action: "period" },
        { icon: TrendingUp, label: "Analytics", action: "analytics" },
      ],
    },
    schedule: {
      icon: Calendar,
      title: "Schedule & Calendar",
      breadcrumbs: ["Home", "Schedule"],
      actions: [
        { icon: Plus, label: "New Event", variant: "default" as const },
      ],
      toolbar: [
        { icon: Calendar, label: "Month", action: "view-month" },
        { icon: List, label: "Week", action: "view-week" },
        { icon: Grid3x3, label: "Day", action: "view-day" },
      ],
    },
    goals: {
      icon: Target,
      title: "Goals & KPIs",
      breadcrumbs: ["Home", "Goals"],
      actions: [
        { icon: Plus, label: "New Goal", variant: "default" as const },
      ],
      toolbar: [
        { icon: Filter, label: "Filter", action: "filter" },
        { icon: TrendingUp, label: "Progress", action: "progress" },
      ],
    },
    settings: {
      icon: Settings,
      title: "Settings",
      breadcrumbs: ["Home", "Settings"],
      actions: [],
      toolbar: [],
    },
  }

  const config = moduleConfig[currentModule as keyof typeof moduleConfig]
  const ModuleIcon = config.icon

  return (
    <motion.div
      className="h-14 bg-muted/30 border-b border-border flex items-center justify-between px-6 gap-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      {/* LEFT - Module Info & Breadcrumbs */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg flex items-center justify-center">
            <ModuleIcon className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground leading-none">{config.title}</h2>
            <div className="flex items-center gap-1 mt-0.5">
              {config.breadcrumbs.map((crumb, index) => (
                <div key={index} className="flex items-center gap-1">
                  {index > 0 && <ChevronRight className="w-3 h-3 text-muted-foreground" />}
                  <span className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors">
                    {crumb}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CENTER - Context-Aware Toolbar */}
      {config.toolbar.length > 0 && (
        <div className="hidden md:flex items-center gap-1 bg-background/50 rounded-lg p-1">
          {config.toolbar.map((tool, index) => (
            <motion.button
              key={index}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/10 rounded transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                if (tool.action === "filter" && onToggleFeaturePanel) {
                  onToggleFeaturePanel()
                }
              }}
            >
              <tool.icon className="w-3.5 h-3.5" />
              <span>{tool.label}</span>
            </motion.button>
          ))}
        </div>
      )}

      {/* RIGHT - Actions & Help */}
      <div className="flex items-center gap-2">
        {config.actions.map((action, index) => (
          <motion.div key={index} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button variant={action.variant} size="sm" className="h-8 gap-1.5">
              <action.icon className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{action.label}</span>
            </Button>
          </motion.div>
        ))}
        
        {config.actions.length > 0 && <div className="w-px h-6 bg-border" />}
        
        <motion.button
          className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <HelpCircle className="w-4 h-4 text-muted-foreground" />
        </motion.button>
      </div>
    </motion.div>
  )
}

