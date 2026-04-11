"use server"
import {
  changePassword,
  forgetPassword,
  login,
  logout,
  register,
  resendOtp,
  resetPassword,
  verifyOtp,
} from "@/services/auth.service"
import {
  changePasswordSchema,
  forgotPasswordSchema,
  loginSchema,
  otpSchema,
  registerSchema,
  resetPasswordSchema,
} from "@/validations/auth.schema"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { ActionState } from "@/types/auth.types"
import { parseSetCookieHeader } from "@/utils/cookie"

export async function registerAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  }

  const parsed = registerSchema.safeParse(raw)
  if (!parsed.success) {
    const errors = parsed.error.issues.reduce(
      (acc, issue) => {
        const field = issue.path[0] as string
        acc[field] = issue.message
        return acc
      },
      {} as Record<string, string>
    )

    return { success: false, errors, message: null }
  }

  try {
    const res = await register(parsed.data)
    const { data } = await res.json()

    if (!res.ok) {
      return { success: false, message: data.message || "Registration failed" }
    }

    const cookie = await cookies()

    cookie.set("pending_userId", data.userId, {
      httpOnly: true,
      maxAge: 60 * 15,
      path: "/",
    })
  } catch {
    return { success: false, message: "Something went wrong, please try again" }
  }
  redirect("/otp")
}

export async function loginAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const parsed = loginSchema.safeParse(raw)
  if (!parsed.success) {
    const errors = parsed.error.issues.reduce(
      (acc, issue) => {
        const field = issue.path[0] as string
        acc[field] = issue.message
        return acc
      },
      {} as Record<string, string>
    )

    return { success: false, errors, message: null }
  }

  let redirectTo = "/dashboard"

  try {
    const res = await login(parsed.data)
    const { data } = await res.json()
    const cookie = await cookies()

    if (!res.ok) {
      return {
        success: false,
        message: data.message || "Invalid email or password",
      }
    }

    if (!data.isEmailVerified) {
      cookie.set("pending_userId", data.userId, {
        httpOnly: true,
        maxAge: 60 * 15,
        path: "/",
      })
      redirectTo = "/otp"
    }
    const setCookieHeader = res.headers.get("set-cookie")

    if (setCookieHeader) {
      const parsed = parseSetCookieHeader(setCookieHeader)
      parsed.forEach(({ name, value, options }) => {
        cookie.set(name, value, options)
      })
    }
  } catch {
    return {
      success: false,
      message: "Invalid email or password",
    }
  }

  redirect(redirectTo)
}

export async function forgetPasswordAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    email: formData.get("email") as string,
  }

  const parsed = forgotPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    const errors = parsed.error.issues.reduce(
      (acc, issue) => {
        const field = issue.path[0] as string
        acc[field] = issue.message
        return acc
      },
      {} as Record<string, string>
    )

    return { success: false, errors, message: null }
  }

  try {
    const res = await forgetPassword({ email: parsed.data.email })
    const { data } = await res.json()

    if (!res.ok) {
      return {
        success: false,
        errors: null,
        message: data.message || "Failed to send reset email",
      }
    }
  } catch {
    return {
      success: false,
      errors: null,
      message: "Something went wrong, please try again",
    }
  }

  redirect("/forget-password-success")
}

export async function resetPasswordAction(
  token: string | undefined,
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
    resetToken: token,
  }

  const parsed = resetPasswordSchema.safeParse(raw)
  if (!parsed.success) {
    const errors = parsed.error.issues.reduce(
      (acc, issue) => {
        const field = issue.path[0] as string
        acc[field] = issue.message
        return acc
      },
      {} as Record<string, string>
    )

    return { success: false, errors, message: null }
  }
  let redirectTo = "/dashboard"
  try {
    const res = await resetPassword(parsed.data)
    const { data } = await res.json()
    const cookie = await cookies()

    if (!res.ok) {
      return {
        success: false,
        errors: null,
        message: data.message || "Failed to reset password",
      }
    }

    if (!data.isEmailVerified) {
      cookie.set("pending_userId", data.userId, {
        httpOnly: true,
        maxAge: 60 * 15,
        path: "/",
      })
      redirectTo = "/otp"
    } else {
      const setCookieHeader = res.headers.get("set-cookie")

      if (setCookieHeader) {
        const parsed = parseSetCookieHeader(setCookieHeader)
        parsed.forEach(({ name, value, options }) => {
          cookie.set(name, value, options)
        })
      }
    }
  } catch {
    return {
      success: false,
      errors: null,
      message: "Something went wrong, please try again",
    }
  }
  redirect(redirectTo)
}

export async function verifyOtpAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    otp: formData.get("otp") as string,
  }

  const parsed = otpSchema.safeParse(raw)
  if (!parsed.success) {
    const errors = parsed.error.issues.reduce(
      (acc, issue) => {
        const field = issue.path[0] as string
        acc[field] = issue.message
        return acc
      },
      {} as Record<string, string>
    )

    return { success: false, errors, message: null }
  }

  const cookie = await cookies()
  const userId = cookie.get("pending_userId")?.value
  if (!userId) {
    return {
      success: false,
      errors: null,
      message: "Session expired, please try again",
    }
  }

  try {
    const res = await verifyOtp({ id: userId, otp: parsed.data.otp })
    const { data } = await res.json()

    if (!res.ok) {
      return {
        success: false,
        errors: null,
        message: data.message || "Invalid OTP",
      }
    }

    cookie.delete("pending_userId")

    const setCookieHeader = res.headers.get("set-cookie")

    if (setCookieHeader) {
      const parsed = parseSetCookieHeader(setCookieHeader)
      parsed.forEach(({ name, value, options }) => {
        cookie.set(name, value, options)
      })
    }
  } catch {
    return {
      success: false,
      errors: null,
      message: "Something went wrong, please try again",
    }
  }
  redirect("/dashboard")
}

export async function resendOtpAction(): Promise<ActionState> {
  try {
    const cookieStore = await cookies()
    const userId = cookieStore.get("pending_userId")?.value
    if (!userId) {
      return {
        success: false,
        errors: null,
        message: "Session expired, please try again",
      }
    }

    const res = await resendOtp({ id: userId })
    const { data } = await res.json()

    if (!res.ok) {
      return { success: false, message: data.message || "Failed to resend OTP" }
    }

    return { success: true, message: "OTP resent successfully" }
  } catch {
    return { success: false, message: "Something went wrong, please try again" }
  }
}

export async function changePasswordAction(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const raw = {
    currentPassword: formData.get("current-password") ?? undefined,
    newPassword: formData.get("password") as string,
    confirmPassword: formData.get("confirm-password") as string,
  }

  const parsed = changePasswordSchema.safeParse(raw)
  if (!parsed.success) {
    const errors = parsed.error.issues.reduce(
      (acc, issue) => {
        const field = issue.path[0] as string
        acc[field] = issue.message
        return acc
      },
      {} as Record<string, string>
    )

    return { success: false, errors, message: null }
  }

  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("access_token")?.value
    const res = await changePassword(parsed.data, accessToken ?? "")
    const { data } = await res.json()

    if (!res.ok) {
      return {
        success: false,
        errors: null,
        message: data.message || "Failed to change password",
      }
    }

    return {
      success: true,
      errors: null,
      message: "Password changed successfully",
    }
  } catch {
    return {
      success: false,
      errors: null,
      message: "Something went wrong, please try again",
    }
  }
}

export async function logoutAction() {
  try {
    const cookie = await cookies()
    const accessToken = cookie.get("access_token")?.value
    const res = await logout(accessToken ?? "")

    const setCookieHeader = res.headers.get("set-cookie")

    if (setCookieHeader) {
      const parsed = parseSetCookieHeader(setCookieHeader)
      parsed.forEach(({ name, value, options }) => {
        cookie.set(name, value, options)
      })
    }
  } catch {
    return {
      success: false,
      message: "Something went wrong, please try again",
    }
  }
  redirect("/login")
}
