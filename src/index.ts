import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import schema from "./gql/schema";
import { pokemonLoader, pokemonTypeLoader } from "./db/loaders";
import type { DB } from "./db/client";

const port = 3030;

export const app = (db: DB) =>
  new Elysia({ serve: { port } })
    .use(
      yoga({
        schema,
        context: async () => {
          return {
            pokemonLoader: pokemonLoader(db),
            pokemonTypeLoader: pokemonTypeLoader(db),
          };
        },
      })
    )
    .get("/health", () => {
      return "OK";
    })
    .listen(port);

export type App = typeof app;

console.log(`Listening on port ${port} 🚀`);
