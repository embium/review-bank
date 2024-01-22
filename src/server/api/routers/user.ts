import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

import { UserRole } from "@prisma/client";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  isAdmin: protectedProcedure.output(z.boolean()).query(async ({ ctx }) => {
    const isAdmin = await ctx.db.user.findUnique({
      where: { externalUserId: ctx.user.id, role: UserRole.ADMIN },
    });
    return !!isAdmin as boolean;
  }),

  currentUser: protectedProcedure.query(async ({ ctx }) => {
    return ctx.user.id;
  }),

  checkExistence: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.db.user.findUnique({
      where: { externalUserId: ctx.user.id },
    });

    if (user) return true;
  }),

  createUser: protectedProcedure
    .input(z.object({ username: z.string().min(2) }))
    .mutation(async ({ ctx, input }) => {
      const userExistence = await ctx.db.user.findUnique({
        where: { externalUserId: ctx.user.id },
      });

      if (!!userExistence) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User already exist",
        });
      }

      const usernameExistence = await ctx.db.user.findUnique({
        where: { username: input.username },
      });

      if (!!usernameExistence) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

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
