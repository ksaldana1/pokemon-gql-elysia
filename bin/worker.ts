import { createClient } from "@supabase/supabase-js";
import { type Database } from "../src/db/database.types";
import { app } from "../src/index";
import { type Env } from "bun";

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const supabase = createClient<Database>(env.SUPABASE_URL, env.SUPABASE_KEY);
    const server = app({ db: supabase });
    return server.fetch(request);
  },
};
