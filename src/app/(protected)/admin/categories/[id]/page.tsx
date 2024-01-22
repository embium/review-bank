import { api } from "@/trpc/server";
import { type Category } from "@prisma/client";

import { CategoriesTableShell } from "@/components/shells/categories-table-shell";
import { type SearchParams } from "@/types";
import { categoriesSearchParamsSchema } from "@/lib/validations/params";

interface CategoriesPageProps {
  params: {
    id: string;
  };
  searchParams: SearchParams;
}

export default async function CategoriesPage({
  params,
  searchParams,
}: CategoriesPageProps) {
  const categoryId = params.id;

  const { page, per_page, sort, name } =
    categoriesSearchParamsSchema.parse(searchParams);

  const fallbackPage = isNaN(page) || page < 1 ? 1 : page;
  const limit = isNaN(per_page) ? 10 : per_page;
  const offset = fallbackPage > 0 ? (fallbackPage - 1) * limit : 0;
  const [column, order] = (sort?.split(".") as [
    keyof Category | undefined,
    "asc" | "desc" | undefined,
  ]) ?? ["createdAt", "asc"];

  const categoriesPromise = api.category.getCategories.mutate({
    id: categoryId,
    limit,
    offset,
    column,
    order,
    name,
  });

  return <CategoriesTableShell promise={categoriesPromise} />;
}
