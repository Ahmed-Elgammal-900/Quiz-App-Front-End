import {
  changePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  OtpInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/validations/auth.schema"

export async function login(body: LoginInput) {
  return fetch(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function register(body: RegisterInput) {
  return fetch(`${process.env.API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function forgetPassword(body: ForgotPasswordInput) {
  return fetch(`${process.env.API_URL}/auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function resetPassword(body: ResetPasswordInput) {
  return fetch(`${process.env.API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function verifyOtp(body: OtpInput & { id: string }) {
  return fetch(`${process.env.API_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function resendOtp(body: { id: string }) {
  return fetch(`${process.env.API_URL}/auth/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function changePassword(
  body: changePasswordInput,
  accessToken: string
) {
  return fetch(`${process.env.API_URL}/auth/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(body),
  })
}

export async function verifyAccessToken(accessToken: NonNullable<string>) {
  return fetch(`${process.env.API_URL}/auth/verify-access-token`, {
    method: "POST",
    headers: { Cookie: `access_token=${accessToken}` },
  })
}

export async function refreshTokens(refreshToken: NonNullable<string>) {
  return fetch(`${process.env.API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { Cookie: `refresh_token=${refreshToken}` },
  })
}

export async function logout(accessToken: NonNullable<string>) {
  return fetch(`${process.env.API_URL}/auth/logout`, {
    method: "POST",
    headers: { Cookie: `access_token=${accessToken}` },
  })
}
