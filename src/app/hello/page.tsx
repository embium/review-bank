"use client";

import { api } from "@/trpc/react";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from TRPC1" });
  return <div>{hello.data?.greeting}</div>;
}
