interface CookieOptions {
  httpOnly?: boolean
  path?: string
  maxAge?: number
  sameSite?: "strict" | "lax" | "none"
  secure?: boolean
}

export interface ParsedCookie {
  name: string
  value: string
  options: CookieOptions
}
