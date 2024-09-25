import { client } from "../src/db/client";
import { app } from "../src/index";

app({ db: client });
