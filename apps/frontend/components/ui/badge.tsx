"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-purple-600 text-white",
    secondary: "border-transparent bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100",
    destructive: "border-transparent bg-red-600 text-white",
    outline: "text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600",
    success: "border-transparent bg-green-600 text-white",
    warning: "border-transparent bg-yellow-600 text-white",
  }

  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )} 
      {...props} 
    />
  )
}

export { Badge }