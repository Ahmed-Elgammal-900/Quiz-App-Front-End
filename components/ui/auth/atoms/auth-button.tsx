import { Button } from "../../button"

export default function AuthButton({
  isPending,
  children,
}: {
  isPending: boolean
  children: React.ReactNode
}) {
  return (
    <Button
      type="submit"
      className="hover group mb-8 h-12 w-full rounded-full hover:cursor-pointer"
      disabled={isPending}
    >
      {children}
    </Button>
  )
}
