import { registerAction } from "@/actions/auth.action"
import AuthForm from "@/components/ui/auth/auth-form"
import AuthHeader from "@/components/ui/auth/shared/auth-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Register",
}

export default function Register() {
  return (
    <>
      <AuthHeader />
      <AuthForm variant="signup" action={registerAction}/>
    </>
  )
}
