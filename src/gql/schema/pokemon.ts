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

const POKEMON_TYPES = [
  "Normal",
  "Fighting",
  "Flying",
  "Poison",
  "Ground",
  "Rock",
  "Bug",
  "Ghost",
  "Steel",
  "Fire",
  "Water",
  "Grass",
  "Electric",
  "Psychic",
  "Ice",
  "Dragon",
  "Dark",
  "Fairy",
] as const;

export const PokemonType = builder.enumType("PokemonType", {
  values: POKEMON_TYPES,
});

export const PokemonRef = builder.objectRef<Pokemon>("Pokemon").implement({
  description: "Pokemon base type",
  fields: (t) => ({
    id: t.exposeInt("id"),
    identifier: t.string({
      resolve: ({ identifier }) => {
        return identifier.charAt(0).toUpperCase() + identifier.slice(1);
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
