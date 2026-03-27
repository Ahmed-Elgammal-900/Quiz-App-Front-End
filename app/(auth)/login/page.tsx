import { loginAction } from "@/actions/auth.action"
import AuthForm from "@/components/ui/auth/auth-form"
import AuthHeader from "@/components/ui/auth/shared/auth-header"

export default function Login() {
  return (
    <>
      <AuthHeader />
      <AuthForm action={loginAction} variant="login" />
    </>
  )
}
