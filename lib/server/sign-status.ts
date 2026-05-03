import "server-only"
import crypto from "crypto"

export function signStatus(status: string): string {
  const SECRET = process.env.PARAM_SECRET
  if (!SECRET) throw new Error("PARAM_SECRET is not set")

  const iv = crypto.randomBytes(16)
  const key = crypto.createHash("sha256").update(SECRET).digest()
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv)

  const encrypted = cipher.update(status, "utf8", "hex") + cipher.final("hex")

  const payload = `${iv.toString("hex")}.${encrypted}`
  const sig = crypto.createHmac("sha256", SECRET).update(payload).digest("hex")

  return `${payload}.${sig}`
}

export function verifyStatus(signed: string | undefined): string | null {
  const SECRET = process.env.PARAM_SECRET
  if (!SECRET) throw new Error("PARAM_SECRET is not set")

  if (!signed) {
    return null
  }

  const lastDot = signed.lastIndexOf(".")
  if (lastDot === -1) return null

  const payload = signed.slice(0, lastDot)
  const sig = signed.slice(lastDot + 1)

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(payload)
    .digest("hex")

  const sigBuf = Buffer.from(sig, "hex")
  const expectedBuf = Buffer.from(expected, "hex")

  if (
    sigBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return null
  }

  try {
    const [ivHex, encrypted] = payload.split(".")
    if (!ivHex || !encrypted) return null

    const key = crypto.createHash("sha256").update(SECRET).digest()
    const decipher = crypto.createDecipheriv(
      "aes-256-cbc",
      key,
      Buffer.from(ivHex, "hex")
    )

    return decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8")
  } catch {
    return null
  }
}
