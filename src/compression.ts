import { Elysia } from "elysia";
import { gzip } from "node:zlib";
import { promisify } from "node:util";

const encoder = new TextEncoder();
const zip = promisify(gzip);

export const compression = new Elysia().mapResponse(
  { as: "scoped" },
  async ({ response, set, path }) => {
    if (path.includes("swagger")) {
      return response;
    }
    const isJson = typeof response === "object";

    const text = isJson ? JSON.stringify(response) : response?.toString() ?? "";

    set.headers["Content-Encoding"] = "gzip";

    const zipped = await zip(encoder.encode(text));

    return new Response(zipped, {
      headers: {
        "Content-Type": `${
          isJson ? "application/json" : "text/plain"
        }; charset=utf-8`,
      },
    });
  }
);
