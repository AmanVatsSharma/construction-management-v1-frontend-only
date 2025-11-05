import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ChatProvider } from "@/lib/chat-context"
import { AuthProvider } from "@/lib/auth-context"
import "./globals.css"

// Using Inter as fallback since Geist is not available in next/font/google
// The CSS already defines Geist in font-sans fallback chain
const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Novologic - Construction Project Manager",
  description: "Professional Construction Project Management Platform",
  generator: "v0.1",
}

// Force dynamic rendering to avoid SSR issues with browser APIs like 'location'
export const dynamic = 'force-dynamic'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <AuthProvider>
          <ChatProvider>{children}</ChatProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
