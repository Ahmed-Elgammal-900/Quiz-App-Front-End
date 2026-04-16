import "server-only"
import crypto from "crypto"

if (!process.env.PARAM_SECRET) throw new Error("PARAM_SECRET is not set")

const SECRET: string = process.env.PARAM_SECRET

export function signTime(timeInSeconds: number) {
  const time = timeInSeconds.toString()
  const sig = crypto.createHmac("sha256", SECRET).update(time).digest("hex")
  return `${time}.${sig}`
}

export function verifyTime(signed: string): number | null {
  const [time, sig] = signed.split(".")
  if (!time || !sig) return null
  const expected = crypto
    .createHmac("sha256", SECRET)
    .update(time)
    .digest("hex")
  if (sig !== expected) return null
  return Number(time)
}
