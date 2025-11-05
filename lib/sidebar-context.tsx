"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import {
  BarChart3,
  MessageSquare,
  CheckSquare,
  FileText,
  Calendar,
  DollarSign,
  AlertTriangle,
  FileCheck,
  Folder,
} from "lucide-react"

export interface SidebarModule {
  id: string
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

// All available modules that can be added to sidebar
export const AVAILABLE_MODULES: SidebarModule[] = [
  { id: "projects", label: "Projects", href: "/projects", icon: BarChart3 },
  { id: "chat", label: "Chat", href: "/chat", icon: MessageSquare },
  { id: "tasks", label: "Tasks", href: "/tasks", icon: CheckSquare },
  { id: "reports", label: "Reports", href: "/reports", icon: FileText },
  { id: "site-diary", label: "Site Diary", href: "/site-diary", icon: Calendar },
  { id: "budget", label: "Budget", href: "/budget", icon: DollarSign },
  { id: "rfi", label: "RFI & Submittals", href: "/rfi", icon: FileCheck },
  { id: "risk", label: "Risk", href: "/risk", icon: AlertTriangle },
  { id: "invoicing", label: "Invoicing", href: "/invoicing", icon: DollarSign },
  { id: "documents", label: "Documents", href: "/documents", icon: Folder },
]

const STORAGE_KEY = "novologic-sidebar-modules"

interface SidebarContextType {
  enabledModules: string[] // Array of module IDs
  toggleModule: (moduleId: string) => void
  isModuleEnabled: (moduleId: string) => boolean
  getEnabledModules: () => SidebarModule[]
  resetToDefaults: () => void
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined)

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [enabledModules, setEnabledModules] = useState<string[]>(() => {
    // Load from localStorage on mount
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          return JSON.parse(stored)
        } catch {
          return []
        }
      }
    }
    return []
  })

  // Save to localStorage whenever enabledModules changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(enabledModules))
    }
  }, [enabledModules])

  const toggleModule = (moduleId: string) => {
    setEnabledModules((prev) => {
      if (prev.includes(moduleId)) {
        return prev.filter((id) => id !== moduleId)
      } else {
        return [...prev, moduleId]
      }
    })
  }

  const isModuleEnabled = (moduleId: string) => {
    return enabledModules.includes(moduleId)
  }

  const getEnabledModules = (): SidebarModule[] => {
    return AVAILABLE_MODULES.filter((module) => enabledModules.includes(module.id))
  }

  const resetToDefaults = () => {
    setEnabledModules([])
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_KEY)
    }
  }

  return (
    <SidebarContext.Provider
      value={{
        enabledModules,
        toggleModule,
        isModuleEnabled,
        getEnabledModules,
        resetToDefaults,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebar() {
  const context = useContext(SidebarContext)
  if (context === undefined) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

