import builder from "../builder";
import { type Database } from "../../db/database.types";

type Pokemon = Database["public"]["Tables"]["pokemon"]["Row"];

const Dimensions = builder.simpleObject("Dimensions", {
  fields: (t) => ({
    height: t.int({ nullable: false }),
    weight: t.int({ nullable: false }),
  }),
});

const PokemonType = builder.simpleObject("PokemonType", {
  fields: (t) => ({
    primary: t.field({
      type: PokemonTypes,
    }),
    secondary: t.field({
      type: PokemonTypes,
      nullable: true,
    }),
  }),
});

export const POKEMON_TYPES = [
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
  "Unknown",
] as const;

export const PokemonTypes = builder.enumType("PokemonTypes", {
  values: POKEMON_TYPES,
});

export type TPokemonType = (typeof POKEMON_TYPES)[number];

export const PokemonRef = builder.objectRef<Pokemon>("Pokemon").implement({
  description: "Pokemon base type",
  fields: (t) => ({
    id: t.exposeInt("id"),
    name: t.string({
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
    type: t.field({
      type: PokemonType,
      resolve: async ({ id }, _, { pokemonTypeLoader }) => {
        const [primary, secondary] = await pokemonTypeLoader.load(id);
        return {
          primary,
          secondary,
        };
      },
    }),
    baseExperience: t.exposeInt("base_experience"),
    image_url: t.exposeString("image_url"),
  }),
});
