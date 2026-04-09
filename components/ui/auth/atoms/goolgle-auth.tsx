import { Button } from "../../system/button"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import Link from "next/link"

export default function GoogleAuth() {
  return (
    <Button
      className="mt-7 h-12 w-full rounded-full border border-primary bg-transparent text-sm text-foreground hover:cursor-pointer hover:bg-primary hover:text-primary-foreground"
      type="button"
    >
      <Link
        href={`${process.env.NEXT_PUBLIC_API}/auth/google`}
        className="w-full"
      >
        <FontAwesomeIcon icon={faGoogle} size="lg" /> Google
      </Link>
    </Button>
  )
}
