"use client";

import { api } from "@/trpc/react";

export default function Home() {
  const user = api.post.getUser.useQuery();
  return <div>{user.isLoading ? "Loading..." : user.data?.id}</div>;
}
