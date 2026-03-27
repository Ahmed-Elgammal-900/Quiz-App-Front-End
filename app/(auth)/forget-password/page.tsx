import { forgetPasswordAction } from "@/actions/auth.action"
import AuthForm from "@/components/ui/auth/auth-form"
import AuthHeader from "@/components/ui/auth/shared/auth-header"

export default function ForgetPassword() {
  return (
    <>
      <AuthHeader />
      <AuthForm action={forgetPasswordAction} variant="forgotPassword" />
    </>
  )
}
