import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import schema from "./gql/schema";
import { pokemonLoader, pokemonTypeLoader } from "./db/loaders";
import type { DB } from "./db/client";
import type { Context } from "./gql/builder";

export interface AppOptions {
  db: DB;
}

export const app = ({ db }: AppOptions) =>
  new Elysia({ aot: false })
    .use(
      yoga({
        schema,
        context: async (): Promise<Context> => {
          return {
            pokemonLoader: pokemonLoader(db),
            pokemonTypeLoader: pokemonTypeLoader(db),
            db,
          };
        },
      })
    )
    .get("/health", () => {
      return "OK";
    });

export type App = typeof app;
