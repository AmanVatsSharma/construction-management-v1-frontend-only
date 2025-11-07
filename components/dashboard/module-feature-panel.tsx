/**
 * @file module-feature-panel.tsx
 * @module components/dashboard
 * @description Sheet-based module feature sidebar with per-module contextual actions and filters
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  Filter,
  SortAsc,
  Plus,
  Download,
  Upload,
  Search,
  Calendar,
  Tag,
  Users,
  FileText,
  Settings,
  X,
} from "lucide-react"
import { motion } from "framer-motion"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"

interface ModuleFeaturePanelProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

// Module-specific feature configurations
const MODULE_FEATURES: Record<string, any> = {
  projects: {
    title: "Project Filters & Actions",
    description: "Filter and manage your projects",
    filters: [
      { id: "status", label: "Status", type: "select", options: ["All", "Active", "Planning", "Completed"] },
      { id: "priority", label: "Priority", type: "select", options: ["All", "High", "Medium", "Low"] },
      { id: "team", label: "Team", type: "select", options: ["All Teams", "Team A", "Team B"] },
    ],
    actions: [
      { id: "new-project", label: "New Project", icon: Plus, color: "primary" },
      { id: "export", label: "Export Projects", icon: Download, color: "secondary" },
      { id: "templates", label: "Project Templates", icon: FileText, color: "accent" },
    ],
  },
  tasks: {
    title: "Task Filters & Actions",
    description: "Filter and manage your tasks",
    filters: [
      { id: "status", label: "Status", type: "select", options: ["All", "Todo", "In Progress", "Done"] },
      { id: "assignee", label: "Assignee", type: "select", options: ["All", "Me", "Team"] },
      { id: "priority", label: "Priority", type: "select", options: ["All", "High", "Medium", "Low"] },
      { id: "due-date", label: "Due Date", type: "date" },
    ],
    actions: [
      { id: "new-task", label: "New Task", icon: Plus, color: "primary" },
      { id: "bulk-assign", label: "Bulk Assign", icon: Users, color: "secondary" },
      { id: "export-tasks", label: "Export Tasks", icon: Download, color: "accent" },
    ],
  },
  reports: {
    title: "Report Options",
    description: "Generate and export reports",
    filters: [
      { id: "date-range", label: "Date Range", type: "date-range" },
      { id: "report-type", label: "Report Type", type: "select", options: ["All", "Progress", "Financial", "Site Diary"] },
      { id: "format", label: "Export Format", type: "select", options: ["PDF", "Excel", "CSV"] },
    ],
    actions: [
      { id: "generate", label: "Generate Report", icon: FileText, color: "primary" },
      { id: "schedule", label: "Schedule Report", icon: Calendar, color: "secondary" },
      { id: "templates", label: "Report Templates", icon: Settings, color: "accent" },
    ],
  },
  "site-diary": {
    title: "Site Diary Filters",
    description: "Filter site diary entries",
    filters: [
      { id: "date", label: "Date", type: "date" },
      { id: "weather", label: "Weather", type: "select", options: ["All", "Sunny", "Cloudy", "Rainy"] },
      { id: "activity", label: "Activity Type", type: "select", options: ["All", "Construction", "Inspection", "Meeting"] },
    ],
    actions: [
      { id: "new-entry", label: "New Entry", icon: Plus, color: "primary" },
      { id: "export", label: "Export Diary", icon: Download, color: "secondary" },
    ],
  },
  budget: {
    title: "Budget Filters & Tools",
    description: "Manage budget and costs",
    filters: [
      { id: "category", label: "Cost Category", type: "select", options: ["All", "Labor", "Materials", "Equipment"] },
      { id: "status", label: "Status", type: "select", options: ["All", "Planned", "Actual", "Variance"] },
      { id: "date-range", label: "Date Range", type: "date-range" },
    ],
    actions: [
      { id: "new-line-item", label: "Add Line Item", icon: Plus, color: "primary" },
      { id: "compare", label: "Compare Budgets", icon: SortAsc, color: "secondary" },
      { id: "export", label: "Export Budget", icon: Download, color: "accent" },
    ],
  },
  documents: {
    title: "Document Filters",
    description: "Filter and organize documents",
    filters: [
      { id: "file-type", label: "File Type", type: "select", options: ["All", "PDF", "Word", "Excel", "Images"] },
      { id: "folder", label: "Folder", type: "select", options: ["All Folders", "Contracts", "Drawings", "Reports"] },
      { id: "date", label: "Upload Date", type: "date-range" },
    ],
    actions: [
      { id: "upload", label: "Upload Files", icon: Upload, color: "primary" },
      { id: "new-folder", label: "New Folder", icon: Plus, color: "secondary" },
      { id: "bulk-download", label: "Bulk Download", icon: Download, color: "accent" },
    ],
  },
  rfi: {
    title: "RFI Filters",
    description: "Filter RFIs and submittals",
    filters: [
      { id: "status", label: "Status", type: "select", options: ["All", "Open", "Pending", "Closed"] },
      { id: "priority", label: "Priority", type: "select", options: ["All", "High", "Medium", "Low"] },
      { id: "type", label: "Type", type: "select", options: ["All", "RFI", "Submittal"] },
    ],
    actions: [
      { id: "new-rfi", label: "New RFI", icon: Plus, color: "primary" },
      { id: "templates", label: "RFI Templates", icon: FileText, color: "secondary" },
      { id: "export", label: "Export RFIs", icon: Download, color: "accent" },
    ],
  },
  risk: {
    title: "Risk Filters",
    description: "Filter and manage risks",
    filters: [
      { id: "severity", label: "Severity", type: "select", options: ["All", "Critical", "High", "Medium", "Low"] },
      { id: "status", label: "Status", type: "select", options: ["All", "Active", "Mitigated", "Closed"] },
      { id: "category", label: "Category", type: "select", options: ["All", "Safety", "Schedule", "Budget"] },
    ],
    actions: [
      { id: "new-risk", label: "Add Risk", icon: Plus, color: "primary" },
      { id: "risk-matrix", label: "Risk Matrix", icon: Tag, color: "secondary" },
      { id: "export", label: "Export Risks", icon: Download, color: "accent" },
    ],
  },
}

export function ModuleFeaturePanel({ open, onOpenChange }: ModuleFeaturePanelProps) {
  const pathname = usePathname()
  const [searchQuery, setSearchQuery] = React.useState("")

  // Determine current module from pathname
  const currentModule = React.useMemo(() => {
    const segments = pathname.split("/").filter(Boolean)
    return segments[0] || "dashboard"
  }, [pathname])

  const moduleConfig = MODULE_FEATURES[currentModule] || {
    title: "Actions & Filters",
    description: "No specific actions available for this view",
    filters: [],
    actions: [],
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:w-96 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 text-xl">
            <Filter className="w-5 h-5 text-primary" />
            {moduleConfig.title}
          </SheetTitle>
          <SheetDescription>{moduleConfig.description}</SheetDescription>
        </SheetHeader>

        <div className="mt-6 space-y-6">
          {/* Quick Search */}
          {moduleConfig.filters.length > 0 && (
            <div className="space-y-2">
              <Label htmlFor="search" className="text-sm font-semibold">
                Quick Search
              </Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="search"
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
          )}

          {/* Filters */}
          {moduleConfig.filters.length > 0 && (
            <>
              <Separator />
              <div className="space-y-4">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Filter className="w-4 h-4 text-primary" />
                  Filters
                </h3>
                {moduleConfig.filters.map((filter: any) => (
                  <div key={filter.id} className="space-y-2">
                    <Label htmlFor={filter.id} className="text-sm">
                      {filter.label}
                    </Label>
                    {filter.type === "select" && (
                      <select
                        id={filter.id}
                        className="w-full px-3 py-2 bg-background border border-border rounded-lg 
                                 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                      >
                        {filter.options.map((option: string) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    )}
                    {filter.type === "date" && (
                      <Input id={filter.id} type="date" className="text-sm" />
                    )}
                    {filter.type === "date-range" && (
                      <div className="grid grid-cols-2 gap-2">
                        <Input type="date" placeholder="From" className="text-sm" />
                        <Input type="date" placeholder="To" className="text-sm" />
                      </div>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full mt-2">
                  <X className="w-4 h-4 mr-2" />
                  Clear All Filters
                </Button>
              </div>
            </>
          )}

          {/* Quick Actions */}
          {moduleConfig.actions.length > 0 && (
            <>
              <Separator />
              <div className="space-y-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Settings className="w-4 h-4 text-primary" />
                  Quick Actions
                </h3>
                <div className="grid gap-2">
                  {moduleConfig.actions.map((action: any) => {
                    const Icon = action.icon
                    return (
                      <motion.div
                        key={action.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="outline"
                          className="w-full justify-start gap-2"
                          onClick={() => console.log(`Action: ${action.id}`)}
                        >
                          <Icon className="w-4 h-4" />
                          {action.label}
                        </Button>
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </>
          )}

          {/* Settings */}
          <Separator />
          <div className="space-y-3">
            <h3 className="text-sm font-semibold">Display Settings</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="compact-view" className="text-sm">
                  Compact View
                </Label>
                <Switch id="compact-view" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="show-archived" className="text-sm">
                  Show Archived
                </Label>
                <Switch id="show-archived" />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="auto-refresh" className="text-sm">
                  Auto Refresh
                </Label>
                <Switch id="auto-refresh" defaultChecked />
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

