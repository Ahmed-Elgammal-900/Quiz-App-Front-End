import OTP from "@/components/ui/auth/molecules/otp"
import ConfirmPassword from "@/components/ui/auth/atoms/confirm-password"
import EmailField from "@/components/ui/auth/atoms/email-field"
import NameField from "@/components/ui/auth/atoms/name-field"
import PasswordField from "@/components/ui/auth/atoms/password-field"
import { VariantConfig } from "@/config/auth.config"
import { FieldErrors } from "@/types/auth.types"

export function FormFields({
  fields,
  errors,
  isLogin,
}: {
  fields: VariantConfig["fields"]
  errors: FieldErrors | null | undefined
  isLogin: boolean
}) {
  return (
    <>
      {fields.map((field) => {
        switch (field) {
          case "name":
            return <NameField key="name" nameError={errors?.name} />
          case "email":
            return <EmailField key="email" emailError={errors?.email} />
          case "password":
            return (
              <PasswordField
                key="password"
                passwordError={errors?.password}
                isLogin={isLogin}
              />
            )
          case "confirmPassword":
            return (
              <ConfirmPassword
                key="confirmPassword"
                confirmPasswordError={errors?.confirmPassword}
              />
            )
          case "otp":
            return <OTP key="otp" otpError={errors?.otp} />
        }
      })}
    </>
  )
}
