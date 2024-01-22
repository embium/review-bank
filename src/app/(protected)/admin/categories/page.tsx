import { api } from "@/trpc/server";

import { CategoriesTableShell } from "@/components/shells/categories-table-shell";
import { categoriesSearchParamsSchema } from "@/lib/validations/params";
import { type SearchParams } from "@/types";
import { type Category } from "@prisma/client";

interface CategoriesPageProps {
  params: {
    categoryId: string;
  };
  searchParams: SearchParams;
}

export default async function CategoriesPage({
  searchParams,
}: CategoriesPageProps) {
  const { page, per_page, sort, name } =
    categoriesSearchParamsSchema.parse(searchParams);

  const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
  // Number of items per page
  const limit = isNaN(per_page) ? 10 : per_page;
  // Number of items to skip
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
  // Column and order to sort by
  const [column, order] = (sort?.split(".") as [
    keyof Category | undefined,
    "asc" | "desc" | undefined,
  ]) ?? ["createdAt", "asc"];

  const categoriesPromise = api.category.getCategories.mutate({
    id: undefined,
    limit,
    offset,
    column,
    order,
    name,
  });

  return <CategoriesTableShell promise={categoriesPromise} />;
}
