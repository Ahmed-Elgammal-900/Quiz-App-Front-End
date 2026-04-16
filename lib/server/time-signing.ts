import "server-only"
import crypto from "crypto"

export function signTime(timeInSeconds: number): string {
  const SECRET = process.env.PARAM_SECRET
  if (!SECRET) throw new Error("PARAM_SECRET is not set")
  const time = timeInSeconds.toString()
  const sig = crypto.createHmac("sha256", SECRET).update(time).digest("hex")
  return `${time}.${sig}`
}

export function verifyTime(signed: string): number | null {
  const SECRET = process.env.PARAM_SECRET
  if (!SECRET) throw new Error("PARAM_SECRET is not set")
  const [time, sig] = signed.split(".")
  if (!time || !sig) return null

  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(time)
    .digest("hex")
  const sigBuf = Buffer.from(sig, "hex")
  const expectedBuf = Buffer.from(expected, "hex")
  if (
    sigBuf.length !== expectedBuf.length ||
    !crypto.timingSafeEqual(sigBuf, expectedBuf)
  ) {
    return null
  }
  const parsed = Number(time)
  return Number.isFinite(parsed) ? parsed : null
}
