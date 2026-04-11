"use client"
import { User, LogOut } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/system/dropdown-menu"
import { useUser } from "@/hooks/useUser"
import { logoutAction } from "@/actions/auth.action"

export function UserMenu() {
  const user = useUser()

  return (
    <>
      {/* Desktop */}
      <div className="hidden p-3 lg:block">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              aria-label={
                user?.name
                  ? `Open user menu for ${user.name}`
                  : "Open user menu"
              }
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors outline-none hover:cursor-pointer hover:bg-accent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-muted">
                <User className="h-4 w-4" />
              </div>
              <span>{user?.name}</span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="top"
            align="start"
            className="bg-background"
          >
            <DropdownMenuItem
              className="text-destructive hover:cursor-pointer"
              onClick={logoutAction}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Mobile */}
      <div className="lg:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            aria-label="Open user menu"
            className="flex items-center justify-center outline-none"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
              <User className="h-4 w-4 text-muted-foreground" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            align="end"
            className="bg-background"
          >
            <DropdownMenuItem
              className="text-destructive hover:cursor-pointer"
              onClick={logoutAction}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  )
}
