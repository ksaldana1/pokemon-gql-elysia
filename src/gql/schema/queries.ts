import builder from "../builder";
import { PokemonRef } from "./pokemon";
import { client } from "../../db/client";

builder.queryType({
  fields: (t) => ({
    pokemon: t.field({
      type: t.listRef(PokemonRef),
      resolve: async () => {
        const { data } = await client.from("pokemon").select("*").order("id");
        return data ?? [];
      },
    }),
  }),
});
