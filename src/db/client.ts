import { createClient } from "@supabase/supabase-js";
import { type Database } from "./database.types";

export const client = createClient<Database>(
  import.meta.env.API_HOST,
  import.meta.env.API_KEY
);
