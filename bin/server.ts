import { client } from "../src/db/client";
import { app } from "../src/index";

const PORT = 3030;

app({
  db: client(import.meta.env.SUPABASE_URL, import.meta.env.SUPABASE_KEY),
}).listen(PORT);

console.log(`Listening on port ${PORT} 🚀`);
