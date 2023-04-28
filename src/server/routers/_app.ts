import { z } from "zod";
import { procedure, protectedProcedure, router } from "../trpc";

export const appRouter = router({
  hello: router({
    world: protectedProcedure.query(() => "world"),
  }),
});

export type AppRouter = typeof appRouter;
