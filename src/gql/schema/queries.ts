import builder from "../builder";
import { PokemonRef } from "./pokemon";

builder.queryType({
  fields: (t) => ({
    pokemons: t.field({
      type: [PokemonRef],
      resolve: async (_, __, { db }) => {
        const { data } = await db
          .from("pokemon")
          .select("*")
          .order("id")
          .limit(151);

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
