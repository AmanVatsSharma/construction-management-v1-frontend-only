/**
 * @file context-sidebar.tsx
 * @module components/dashboard
 * @description Context-aware right sidebar that adapts content based on current module
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  X,
  Filter,
  Calendar,
  DollarSign,
  MapPin,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  FileText,
  TrendingUp,
  TrendingDown,
  Activity,
  MessageSquare,
  Video,
  Share2,
  Upload,
  Download,
  PlusCircle,
  Gauge,
  Target,
  Zap,
} from "lucide-react"

interface ContextSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function ContextSidebar({ isOpen, onClose }: ContextSidebarProps) {
  const pathname = usePathname()

  // Determine current module
  const getCurrentModule = () => {
    if (pathname === "/" || pathname === "/dashboard") return "dashboard"
    if (pathname?.startsWith("/projects")) return "projects"
    if (pathname?.startsWith("/tasks")) return "tasks"
    if (pathname?.startsWith("/team")) return "team"
    if (pathname?.startsWith("/documents")) return "documents"
    if (pathname?.startsWith("/chat")) return "chat"
    return "dashboard"
  }

  const currentModule = getCurrentModule()

  // Render content based on module
  const renderModuleContent = () => {
    switch (currentModule) {
      case "projects":
        return <ProjectsContext />
      case "tasks":
        return <TasksContext />
      case "team":
        return <TeamContext />
      case "documents":
        return <DocumentsContext />
      case "chat":
        return <ChatContext />
      default:
        return <DashboardContext />
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.aside
            className="fixed lg:relative right-0 top-0 h-full w-[320px] bg-card/95 backdrop-blur-xl border-l border-border z-50 flex flex-col shadow-xl"
            initial={{ x: 320, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 320, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold text-foreground">Filters & Actions</h3>
              </div>
              <motion.button
                className="p-1.5 rounded-lg hover:bg-accent/10 transition-colors"
                onClick={onClose}
                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent p-4">
              {renderModuleContent()}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

// Dashboard Context
function DashboardContext() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Activity className="w-4 h-4 text-primary" />
          Quick Stats
        </h4>
        <div className="space-y-2">
          <StatCard label="Active Projects" value="8" trend="up" />
          <StatCard label="Pending Tasks" value="24" trend="down" />
          <StatCard label="Team Members" value="24" trend="up" />
        </div>
      </div>
      <Separator />
      <div>
        <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <PlusCircle className="w-4 h-4" />
            New Project
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Create Task
          </Button>
        </div>
      </div>
    </div>
  )
}

// Projects Context
function ProjectsContext() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Status Filter</h4>
        <div className="space-y-2">
          <FilterCheckbox label="Active" count={8} />
          <FilterCheckbox label="Planning" count={4} />
          <FilterCheckbox label="On Hold" count={2} />
          <FilterCheckbox label="Completed" count={12} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Budget Range</h4>
        <div className="space-y-2">
          <Input type="number" placeholder="Min" className="h-8" />
          <Input type="number" placeholder="Max" className="h-8" />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Location</h4>
        <Input placeholder="Search locations..." className="h-8" />
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Gauge className="w-4 h-4 text-primary" />
          Project Insights
        </h4>
        <div className="space-y-3">
          <InsightCard
            label="Health Score"
            value="87%"
            icon={Activity}
            color="text-accent"
          />
          <InsightCard
            label="Budget Variance"
            value="+2.3%"
            icon={DollarSign}
            color="text-primary"
          />
          <InsightCard
            label="Schedule Status"
            value="On Track"
            icon={Clock}
            color="text-accent"
          />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="default" size="sm" className="w-full justify-start gap-2">
            <PlusCircle className="w-4 h-4" />
            New Project
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Upload className="w-4 h-4" />
            Import Project
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Download className="w-4 h-4" />
            Export Filtered
          </Button>
        </div>
      </div>
    </div>
  )
}

// Tasks Context
function TasksContext() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">My Tasks Summary</h4>
        <div className="space-y-2">
          <TaskSummaryCard label="Due Today" count={5} color="bg-destructive/10 text-destructive" icon={Clock} />
          <TaskSummaryCard label="Overdue" count={3} color="bg-destructive/10 text-destructive" icon={AlertCircle} />
          <TaskSummaryCard label="Assigned to Me" count={15} color="bg-primary/10 text-primary" icon={CheckCircle2} />
          <TaskSummaryCard label="Waiting on Others" count={7} color="bg-secondary/10 text-secondary-foreground" icon={Clock} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Quick Create</h4>
        <div className="space-y-3">
          <Input placeholder="Task title..." className="h-8" />
          <div className="grid grid-cols-2 gap-2">
            <select className="h-8 rounded-md border border-border bg-background px-2 text-xs">
              <option>Priority</option>
              <option>High</option>
              <option>Medium</option>
              <option>Low</option>
            </select>
            <select className="h-8 rounded-md border border-border bg-background px-2 text-xs">
              <option>Assignee</option>
              <option>John Doe</option>
              <option>Jane Smith</option>
            </select>
          </div>
          <Button size="sm" className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            Create Task
          </Button>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Priority Filter</h4>
        <div className="space-y-2">
          <FilterCheckbox label="High Priority" count={8} />
          <FilterCheckbox label="Medium Priority" count={12} />
          <FilterCheckbox label="Low Priority" count={6} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Status Filter</h4>
        <div className="space-y-2">
          <FilterCheckbox label="To Do" count={10} />
          <FilterCheckbox label="In Progress" count={8} />
          <FilterCheckbox label="In Review" count={4} />
          <FilterCheckbox label="Done" count={15} />
        </div>
      </div>
    </div>
  )
}

// Team Context
function TeamContext() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Team Members</h4>
        <div className="space-y-2">
          <TeamMemberCard name="Sarah Chen" role="Project Manager" status="online" />
          <TeamMemberCard name="Mike Johnson" role="Developer" status="busy" />
          <TeamMemberCard name="Emma Wilson" role="Designer" status="offline" />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Role Filter</h4>
        <div className="space-y-2">
          <FilterCheckbox label="Project Managers" count={3} />
          <FilterCheckbox label="Developers" count={8} />
          <FilterCheckbox label="Designers" count={4} />
          <FilterCheckbox label="QA Engineers" count={3} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="default" size="sm" className="w-full justify-start gap-2">
            <PlusCircle className="w-4 h-4" />
            Add Member
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <MessageSquare className="w-4 h-4" />
            Send Message
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Video className="w-4 h-4" />
            Start Meeting
          </Button>
        </div>
      </div>
    </div>
  )
}

// Documents Context
function DocumentsContext() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Recent Files</h4>
        <div className="space-y-2">
          <FileCard name="Project Plan.pdf" time="2h ago" />
          <FileCard name="Budget Report.xlsx" time="5h ago" />
          <FileCard name="Design Mockups.fig" time="1d ago" />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Quick Upload</h4>
        <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors cursor-pointer">
          <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-xs text-muted-foreground">Drag & drop or click to upload</p>
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">File Type Filter</h4>
        <div className="space-y-2">
          <FilterCheckbox label="Documents" count={24} />
          <FilterCheckbox label="Images" count={18} />
          <FilterCheckbox label="Videos" count={5} />
          <FilterCheckbox label="Other" count={12} />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <PlusCircle className="w-4 h-4" />
            New Folder
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Share2 className="w-4 h-4" />
            Share Selected
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Download className="w-4 h-4" />
            Download Selected
          </Button>
        </div>
      </div>
    </div>
  )
}

// Chat Context
function ChatContext() {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold mb-3">Active Conversations</h4>
        <div className="space-y-2">
          <ConversationCard name="Project Team" unread={5} time="5m ago" />
          <ConversationCard name="Sarah Chen" unread={2} time="1h ago" />
          <ConversationCard name="Design Review" unread={0} time="2h ago" />
        </div>
      </div>

      <Separator />

      <div>
        <h4 className="text-sm font-semibold mb-3">Quick Actions</h4>
        <div className="space-y-2">
          <Button variant="default" size="sm" className="w-full justify-start gap-2">
            <MessageSquare className="w-4 h-4" />
            New Chat
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Video className="w-4 h-4" />
            Start Video Call
          </Button>
          <Button variant="outline" size="sm" className="w-full justify-start gap-2">
            <Share2 className="w-4 h-4" />
            Share Screen
          </Button>
        </div>
      </div>
    </div>
  )
}

// Helper Components
function StatCard({ label, value, trend }: { label: string; value: string; trend: "up" | "down" }) {
  return (
    <div className="p-3 bg-muted/30 rounded-lg flex items-center justify-between">
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-lg font-bold text-foreground">{value}</p>
      </div>
      {trend === "up" ? (
        <TrendingUp className="w-4 h-4 text-accent" />
      ) : (
        <TrendingDown className="w-4 h-4 text-destructive" />
      )}
    </div>
  )
}

function FilterCheckbox({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg hover:bg-accent/5 cursor-pointer">
      <div className="flex items-center gap-2">
        <Checkbox id={label} />
        <Label htmlFor={label} className="text-sm cursor-pointer">
          {label}
        </Label>
      </div>
      <Badge variant="secondary" className="h-5 text-[10px] px-1.5">
        {count}
      </Badge>
    </div>
  )
}

function InsightCard({ label, value, icon: Icon, color }: any) {
  return (
    <div className="p-3 bg-muted/30 rounded-lg flex items-center gap-3">
      <div className={`w-8 h-8 bg-accent/10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold text-foreground">{value}</p>
      </div>
    </div>
  )
}

function TaskSummaryCard({ label, count, color, icon: Icon }: any) {
  return (
    <div className={`p-3 rounded-lg flex items-center gap-3 ${color}`}>
      <div className="w-8 h-8 bg-background/50 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs font-medium">{label}</p>
        <p className="text-lg font-bold">{count}</p>
      </div>
    </div>
  )
}

function TeamMemberCard({ name, role, status }: { name: string; role: string; status: string }) {
  const statusColors = {
    online: "bg-accent",
    busy: "bg-destructive",
    offline: "bg-muted-foreground",
  }

  return (
    <div className="p-2 rounded-lg hover:bg-accent/5 cursor-pointer flex items-center gap-2">
      <div className="relative">
        <Avatar className="w-8 h-8">
          <AvatarFallback className="text-xs bg-gradient-to-br from-primary to-primary-hover text-white">
            {name.split(" ").map(n => n[0]).join("")}
          </AvatarFallback>
        </Avatar>
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 ${statusColors[status as keyof typeof statusColors]} border-2 border-card rounded-full`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{role}</p>
      </div>
    </div>
  )
}

function FileCard({ name, time }: { name: string; time: string }) {
  return (
    <div className="p-2 rounded-lg hover:bg-accent/5 cursor-pointer flex items-center gap-2">
      <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
        <FileText className="w-4 h-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-foreground truncate">{name}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  )
}

function ConversationCard({ name, unread, time }: { name: string; unread: number; time: string }) {
  return (
    <div className={`p-2 rounded-lg hover:bg-accent/5 cursor-pointer ${unread > 0 ? "bg-primary/5" : ""}`}>
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-medium text-foreground">{name}</p>
        {unread > 0 && (
          <Badge variant="default" className="h-4 min-w-4 text-[9px] px-1">
            {unread}
          </Badge>
        )}
      </div>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  )
}

