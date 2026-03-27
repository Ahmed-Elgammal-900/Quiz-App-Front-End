import { AuthVariant } from "@/types/auth.types"

export interface VariantConfig {
  header: string
  description: string
  buttonLabel: string
  buttonPending: string
  fields: Array<"name" | "email" | "password" | "confirmPassword" | "otp">
  showSocialAuth: boolean
  footer?: { text: string; linkLabel: string; href: string }
  backLink?: { label: string; href: string }
}

export const VARIANT_CONFIG: Record<AuthVariant, VariantConfig> = {
  login: {
    header: "Welcome Back",
    description: "Sign in to your account to continue.",
    buttonLabel: "Login",
    buttonPending: "Loading...",
    fields: ["email", "password"],
    showSocialAuth: true,
    footer: {
      text: "New to Quizzer?",
      linkLabel: "Create Account",
      href: "/register",
    },
  },
  signup: {
    header: "Create Account",
    description: "Sign up to get started with Quizzer.",
    buttonLabel: "Sign Up",
    buttonPending: "Loading...",
    fields: ["name", "email", "password", "confirmPassword"],
    showSocialAuth: true,
    footer: {
      text: "Already have an account?",
      linkLabel: "Sign In",
      href: "/login",
    },
  },
  otp: {
    header: "Verify Your Email",
    description: "Enter the code we sent to your inbox.",
    buttonLabel: "Verify",
    buttonPending: "Verifying...",
    fields: ["otp"],
    showSocialAuth: false,
    backLink: { label: "Back to Login", href: "/login" },
  },
  resetPassword: {
    header: "Reset Password",
    description: "Choose a new password for your account.",
    buttonLabel: "Reset Password",
    buttonPending: "Resetting...",
    fields: ["password", "confirmPassword"],
    showSocialAuth: false,
    backLink: { label: "Back to Login", href: "/login" },
  },
  forgotPassword: {
    header: "Forgot Password",
    description: "Enter your email and we'll send a reset link.",
    buttonLabel: "Send Reset Link",
    buttonPending: "Sending...",
    fields: ["email"],
    showSocialAuth: false,
    backLink: { label: "Back to Login", href: "/login" },
  },
}
