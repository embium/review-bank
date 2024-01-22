export const dynamic = "force-dynamic";

import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import CreateUser from "./_components/create-user";

export default async function Initial() {
  const existence = await api.user.checkExistence.query();
  if (existence) redirect("/dashboard");
  return <CreateUser />;
}
