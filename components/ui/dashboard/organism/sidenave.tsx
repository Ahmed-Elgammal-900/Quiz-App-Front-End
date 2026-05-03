"use client"
import { navItems } from "@/config/sidenav.config"
import { ScrollArea } from "../../system/scroll-area"
import Link from "next/link"
import { Separator } from "../../system/separator"
import { Button } from "../../system/button"
import { usePathname } from "next/navigation"
import { HelpCircle } from "lucide-react"
import { UserMenu } from "../molecule/UserMenu"

export default function SideNav() {
  const pathname = usePathname()

  return (
    <>
      {/* Sidenav — desktop only */}
      <aside className="top-0 hidden shrink-0 border-r bg-background lg:sticky lg:inset-y-0 lg:left-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        {/* Logo */}
        <div className="flex h-14 items-center gap-x-2 border-b px-5 text-primary">
          <HelpCircle />
          <span className="text-md font-semibold">Quizzer</span>
        </div>

        {/* Nav */}
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="space-y-1">
            {navItems.map(({ label, href, icon: Icon }) => (
              <Button
                key={href}
                asChild
                variant={pathname === href ? "default" : "ghost"}
                className="w-full justify-start gap-3"
              >
                <Link href={href}>
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              </Button>
            ))}
          </nav>
        </ScrollArea>

        <Separator />

        <UserMenu />
      </aside>
    </>
  )
}
