import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Field, FieldError } from "../../system/field"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../../system/input-otp"
import { useEffect, useState } from "react"
import { resendOtpAction } from "@/actions/auth.action"
import { cn } from "@/lib/utils"

export default function OTP({ otpError }: { otpError: string | undefined }) {
  const [otp, setOtp] = useState("")
  const [timer, setTimer] = useState(60)

  const canResend = timer === 0

  useEffect(() => {
    if (timer === 0) return

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [timer])

  const handleResend = async () => {
    setTimer(60)
    await resendOtpAction()
  }

  return (
    <>
      <input type="hidden" name="otp" value={otp} readOnly />
      <Field className="mb-7 flex items-center justify-center">
        <InputOTP
          maxLength={6}
          value={otp}
          onChange={setOtp}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup className="w-full justify-center gap-x-3">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className={cn(
                  "h-12 w-12 rounded-lg border text-lg font-medium data-[active=true]:border-primary data-[active=true]:ring-0",
                  otpError && "border-destructive bg-destructive/5"
                )}
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
        {otpError && <FieldError>{otpError}</FieldError>}
      </Field>
      <div className="my-10 mt-4 flex flex-col items-center justify-center gap-1">
        <span className="text-center text-sm text-muted-foreground">
          Didn&apos;t receive the code?
        </span>
        <div className="h-10">
          {canResend ? (
            <button
              type="button"
              onClick={handleResend}
              className="text-sm text-primary hover:cursor-pointer hover:underline"
            >
              Resend
            </button>
          ) : (
            <div className="mt-2 flex items-center justify-center gap-x-1 text-xs text-primary">
              Resend in{" "}
              <span className="flex h-7 w-13.5 items-center justify-center rounded-full bg-primary-foreground px-3">
                00:{timer}
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
