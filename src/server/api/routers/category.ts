import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure
    .input(
      z.object({
        id: z.optional(z.string()),
        limit: z.optional(z.number()),
        offset: z.optional(z.number()),
        column: z.optional(z.string()),
        order: z.optional(z.string()),
        name: z.optional(z.string()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const categories = await ctx.db.category.findMany({
        take: input.limit,
        skip: input.offset,
        where: {
          name: input.name,
          parentCategoryId: input.id ?? null,
        },
        orderBy: {
          [input.column!]: input.order,
        },
      });
      const pageCount = Math.ceil(categories.length / (input.limit ?? 0));
      return { categories: categories, pageCount: pageCount ?? 1 };
    }),
  createCategory: adminProcedure
    .input(z.object({ id: z.optional(z.string()), name: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      const categories = await ctx.db.category.create({
        data: {
          name: input.name,
          parentCategoryId: input.id ?? undefined,
        },
      });

      return categories;
    }),
  deleteCategory: adminProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });

      return { response: "ok" };
    }),
  deleteCategories: adminProcedure
    .input(z.array(z.object({ id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.category.deleteMany({
        where: {
          id: {
            in: input.map((category) => category.id),
          },
        },
      });
      return null;
    }),
});
