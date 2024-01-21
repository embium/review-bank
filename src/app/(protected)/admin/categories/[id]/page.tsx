import { api } from "@/trpc/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Category } from "@prisma/client";

import { columns } from "../_components/columns";
import { DataTable } from "../_components/data-table";

async function getData(id: string): Promise<Category[]> {
  const categories = await api.category.getCategories.mutate({
    id,
  });
  return categories;
}

export default async function Dashboard({
  params,
}: {
  params: { id: string };
}) {
  const data = await getData(params.id);

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
