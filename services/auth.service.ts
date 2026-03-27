import {
  changePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  OtpInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/validations/auth.schema"

export async function login(body: LoginInput) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function register(body: RegisterInput) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function forgetPassword(body: ForgotPasswordInput) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function resetPassword(body: ResetPasswordInput) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function verifyOtp(body: OtpInput & { id: string }) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function resendOtp(body: { id: string }) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function changePassword(body: changePasswordInput) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/change-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(body),
  })
}

export async function verifyAccessToken(accessToken: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/verify-access-token`, {
    method: "POST",
    headers: { Cookie: `access_token=${accessToken}` },
  })
}

export async function refreshTokens(refreshToken: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/refresh-token`, {
    method: "POST",
    headers: { Cookie: `refresh_token=${refreshToken}` },
  })
}

export async function logout(accessToken: string) {
  return fetch(`${process.env.NEXT_PUBLIC_API}/auth/logout`, {
    method: "POST",
    headers: { Cookie: `access_token=${accessToken}` },
  })
}
