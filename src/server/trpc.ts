import { connect } from "@planetscale/database";
import { initTRPC, TRPCError } from "@trpc/server";

import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { getServerSession } from "next-auth/next";
import { TypeOf } from "zod";
import { authOptions } from "../pages/api/auth/[...nextauth]";
import { drizzle } from "drizzle-orm/planetscale-serverless";

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const session = await getServerSession(req, res, authOptions);
  const connection = connect({
    host: process.env["DATABASE_HOST"],
    username: process.env["DATABASE_USERNAME"],
    password: process.env["DATABASE_PASSWORD"],
  });

  const db = drizzle(connection);

  if (!session) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }

  return {
    session,
    db,
    user: session?.user ?? null,
  };
};

const t = initTRPC.create();

const t1 = initTRPC.context<typeof createContext>().create();

const isAuthed = t1.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "You must be logged in to perform this action",
    });
  }

  return next({
    ctx,
  });
});

export const protectedProcedure = t1.procedure.use(isAuthed);
export const router = t.router;
export const procedure = t.procedure;
