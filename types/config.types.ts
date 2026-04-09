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

export type QuizConfig = {
  icon: React.ElementType
  gradient: string
  iconColor: string
  bgColor: string
  shadow: string
}
