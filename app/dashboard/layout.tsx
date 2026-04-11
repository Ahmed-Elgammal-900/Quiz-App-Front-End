import { UserMenu } from "@/components/ui/dashboard/molecule/UserMenu"
import MobileNav from "@/components/ui/dashboard/organism/MobileNav"
import SideNav from "@/components/ui/dashboard/organism/sidenave"
import { UserProvider } from "@/context/UserContext"
import { getUser } from "@/services/user.service"
import { HelpCircle } from "lucide-react"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getUser()
  // const user = {
  //   name: "Ahmed Elgammal",
  //   email: "elgmmal228@gmail.com",
  //   providers: ["google"],
  // }
  return (
    <div className="flex h-screen overflow-hidden">
      <UserProvider user={user}>
        <SideNav />

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 right-0 left-0 z-50 flex h-14 shrink-0 items-center justify-between border-b bg-background px-4 lg:hidden">
            <div className="flex items-center gap-x-2 text-primary">
              <HelpCircle />
              <span className="text-md font-semibold">Quizzer</span>
            </div>
            <UserMenu />
          </header>

          <main className="scrollbar flex-1 overflow-y-auto px-4 py-4 md:px-5 lg:py-6 lg:ps-6">
            {children}
          </main>
          <MobileNav />
        </div>
      </UserProvider>
    </div>
  )
}
