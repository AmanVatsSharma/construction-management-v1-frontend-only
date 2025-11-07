/**
 * @file topbar-secondary.tsx
 * @module components/dashboard
 * @description Bottom header with breadcrumbs, page title, search, and action buttons
 * @author BharatERP
 * @created 2025-11-07
 */

"use client"

import * as React from "react"
import {
  Home,
  ChevronRight,
  Search,
  MessageSquare,
  Plus,
  Filter,
  Download,
  MoreVertical,
} from "lucide-react"
import { motion } from "framer-motion"
import { fadeInUp } from "@/lib/animations"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface Breadcrumb {
  label: string
  href?: string
  icon?: React.ElementType
}

interface TopbarSecondaryProps {
  onToggleChat: () => void
  onToggleFeaturePanel?: () => void
  onSearchOpen?: () => void
}

// Map pathname to breadcrumbs
function generateBreadcrumbs(pathname: string): Breadcrumb[] {
  const segments = pathname.split("/").filter(Boolean)
  
  const breadcrumbs: Breadcrumb[] = [
    { label: "Dashboard", href: "/", icon: Home },
  ]

  if (segments.length === 0) return breadcrumbs

  // Map common routes
  const routeMap: Record<string, string> = {
    projects: "Projects",
    tasks: "Tasks",
    reports: "Reports",
    "site-diary": "Site Diary",
    budget: "Budget",
    documents: "Documents",
    rfi: "RFI & Submittals",
    risk: "Risk Management",
    invoicing: "Invoicing",
    settings: "Settings",
    modules: "Modules",
    chat: "Chat",
  }

  segments.forEach((segment, index) => {
    const label = routeMap[segment] || segment.charAt(0).toUpperCase() + segment.slice(1)
    const href = index === segments.length - 1 ? undefined : `/${segments.slice(0, index + 1).join("/")}`
    breadcrumbs.push({ label, href })
  })

  return breadcrumbs
}

// Get page title and icon from pathname
function getPageInfo(pathname: string): { title: string; subtitle?: string } {
  const routeInfo: Record<string, { title: string; subtitle?: string }> = {
    "/": { title: "Dashboard", subtitle: "Project overview and metrics" },
    "/projects": { title: "Projects", subtitle: "Manage construction projects" },
    "/tasks": { title: "Tasks", subtitle: "Track and assign work items" },
    "/reports": { title: "Reports", subtitle: "Generate and view reports" },
    "/site-diary": { title: "Site Diary", subtitle: "Daily site activities log" },
    "/budget": { title: "Budget", subtitle: "Financial management" },
    "/documents": { title: "Documents", subtitle: "File management system" },
    "/rfi": { title: "RFI & Submittals", subtitle: "Request for information tracking" },
    "/risk": { title: "Risk Management", subtitle: "Identify and mitigate risks" },
    "/invoicing": { title: "Invoicing", subtitle: "Billing and payments" },
    "/settings": { title: "Settings", subtitle: "Configure your preferences" },
    "/modules": { title: "Modules", subtitle: "Available system modules" },
    "/chat": { title: "Chat", subtitle: "Team communication" },
  }

  return routeInfo[pathname] || { title: "Page", subtitle: undefined }
}

export function TopbarSecondary({
  onToggleChat,
  onToggleFeaturePanel,
  onSearchOpen,
}: TopbarSecondaryProps) {
  const pathname = usePathname()
  const breadcrumbs = generateBreadcrumbs(pathname)
  const pageInfo = getPageInfo(pathname)

  return (
    <div className="h-16 border-b border-border bg-card/95 backdrop-blur-sm flex items-center justify-between px-6 relative">
      {/* Left: Breadcrumbs & Page Title */}
      <motion.div
        className="flex-1 min-w-0"
        variants={fadeInUp}
        initial="initial"
        animate="animate"
      >
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-1 mb-1 overflow-x-auto scrollbar-thin" aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, index) => (
            <div key={index} className="flex items-center gap-1 flex-shrink-0">
              {index > 0 && (
                <ChevronRight className="w-3 h-3 text-muted-foreground" />
              )}
              {crumb.href ? (
                <Link
                  href={crumb.href}
                  className="flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-medium
                           text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                >
                  {crumb.icon && <crumb.icon className="w-3 h-3" />}
                  {crumb.label}
                </Link>
              ) : (
                <span
                  className="flex items-center gap-1.5 px-2 py-1 text-xs font-semibold
                           text-primary bg-primary/10 rounded-md"
                >
                  {crumb.icon && <crumb.icon className="w-3 h-3" />}
                  {crumb.label}
                </span>
              )}
            </div>
          ))}
        </nav>

        {/* Page Title */}
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground font-heading truncate">
            {pageInfo.title}
          </h2>
          {pageInfo.subtitle && (
            <>
              <div className="hidden md:block w-px h-4 bg-border" />
              <p className="hidden md:block text-sm text-muted-foreground truncate">
                {pageInfo.subtitle}
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* Right: Actions */}
      <motion.div
        className="flex items-center gap-2 ml-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        {/* Search */}
        <button
          onClick={onSearchOpen}
          className="hidden md:flex items-center gap-2 px-3 py-2 bg-muted/50 hover:bg-muted
                   border border-border rounded-lg transition-all group"
          aria-label="Search"
        >
          <Search className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
            Search...
          </span>
          <kbd className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 text-xs
                       bg-card border border-border rounded">
            <span>⌘</span>
            <span>K</span>
          </kbd>
        </button>

        {/* Mobile Search */}
        <button
          onClick={onSearchOpen}
          className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors group"
          aria-label="Search"
        >
          <Search className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* Quick Actions Divider */}
        <div className="hidden lg:block w-px h-6 bg-border" />

        {/* New Item */}
        <button
          className="hidden lg:flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-hover
                   text-primary-foreground rounded-lg transition-all shadow-sm hover:shadow-md group"
          aria-label="Create new item"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-medium">New</span>
        </button>

        {/* Filter Toggle */}
        {onToggleFeaturePanel && (
          <button
            onClick={onToggleFeaturePanel}
            className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition-colors group"
            aria-label="Toggle filters"
            title="Open feature panel"
          >
            <Filter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        )}

        {/* Export */}
        <button
          className="hidden sm:flex p-2 hover:bg-muted rounded-lg transition-colors group"
          aria-label="Export"
          title="Export data"
        >
          <Download className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>

        {/* Chat Toggle */}
        <button
          onClick={onToggleChat}
          className="p-2 hover:bg-muted rounded-lg transition-colors relative group"
          aria-label="Toggle chat"
          title="Open chat"
        >
          <MessageSquare className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
        </button>

        {/* More Options */}
        <button
          className="p-2 hover:bg-muted rounded-lg transition-colors group"
          aria-label="More options"
        >
          <MoreVertical className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </button>
      </motion.div>
    </div>
  )
}

