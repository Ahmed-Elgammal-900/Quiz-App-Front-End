import {
  changePasswordInput,
  ForgotPasswordInput,
  LoginInput,
  OtpInput,
  RegisterInput,
  ResetPasswordInput,
} from "@/validations/auth.schema"

async function request(input: string, init: RequestInit): Promise<Response> {
  let res: Response

  try {
    res = await fetch(input, init)
  } catch (error) {
    throw new Error(`Network request failed: ${String(error)}`)
  }

  if (!res.ok) {
    throw new Error(
      `Auth API error (${res.status}) on ${new URL(input).pathname}`
    )
  }

  return res
}

export async function login(body: LoginInput) {
  return request(`${process.env.API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function register(body: RegisterInput) {
  return request(`${process.env.API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function forgetPassword(body: ForgotPasswordInput) {
  return request(`${process.env.API_URL}/auth/forget-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function resetPassword(body: ResetPasswordInput) {
  return request(`${process.env.API_URL}/auth/reset-password`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function verifyOtp(body: OtpInput & { id: string }) {
  return request(`${process.env.API_URL}/auth/verify-email`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function resendOtp(body: { id: string }) {
  return request(`${process.env.API_URL}/auth/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
}

export async function changePassword(
  body: changePasswordInput,
  accessToken: NonNullable<string>
) {
  return request(`${process.env.API_URL}/auth/change-password`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Cookie: `access_token=${accessToken}`,
    },
    body: JSON.stringify(body),
  })
}

export async function verifyAccessToken(accessToken: NonNullable<string>) {
  return request(`${process.env.API_URL}/auth/verify-access-token`, {
    method: "POST",
    headers: { Cookie: `access_token=${accessToken}` },
  })
}

export async function refreshTokens(refreshToken: NonNullable<string>) {
  return request(`${process.env.API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { Cookie: `refresh_token=${refreshToken}` },
  })
}

export async function logout(accessToken: NonNullable<string>) {
  return request(`${process.env.API_URL}/auth/logout`, {
    method: "POST",
    headers: { Cookie: `access_token=${accessToken}` },
  })
}
