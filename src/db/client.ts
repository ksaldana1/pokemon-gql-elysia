import { createClient } from "@supabase/supabase-js";
import { type Database } from "./database.types";

export const client = createClient<Database>(
  "https://sdfrspogbiyhjkclkgpn.supabase.co",
  import.meta.env.API_KEY
);
