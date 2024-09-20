import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import schema from "./gql/schema";

const port = 3000;

const app = new Elysia({ serve: { port } })
  .use(
    yoga({
      schema,
    })
  )
  .get("/health", () => {
    return "OK";
  });

export default app;

console.log(`Listening on port ${port} 🚀`);
