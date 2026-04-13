import ChangePasswordForm from "@/components/ui/settings/molecules/ChangePasswordForm"
import DeleteAccount from "@/components/ui/settings/molecules/DeleteAccount"
import Preference from "@/components/ui/settings/molecules/Preferences"
import SettingsHeader from "@/components/ui/settings/atoms/SettingsHeader"
import UserInfo from "@/components/ui/settings/molecules/UserInfo"

export default function Settings() {
  return (
    <div className="mt-3">
      <SettingsHeader />
      <section className="mt-5 flex h-auto flex-col gap-4 lg:flex-row">
        <UserInfo />
        <Preference />
      </section>
      <section className="mt-5 flex h-230 flex-col gap-4 lg:h-auto lg:flex-row">
        <ChangePasswordForm />
        <DeleteAccount />
      </section>
    </div>
  )
}
