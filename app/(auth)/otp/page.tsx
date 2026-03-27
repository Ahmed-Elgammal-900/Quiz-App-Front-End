import { verifyOtpAction } from "@/actions/auth.action"
import AuthForm from "@/components/ui/auth/auth-form"
import AuthHeader from "@/components/ui/auth/shared/auth-header"

export default async function OTP() {
  return (
    <>
      <AuthHeader />
      <AuthForm action={verifyOtpAction} variant="otp" />
    </>
  )
}
