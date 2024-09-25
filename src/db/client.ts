import { createClient } from "@supabase/supabase-js";
import { type Database } from "./database.types";

export const client = (url: string, key: string) =>
  createClient<Database>(url, key);

export type DB = ReturnType<typeof client>;
