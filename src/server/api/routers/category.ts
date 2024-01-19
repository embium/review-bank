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

  create: publicProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      // simulate a slow db call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      return ctx.db.post.create({
        data: {
          name: input.name,
        },
      });
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.post.findFirst({
      orderBy: { createdAt: "desc" },
    });
  }),

  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
