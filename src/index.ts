import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import schema from "./gql/schema";

const PORT = 3000;

export const app = new Elysia()
  .use(
    yoga({
      schema,
    })
  )
  .listen(PORT);

console.log(`Listening on port ${PORT} 🚀`);

