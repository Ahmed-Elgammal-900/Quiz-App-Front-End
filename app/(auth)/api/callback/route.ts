import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const url = new URL(request.url)
  const code = url.searchParams.get("code")
  const userId = url.searchParams.get("userId")

  if (code && userId) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API}/auth/exchange?code=${code}&userId=${userId}`
    )

    if (!res.ok) {
      return NextResponse.redirect(
        new URL(
          "/oauth-error?message=Google Authentication failed",
          request.url
        )
      )
    }

    const response = NextResponse.redirect(new URL("/dashboard", request.url))

    const setCookies = res.headers.getSetCookie()

    for (const cookieStr of setCookies) {
      response.headers.append("Set-Cookie", cookieStr)
    }

    return response
  }

  return NextResponse.redirect(
    new URL("/oauth-error?message=Missing required parameters", request.url)
  )
}
