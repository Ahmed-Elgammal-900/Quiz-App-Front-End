import type { LucideIcon } from "lucide-react"
import { Stats } from "./dashboard.types"

export interface AuthVariantConfig {
  header: string
  description: string
  buttonLabel: string
  buttonPending: string
  fields: Array<"name" | "email" | "password" | "confirmPassword" | "otp">
  showSocialAuth: boolean
  footer?: { text: string; linkLabel: string; href: string }
  backLink?: { label: string; href: string }
}

export interface BadgeConfig {
  icon: React.ElementType
  gradient: string
  iconColor: string
  shadow: string
}

export interface QuizConfig {
  icon: React.ElementType
  gradient: string
  iconColor: string
  bgColor: string
  shadow: string
}

export interface NavItem {
  label: string
  href: string
  icon: LucideIcon
}

export interface StatConfig {
  property: keyof Stats
  label: string
  icon: LucideIcon
  color: string
  variant: "full" | "default"
  group: string | null
}
