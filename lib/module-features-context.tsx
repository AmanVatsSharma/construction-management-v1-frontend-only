/**
 * @file module-features-context.tsx
 * @module lib
 * @description Context to manage module feature panel state and available actions
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"

export interface ModuleFeature {
  id: string
  label: string
  type: "action" | "filter" | "setting"
  icon?: React.ComponentType<{ className?: string }>
  action?: () => void
}

interface ModuleFeatureContextType {
  isOpen: boolean
  currentModule: string | null
  features: ModuleFeature[]
  setIsOpen: (open: boolean) => void
  setCurrentModule: (module: string | null) => void
  setFeatures: (features: ModuleFeature[]) => void
  togglePanel: () => void
}

const ModuleFeatureContext = React.createContext<ModuleFeatureContextType | undefined>(undefined)

export function ModuleFeatureProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [currentModule, setCurrentModule] = React.useState<string | null>(null)
  const [features, setFeatures] = React.useState<ModuleFeature[]>([])

  const togglePanel = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <ModuleFeatureContext.Provider
      value={{
        isOpen,
        currentModule,
        features,
        setIsOpen,
        setCurrentModule,
        setFeatures,
        togglePanel,
      }}
    >
      {children}
    </ModuleFeatureContext.Provider>
  )
}

export function useModuleFeature() {
  const context = React.useContext(ModuleFeatureContext)
  if (!context) {
    throw new Error("useModuleFeature must be used within ModuleFeatureProvider")
  }
  return context
}

