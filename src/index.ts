import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import schema from "./gql/schema";

const port = 3030;

export const app = new Elysia({ serve: { port } })
  .use(
    yoga({
      schema,
    })
  )
  .get("/health", () => {
    return "OK";
  })
  .listen(port);

export type App = typeof app;

console.log(`Listening on port ${port} 🚀`);
