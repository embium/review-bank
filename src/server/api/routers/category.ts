import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { api } from "@/trpc/server";

export const categoryRouter = createTRPCRouter({
  getCategories: protectedProcedure
    .input(z.object({ id: z.optional(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const categories = await ctx.db.category.findMany({
        where: {
          parentCategoryId: input.id ?? null,
        },
      });
      console.log(categories);
      return categories;
    }),
  createCategory: protectedProcedure
    .input(z.object({ id: z.optional(z.string()), name: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await api.user.isAdmin.query();

      if (!isAdmin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this page.",
        });
      }

      const categories = await ctx.db.category.create({
        data: {
          name: input.name,
          parentCategoryId: input.id ?? undefined,
        },
      });

      return categories;
    }),
  deleteCategory: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await api.user.isAdmin.query();

      if (!isAdmin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this page.",
        });
      }

      await ctx.db.category.delete({
        where: {
          id: input.id,
        },
      });

      return { response: "ok" };
    }),
  deleteCategories: protectedProcedure
    .input(z.array(z.object({ id: z.string() })))
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await api.user.isAdmin.query();

      if (!isAdmin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not authorized to view this page.",
        });
      }

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
