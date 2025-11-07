/**
 * @file theme-provider.tsx
 * @module lib
 * @description Enhanced theme provider with support for 3 themes (Blueprint, Z-Black Dark, Construction)
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export type Theme = "blueprint" | "dark" | "construction"

interface CustomThemeProviderProps extends Omit<ThemeProviderProps, "themes"> {
  children: React.ReactNode
}

export function ThemeProvider({ children, ...props }: CustomThemeProviderProps) {
  return (
    <NextThemesProvider
      {...props}
      themes={["blueprint", "dark", "construction"]}
      defaultTheme="blueprint"
      attribute="class"
      enableSystem={false}
      storageKey="novologic-theme"
    >
      {children}
    </NextThemesProvider>
  )
}

// Hook to get theme with better typing
export function useAppTheme() {
  const { theme, setTheme } = require("next-themes").useTheme()
  
  return {
    theme: theme as Theme,
    setTheme: (newTheme: Theme) => setTheme(newTheme),
  }
}

