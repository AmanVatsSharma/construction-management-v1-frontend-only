/**
 * @file command-palette.tsx
 * @module components/dashboard
 * @description Command palette with keyboard shortcuts, search, and theme switcher integration
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import {
  Home,
  Settings,
  Search,
  Layers,
  Palette,
  Sun,
  Moon,
  HardHat,
  FileText,
  Calendar,
  DollarSign,
  Users,
  FolderOpen,
  AlertTriangle,
  CheckSquare,
  MessageSquare,
  Plus,
  Command as CommandIcon,
} from "lucide-react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command"

interface CommandPaletteProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CommandPalette({ open, onOpenChange }: CommandPaletteProps) {
  const router = useRouter()
  const { setTheme, theme } = useTheme()
  const [searchQuery, setSearchQuery] = React.useState("")

  // Keyboard shortcut: Cmd/Ctrl + K
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        onOpenChange(!open)
      }
    }

    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [open, onOpenChange])

  const handleNavigate = (path: string) => {
    router.push(path)
    onOpenChange(false)
  }

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme)
    onOpenChange(false)
  }

  const handleAction = (action: () => void) => {
    action()
    onOpenChange(false)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Type a command or search..."
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>

        {/* Navigation */}
        <CommandGroup heading="Navigation">
          <CommandItem onSelect={() => handleNavigate("/")}>
            <Home className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
            <kbd className="ml-auto text-xs text-muted-foreground">g + h</kbd>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/modules")}>
            <Layers className="mr-2 h-4 w-4" />
            <span>Modules</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/projects")}>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>Projects</span>
            <kbd className="ml-auto text-xs text-muted-foreground">g + p</kbd>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/tasks")}>
            <CheckSquare className="mr-2 h-4 w-4" />
            <span>Tasks</span>
            <kbd className="ml-auto text-xs text-muted-foreground">g + t</kbd>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/reports")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Reports</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/site-diary")}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Site Diary</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/budget")}>
            <DollarSign className="mr-2 h-4 w-4" />
            <span>Budget</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/documents")}>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>Documents</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/risk")}>
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>Risk Management</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/chat")}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Chat</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Quick Actions */}
        <CommandGroup heading="Quick Actions">
          <CommandItem onSelect={() => handleAction(() => console.log("New Project"))}>
            <Plus className="mr-2 h-4 w-4 text-primary" />
            <span>New Project</span>
          </CommandItem>
          <CommandItem onSelect={() => handleAction(() => console.log("New Task"))}>
            <Plus className="mr-2 h-4 w-4 text-accent" />
            <span>New Task</span>
          </CommandItem>
          <CommandItem onSelect={() => handleAction(() => console.log("Quick Report"))}>
            <FileText className="mr-2 h-4 w-4 text-secondary" />
            <span>Generate Quick Report</span>
          </CommandItem>
          <CommandItem onSelect={() => handleAction(() => console.log("Schedule Meeting"))}>
            <Calendar className="mr-2 h-4 w-4 text-blue-500" />
            <span>Schedule Meeting</span>
          </CommandItem>
          <CommandItem onSelect={() => handleAction(() => console.log("Add Team Member"))}>
            <Users className="mr-2 h-4 w-4 text-purple-500" />
            <span>Add Team Member</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Theme Switcher */}
        <CommandGroup heading="Theme">
          <CommandItem onSelect={() => handleThemeChange("blueprint")}>
            <Sun className="mr-2 h-4 w-4 text-primary" />
            <span>Blueprint Industrial</span>
            {theme === "blueprint" && (
              <CheckSquare className="ml-auto h-4 w-4 text-primary" />
            )}
          </CommandItem>
          <CommandItem onSelect={() => handleThemeChange("dark")}>
            <Moon className="mr-2 h-4 w-4 text-blue-500" />
            <span>Z-Black Modern</span>
            {theme === "dark" && (
              <CheckSquare className="ml-auto h-4 w-4 text-primary" />
            )}
          </CommandItem>
          <CommandItem onSelect={() => handleThemeChange("construction")}>
            <HardHat className="mr-2 h-4 w-4 text-yellow-500" />
            <span>Classic Construction</span>
            {theme === "construction" && (
              <CheckSquare className="ml-auto h-4 w-4 text-primary" />
            )}
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Recent */}
        <CommandGroup heading="Recent">
          <CommandItem onSelect={() => handleNavigate("/")}>
            <FolderOpen className="mr-2 h-4 w-4" />
            <span>Downtown Tower Phase 2</span>
            <span className="ml-auto text-xs text-muted-foreground">Project</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/")}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Budget Review Meeting</span>
            <span className="ml-auto text-xs text-muted-foreground">Task</span>
          </CommandItem>
          <CommandItem onSelect={() => handleNavigate("/")}>
            <Calendar className="mr-2 h-4 w-4" />
            <span>Site Inspection Report</span>
            <span className="ml-auto text-xs text-muted-foreground">Report</span>
          </CommandItem>
        </CommandGroup>

        <CommandSeparator />

        {/* Help */}
        <CommandGroup heading="Help">
          <CommandItem onSelect={() => handleAction(() => console.log("Documentation"))}>
            <FileText className="mr-2 h-4 w-4" />
            <span>Documentation</span>
          </CommandItem>
          <CommandItem onSelect={() => handleAction(() => console.log("Keyboard Shortcuts"))}>
            <CommandIcon className="mr-2 h-4 w-4" />
            <span>Keyboard Shortcuts</span>
          </CommandItem>
          <CommandItem onSelect={() => handleAction(() => console.log("Support"))}>
            <MessageSquare className="mr-2 h-4 w-4" />
            <span>Contact Support</span>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  )
}

