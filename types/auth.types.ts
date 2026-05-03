export interface ActionState {
  success?: boolean
  message?: string | null
  errors?: Record<string, string> | null
}

export interface FieldErrors {
  name?: string
  email?: string
  password?: string
  confirmPassword?: string
  otp?: string
}

export type AuthVariant =
  | "login"
  | "signup"
  | "otp"
  | "resetPassword"
  | "forgotPassword"

export interface AuthFormProps {
  variant: AuthVariant
  action: (
    _prevState: ActionState,
    formData: FormData
  ) => ActionState | Promise<ActionState>
  token?: string
}
