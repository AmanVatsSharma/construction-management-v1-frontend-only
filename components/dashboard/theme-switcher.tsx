/**
 * @file theme-switcher.tsx
 * @module components/dashboard
 * @description Theme switcher with visual preview cards for Blueprint, Z-Black Dark, and Construction themes
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { Check, Palette, Sun, Moon, HardHat } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { Label } from "@/components/ui/label"
import { scaleIn, staggerContainer, staggerItem } from "@/lib/animations"

export interface ThemeOption {
  id: string
  name: string
  description: string
  icon: React.ElementType
  previewColors: {
    primary: string
    secondary: string
    background: string
    accent: string
  }
}

const themes: ThemeOption[] = [
  {
    id: "theme-blueprint",
    name: "Blueprint Industrial",
    description: "Professional and clean - Modern blueprint theme",
    icon: Sun,
    previewColors: {
      primary: "#0f4c81",
      secondary: "#ffc107",
      background: "#ffffff",
      accent: "#2ecc71",
    },
  },
  {
    id: "theme-dark",
    name: "Z-Black Modern",
    description: "Ultra modern - Pure black with neon accents",
    icon: Moon,
    previewColors: {
      primary: "#3b82f6",
      secondary: "#8b5cf6",
      background: "#000000",
      accent: "#10b981",
    },
  },
  {
    id: "theme-construction",
    name: "Classic Construction",
    description: "Bold and industrial - Yellow and charcoal palette",
    icon: HardHat,
    previewColors: {
      primary: "#f59e0b",
      secondary: "#171717",
      background: "#fafaf9",
      accent: "#dc2626",
    },
  },
]

interface ThemeSwitcherProps {
  showLabels?: boolean
  variant?: "card" | "compact"
}

export function ThemeSwitcher({ showLabels = true, variant = "card" }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex gap-3">
        {themes.map((t) => (
          <div
            key={t.id}
            className="w-full h-24 bg-muted rounded-lg animate-pulse"
          />
        ))}
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className="flex items-center gap-2">
        <Palette className="w-4 h-4 text-muted-foreground" />
        <div className="flex gap-2">
          {themes.map((themeOption) => {
            const Icon = themeOption.icon
            const isActive = theme === themeOption.id

            return (
              <motion.button
                key={themeOption.id}
                onClick={() => setTheme(themeOption.id)}
                className={`relative p-2 rounded-lg border-2 transition-all ${
                  isActive
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                title={themeOption.name}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
                {isActive && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-2.5 h-2.5 text-primary-foreground" />
                  </motion.div>
                )}
              </motion.button>
            )
          })}
        </div>
      </div>
    )
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      className="space-y-4"
    >
      {showLabels && (
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-primary" />
          <Label className="text-base font-semibold text-foreground">Select Theme</Label>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {themes.map((themeOption) => {
          const Icon = themeOption.icon
          const isActive = theme === themeOption.id

          return (
            <motion.button
              key={themeOption.id}
              variants={staggerItem}
              onClick={() => setTheme(themeOption.id)}
              className={`relative group p-4 rounded-lg border-2 transition-all text-left ${
                isActive
                  ? "border-primary bg-primary/5 shadow-lg"
                  : "border-border hover:border-primary/50 hover:shadow-md"
              }`}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Check icon */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center"
                  >
                    <Check className="w-4 h-4 text-primary-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Theme icon */}
              <div
                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 transition-colors ${
                  isActive
                    ? "bg-primary"
                    : "bg-muted group-hover:bg-primary/10"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? "text-primary-foreground"
                      : "text-muted-foreground group-hover:text-primary"
                  }`}
                />
              </div>

              {/* Theme name and description */}
              <div className="space-y-1 mb-3">
                <h3
                  className={`font-semibold ${
                    isActive ? "text-primary" : "text-foreground"
                  }`}
                >
                  {themeOption.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {themeOption.description}
                </p>
              </div>

              {/* Color preview */}
              <div className="flex gap-2">
                <div
                  className="w-8 h-8 rounded border border-border/50"
                  style={{ backgroundColor: themeOption.previewColors.primary }}
                  title="Primary color"
                />
                <div
                  className="w-8 h-8 rounded border border-border/50"
                  style={{ backgroundColor: themeOption.previewColors.secondary }}
                  title="Secondary color"
                />
                <div
                  className="w-8 h-8 rounded border border-border/50"
                  style={{ backgroundColor: themeOption.previewColors.accent }}
                  title="Accent color"
                />
                <div
                  className="w-8 h-8 rounded border-2 border-border"
                  style={{ backgroundColor: themeOption.previewColors.background }}
                  title="Background color"
                />
              </div>

              {/* Active indicator line */}
              {isActive && (
                <motion.div
                  layoutId="activeTheme"
                  className="absolute bottom-0 left-0 right-0 h-1 bg-primary rounded-b-lg"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Current theme info */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-3 bg-muted/50 rounded-lg border border-border"
      >
        <p className="text-sm text-muted-foreground">
          Current theme:{" "}
          <span className="font-semibold text-foreground">
            {themes.find((t) => t.id === theme)?.name || "Blueprint Industrial"}
          </span>
        </p>
      </motion.div>
    </motion.div>
  )
}

