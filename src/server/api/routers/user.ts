import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";

import { UserRole } from "@prisma/client";
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
export const userRouter = createTRPCRouter({
  checkExistence: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { externalUserId: ctx.user.id },
    });

    if (user) return true;
  }),

  createUser: protectedProcedure
    .input(z.object({ username: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.db.user.findUnique({
        where: { externalUserId: ctx.user.id },
      });

      if (user) return null;

      await ctx.db.user.create({
        data: {
          username: input.username,
          externalUserId: ctx.user.id,
          imageUrl: ctx.user.imageUrl,
          role: UserRole.USER,
        },
      });

      return { response: "ok" };
    }),
});
