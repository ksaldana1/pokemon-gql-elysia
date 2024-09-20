import builder from "../builder";
import { type Database } from "../../db/database.types";
import { pokemonTypeLoader } from "../../db/loaders";

type Pokemon = Database["public"]["Tables"]["pokemon"]["Row"];

export const PokemonRef = builder.objectRef<Pokemon>("Pokemon").implement({
  description: "Pokemon base type",
  fields: (t) => ({
    id: t.exposeInt("id"),
    identifier: t.string({
      resolve: (parent) => {
        const [first, ...rest] = parent.identifier.split("");
        return [first.toUpperCase(), ...rest].join("");
      },
    }),
    weight: t.exposeInt("weight"),
    height: t.exposeInt("height"),
    baseExperience: t.exposeInt("base_experience"),
    type: t.string({
      resolve: async (parent) => {
        return await pokemonTypeLoader.load(parent.id);
      },
    }),
  }),
});
