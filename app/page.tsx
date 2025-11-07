"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { useEffect } from "react"
import { PremiumLayout } from "@/components/dashboard/premium-layout"
import { Dashboard } from "@/components/dashboard/pages/dashboard"

// Force dynamic rendering to avoid SSR issues
export const dynamic = 'force-dynamic'

export default function Home() {
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
    <PremiumLayout>
      <Dashboard />
    </PremiumLayout>
  )
}
