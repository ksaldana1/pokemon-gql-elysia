import builder from "../builder";
import { PokemonRef } from "./pokemon";
import { client } from "../../db/client";

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
      nullable: true,
      args: {
        id: t.arg.int({ required: true }),
      },
      resolve: async (_, args, { pokemonLoader }) => {
        return await pokemonLoader.load(args.id);
      },
    }),
  }),
});
