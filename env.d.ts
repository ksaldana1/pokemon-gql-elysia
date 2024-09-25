declare module "bun" {
  interface Env {
    SUPABASE_URL: string;
    SUPABASE_KEY: string;
  }
}
