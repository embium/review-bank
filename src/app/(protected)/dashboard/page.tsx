import { api } from "@/trpc/server";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { columns } from "./_components/columns";
import { type Category } from "@prisma/client";
import { DataTable } from "./_components/data-table";
import { CreateCategory } from "./_components/create-category";

async function getData(): Promise<Category[]> {
  const categories = await api.category.getCategories.query();
  return categories;
}

export default async function Dashboard() {
  const data = await getData();

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={data} />
          <div className="py-5">
            <CreateCategory />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
