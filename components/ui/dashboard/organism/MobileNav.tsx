"use client"
import { navItems } from "@/config/sidenav.config"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function MobileNav() {
  const pathname = usePathname()
  return (
    <nav className="sticky right-0 bottom-0 left-0 z-50 flex shrink-0 border-t bg-background lg:hidden">
      {navItems.map(({ label, href, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className={`flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs transition-colors ${pathname === href ? "text-primary" : "text-muted-foreground hover:text-foreground"}`}
        >
          <Icon className="h-5 w-5" />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  )
}
