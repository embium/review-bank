import { api } from "@/trpc/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { type Category } from "@prisma/client";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

async function getData(): Promise<Category[]> {
  const categories = await api.category.getCategories.mutate({});
  return categories;
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} initData={data} />
      </CardContent>
    </Card>
  );
}
