import { api } from "@/trpc/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAdmin = await api.user.isAdmin.query();
  console.log(isAdmin);
  if (!isAdmin) return <>Access denied!</>;
  return <>{children}</>;
}
