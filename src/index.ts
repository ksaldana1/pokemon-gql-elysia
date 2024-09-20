import { Elysia } from "elysia";
import { yoga } from "@elysiajs/graphql-yoga";
import schema from "./gql/schema";

const PORT = 3000;

const app = new Elysia({ serve: { port: PORT } }).use(
  yoga({
    schema,
  })
);

export default app;

console.log(`Listening on port ${PORT} 🚀`);
