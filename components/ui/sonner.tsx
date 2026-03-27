"use client"

import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      position="top-right"
      style={
        {
          "--normal-bg": "var(--popover)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
          "--border-radius": "var(--radius)",
        } as React.CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "cn-toast !rounded-xl !border !shadow-lg",
          title: "!font-semibold !text-sm",
          description: "!text-xs !text-muted-foreground",
          success: "!border-green-500/30 !bg-green-500/10 !text-green-600",
          error: "!border-destructive/30 !bg-destructive/10 !text-destructive",
          warning: "!border-yellow-500/30 !bg-yellow-500/10 !text-yellow-600",
          info: "!border-blue-500/30 !bg-blue-500/10 !text-blue-600",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
