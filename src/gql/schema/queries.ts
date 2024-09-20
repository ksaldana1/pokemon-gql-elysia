import builder from "../builder";
import { PokemonRef } from "./pokemon";
import { client } from "../../db/client";
import { pokemonLoader } from "../../db/loaders";

builder.queryType({
  fields: (t) => ({
    pokemons: t.field({
      type: [PokemonRef],
      resolve: async () => {
        const { data } = await client.from("pokemon").select("*").order("id");
        return data ?? [];
      },
    }),
    pokemon: t.field({
      type: PokemonRef,
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (_, args) => {
        return await pokemonLoader.load(args.id);
      },
    }),
  }),
});
