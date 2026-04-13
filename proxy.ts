import { NextRequest, NextResponse } from "next/server"
import { refreshTokens, verifyAccessToken } from "./services/auth.service"

const protectedRoutes = ["/dashboard"]

const authRoutes = [
  "/login",
  "/register",
  "/forget-password",
  "/forget-password-success",
  "/reset-password",
  "/otp",
  "/oauth-error",
  "/api/callback",
]

export async function proxy(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl
  const accessToken = request.cookies.get("access_token")?.value
  const refreshToken = request.cookies.get("refresh_token")?.value
  const pendingUserId = request.cookies.get("pending_userId")?.value
  const resetToken = searchParams.get("token")

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  )
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))
  const isOtp = pathname.startsWith("/otp")
  const isResetPassword = pathname.startsWith("/reset-password")

  if (pathname === "/") {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isProtectedRoute) {
    // checking access token and refresh token values
    if (!accessToken && !refreshToken) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
    // Validate access token
    if (accessToken) {
      const res = await verifyAccessToken(accessToken)

      if (res.ok) {
        return NextResponse.next()
      }
    }
    // Validate refresh token
    if (refreshToken) {
      const res = await refreshTokens(refreshToken ?? "")
      if (res.ok) {
        const response = NextResponse.next()
        const setCookieHeader = res.headers.get("set-cookie")
        if (setCookieHeader) {
          response.headers.set("set-cookie", setCookieHeader)
        }
        return response
      } else {
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("access_token")
        response.cookies.delete("refresh_token")
        return response
      }
    }
  }

  if (isAuthRoute) {
    // Verify access token if failed go to refresh token
    if (accessToken) {
      const res = await verifyAccessToken(accessToken)

      if (res.ok) {
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    }
    // Validate refresh token and get new tokens
    if (refreshToken) {
      const res = await refreshTokens(refreshToken)
      if (res.ok) {
        const response = NextResponse.redirect(
          new URL("/dashboard", request.url)
        )
        const setCookieHeader = res.headers.get("set-cookie")
        if (setCookieHeader) {
          response.headers.set("set-cookie", setCookieHeader)
        }
        return response
      }

      const response = NextResponse.next()
      response.cookies.delete("access_token")
      response.cookies.delete("refresh_token")
      return response
    }

    // Access token invalid and no refresh token to fall back on
    if (accessToken) {
      const response = NextResponse.next()
      response.cookies.delete("access_token")
      return response
    }
  }

  if (isOtp && !pendingUserId) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  if (isResetPassword && !resetToken) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)).*)",
  ],
}
