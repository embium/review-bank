import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const categoryRouter = createTRPCRouter({
  getCategories: protectedProcedure
    .input(z.object({ id: z.optional(z.string()) }))
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await ctx.db.user.findFirst({
        where: { externalUserId: ctx.user.id, role: UserRole.ADMIN },
      });

      if (!!isAdmin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not an Administrator!",
        });
      }

      const categories = await ctx.db.category.findMany({
        where: {
          parentCategoryId: input.id ?? null,
        },
      });
      return categories;
    }),
  createCategory: protectedProcedure
    .input(z.object({ id: z.optional(z.string()), name: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      const isAdmin = await ctx.db.user.findFirst({
        where: { externalUserId: ctx.user.id, role: UserRole.ADMIN },
      });

      if (!!isAdmin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not an Administrator!",
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
      const isAdmin = await ctx.db.user.findFirst({
        where: { externalUserId: ctx.user.id, role: UserRole.ADMIN },
      });

      if (!!isAdmin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not an Administrator!",
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
      const isAdmin = await ctx.db.user.findFirst({
        where: { externalUserId: ctx.user.id, role: UserRole.ADMIN },
      });

      if (!!isAdmin) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "You are not an Administrator!",
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
