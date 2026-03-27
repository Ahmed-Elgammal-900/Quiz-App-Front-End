interface CookieOptions {
  httpOnly?: boolean
  path?: string
  maxAge?: number
  sameSite?: "strict" | "lax" | "none"
  secure?: boolean
}

interface ParsedCookie {
  name: string
  value: string
  options: CookieOptions
}

export function parseSetCookieHeader(setCookieHeader: string): ParsedCookie[] {
  const cookieStrings = setCookieHeader.split(/, (?=[a-zA-Z])/)

  return cookieStrings.map((cookieStr) => {
    const parts = cookieStr.split(";").map((p) => p.trim())
    const [nameValue, ...attributes] = parts

    const eqIndex = nameValue.indexOf("=")
    const name = nameValue.substring(0, eqIndex).trim()
    const value = nameValue.substring(eqIndex + 1).trim()

    const maxAgeAttr = attributes.find((a) =>
      a.toLowerCase().startsWith("max-age")
    )
    const pathAttr = attributes.find((a) => a.toLowerCase().startsWith("path"))
    const sameSiteAttr = attributes.find((a) =>
      a.toLowerCase().startsWith("samesite")
    )
    const httpOnly = attributes.some((a) => a.toLowerCase() === "httponly")
    const secure = attributes.some((a) => a.toLowerCase() === "secure")

    return {
      name,
      value,
      options: {
        httpOnly,
        secure,
        path: pathAttr ? pathAttr.split("=")[1] : "/",
        maxAge: maxAgeAttr ? parseInt(maxAgeAttr.split("=")[1]) : undefined,
        sameSite: sameSiteAttr
          ? (sameSiteAttr.split("=")[1].toLowerCase() as
              | "strict"
              | "lax"
              | "none")
          : "strict",
      },
    }
  })
}