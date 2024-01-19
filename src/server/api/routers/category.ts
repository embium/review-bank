import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
/*
const categories: ({
    childrenCategories: ({
        childrenCategories: {
            id: string;
            createdAt: Date;
            updatedAt: Date | null;
            name: string;
            parentCategoryId: string | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date | null;
        name: string;
        parentCategoryId: string | null;
    })[];
} & {
    ...;
})[]
*/
export const categoryRouter = createTRPCRouter({
  getCategories: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.db.category.findMany({
      where: { parentCategoryId: null },
    });
    return categories;
  }),
  createCategory: protectedProcedure
    .input(z.object({ name: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.category.create({
        data: {
          name: input.name,
        },
      });

      return { response: "ok" };
    }),
  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });

      return { response: "ok" };
    }),
});
