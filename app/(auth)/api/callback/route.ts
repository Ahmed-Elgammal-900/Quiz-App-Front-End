import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(
      new URL(
        "/oauth-error?message=Authentication service unavailable",
        request.url
      )
    )
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/exchange?code=${code}`
    )

    if (!res.ok) {
      return NextResponse.redirect(
        new URL(
          "/oauth-error?message=Google Authentication failed",
          request.url
        )
      )
    }

    const setCookies = res.headers.getSetCookie()

    const response = NextResponse.redirect(new URL("/dashboard", request.url))

    for (const cookieStr of setCookies) {
      response.headers.append("Set-Cookie", cookieStr)
    }

    return response
  } catch (error) {
    console.error("OAuth Exchange Error:", error)
    return NextResponse.redirect(
      new URL(
        "/oauth-error?message=Authentication service unavailable",
        request.url
      )
    )
  }
}
