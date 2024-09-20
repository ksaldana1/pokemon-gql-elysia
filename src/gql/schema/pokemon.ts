import builder from "../builder";
import { type Database } from "../../db/database.types";
import { pokemonTypeLoader } from "../../db/loaders";

type Pokemon = Database["public"]["Tables"]["pokemon"]["Row"];

const Dimensions = builder.simpleObject("Dimensions", {
  fields: (t) => ({
    height: t.int({ nullable: false }),
    weight: t.int({ nullable: false }),
  }),
});

export const PokemonRef = builder.objectRef<Pokemon>("Pokemon").implement({
  description: "Pokemon base type",
  fields: (t) => ({
    id: t.exposeInt("id"),
    identifier: t.string({
      resolve: ({ identifier }) => {
        const [first, ...rest] = identifier.split("");
        return [first.toUpperCase(), ...rest].join("");
      },
    }),
    dimensions: t.field({
      type: Dimensions,
      resolve: ({ height, weight }) => {
        return {
          height,
          weight,
        };
      },
    }),
    type: t.string({
      resolve: async ({ id }) => {
        return await pokemonTypeLoader.load(id);
      },
    }),
    baseExperience: t.exposeInt("base_experience"),
  }),
});
