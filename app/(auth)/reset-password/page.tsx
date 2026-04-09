import { resetPasswordAction } from "@/actions/auth.action"
import AuthForm from "@/components/ui/auth/auth-form"
import AuthHeader from "@/components/ui/auth/shared/auth-header"
import { ActionState } from "@/types/auth.types"

export default async function ResetPassword({
  searchParams,
}: {
  searchParams?: Promise<{
    token?: string
  }>
}) {
  const params = await searchParams

  return (
    <>
      <AuthHeader />
      <AuthForm
        variant="resetPassword"
        token={params?.token}
        action={resetPasswordAction as () => ActionState | Promise<ActionState>}
      />
    </>
  )
}
