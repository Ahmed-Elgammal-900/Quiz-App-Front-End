export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <div className="px-6 md:px-0">{children}</div>
    </>
  )
}
