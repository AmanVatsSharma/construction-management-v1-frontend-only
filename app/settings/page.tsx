"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard/layout"
import { Settings } from "@/components/dashboard/pages/settings"

export default function SettingsPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, router])

  if (!isAuthenticated) {
    return null
  }

  return (
    <DashboardLayout>
      <Settings />
    </DashboardLayout>
  )
}

