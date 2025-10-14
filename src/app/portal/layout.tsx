// Force dynamic rendering for all portal pages
export const dynamic = 'force-dynamic'

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
