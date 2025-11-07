/**
 * @file topbar-primary.tsx
 * @module components/dashboard
 * @description Top header with branding, project switcher, and user profile menu
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import { Logo } from "@/components/logo"
import { ChevronDown, User, Settings, LogOut, Bell } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { menuVariants } from "@/lib/animations"
import { useRouter } from "next/navigation"

interface Project {
  id: string
  name: string
  status: "active" | "planning" | "completed"
}

const SAMPLE_PROJECTS: Project[] = [
  { id: "1", name: "Downtown Tower Phase 2", status: "active" },
  { id: "2", name: "Metro Station Renovation", status: "active" },
  { id: "3", name: "Office Complex Expansion", status: "planning" },
  { id: "4", name: "Harbor Bridge Retrofit", status: "completed" },
]

export function TopbarPrimary() {
  const router = useRouter()
  const [showProjectMenu, setShowProjectMenu] = React.useState(false)
  const [showUserMenu, setShowUserMenu] = React.useState(false)
  const [currentProject, setCurrentProject] = React.useState(SAMPLE_PROJECTS[0])

  // Close menus when clicking outside
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowProjectMenu(false)
      setShowUserMenu(false)
    }
    
    if (showProjectMenu || showUserMenu) {
      document.addEventListener("click", handleClickOutside)
      return () => document.removeEventListener("click", handleClickOutside)
    }
  }, [showProjectMenu, showUserMenu])

  const handleProjectChange = (project: Project) => {
    setCurrentProject(project)
    setShowProjectMenu(false)
  }

  const getStatusColor = (status: Project["status"]) => {
    switch (status) {
      case "active":
        return "bg-accent text-accent-foreground"
      case "planning":
        return "bg-secondary text-secondary-foreground"
      case "completed":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 relative">
      {/* Left: Logo & Branding */}
      <motion.div
        className="flex items-center gap-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center flex-shrink-0 shadow-md hover-lift">
          <Logo size={24} strokeColor="white" />
        </div>
        <div className="hidden md:block">
          <h1 className="text-lg font-bold text-foreground font-heading leading-tight">
            Novologic
          </h1>
          <p className="text-xs text-muted-foreground leading-tight">
            Construction Management
          </p>
        </div>
        <div className="hidden md:block w-px h-8 bg-border ml-2" />
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-primary/10 rounded-full border border-primary/20">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
          <span className="text-xs font-medium text-primary">v0.1 Beta</span>
        </div>
      </motion.div>

      {/* Center: Project Switcher */}
      <motion.div
        className="flex-1 max-w-md mx-4"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowProjectMenu(!showProjectMenu)
              setShowUserMenu(false)
            }}
            className="w-full px-4 py-2.5 bg-muted/50 hover:bg-muted border border-border rounded-lg
                     flex items-center justify-between gap-3 transition-all group"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse flex-shrink-0" />
              <div className="text-left flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">
                  {currentProject.name}
                </p>
                <p className="text-xs text-muted-foreground">Current Project</p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: showProjectMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </button>

          {/* Project Dropdown Menu */}
          <AnimatePresence>
            {showProjectMenu && (
              <motion.div
                variants={menuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-full mt-2 left-0 right-0 bg-card border border-border rounded-lg shadow-lg
                         overflow-hidden z-50 max-h-80 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-2">
                  <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                    Select Project
                  </div>
                  {SAMPLE_PROJECTS.map((project) => (
                    <button
                      key={project.id}
                      onClick={() => handleProjectChange(project)}
                      className={`w-full px-3 py-2.5 rounded-lg text-left transition-colors
                                flex items-center justify-between gap-3 group
                                ${currentProject.id === project.id
                                  ? "bg-primary/10 text-primary"
                                  : "hover:bg-muted text-foreground"
                                }`}
                    >
                      <span className="font-medium truncate">{project.name}</span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(project.status)}`}
                      >
                        {project.status}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="border-t border-border p-2">
                  <button
                    onClick={() => {
                      router.push("/select-project")
                      setShowProjectMenu(false)
                    }}
                    className="w-full px-3 py-2 text-sm text-primary hover:bg-primary/10 rounded-lg
                             transition-colors font-medium text-center"
                  >
                    View All Projects
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Right: User Menu */}
      <motion.div
        className="flex items-center gap-2"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        {/* Notifications */}
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors relative group"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={(e) => {
              e.stopPropagation()
              setShowUserMenu(!showUserMenu)
              setShowProjectMenu(false)
            }}
            className="flex items-center gap-2 pl-2 pr-3 py-2 rounded-lg hover:bg-muted
                     transition-all border border-transparent hover:border-border group"
          >
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-primary-foreground" />
            </div>
            <div className="hidden md:block text-left">
              <p className="text-sm font-semibold text-foreground">John Doe</p>
              <p className="text-xs text-muted-foreground">Administrator</p>
            </div>
            <motion.div
              animate={{ rotate: showUserMenu ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="hidden md:block"
            >
              <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </motion.div>
          </button>

          {/* User Dropdown Menu */}
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                variants={menuVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute top-full mt-2 right-0 w-64 bg-card border border-border rounded-lg
                         shadow-lg overflow-hidden z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-4 border-b border-border">
                  <p className="text-sm font-semibold text-foreground">John Doe</p>
                  <p className="text-xs text-muted-foreground">john.doe@novologic.com</p>
                  <p className="text-xs text-muted-foreground mt-1">Administrator</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      router.push("/settings")
                      setShowUserMenu(false)
                    }}
                    className="w-full px-3 py-2 rounded-lg text-left transition-colors
                             hover:bg-muted text-foreground flex items-center gap-3"
                  >
                    <Settings className="w-4 h-4" />
                    <span className="text-sm">Settings</span>
                  </button>
                  <button
                    className="w-full px-3 py-2 rounded-lg text-left transition-colors
                             hover:bg-muted text-foreground flex items-center gap-3"
                  >
                    <User className="w-4 h-4" />
                    <span className="text-sm">Profile</span>
                  </button>
                </div>
                <div className="border-t border-border p-2">
                  <button
                    className="w-full px-3 py-2 rounded-lg text-left transition-colors
                             hover:bg-destructive/10 text-destructive flex items-center gap-3"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}

