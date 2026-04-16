import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import crypto from "crypto"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const SECRET = process.env.PARAM_SECRET!

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
