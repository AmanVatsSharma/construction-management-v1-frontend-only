import React from 'react'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  size?: number
  strokeColor?: string
}

/**
 * Novologic Logo Component
 * Displays the hexagon logo with customizable size and stroke color
 * 
 * @param className - Additional CSS classes to apply
 * @param size - Size of the logo (width and height in pixels, default: 32)
 * @param strokeColor - Color of the stroke (default: "white" for light backgrounds, use "currentColor" for theme-aware)
 */
export function Logo({ 
  className, 
  size = 32,
  strokeColor = "currentColor"
}: LogoProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={cn("flex-shrink-0", className)}
      aria-label="Novologic Logo"
      role="img"
    >
      <path 
        d="M12 2L3 7V17L12 22L21 17V7L12 2Z" 
        stroke={strokeColor} 
        strokeWidth="1.5" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )
}

