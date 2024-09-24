import DataLoader from "dataloader";
import { client } from "./client";
import { PokemonType } from "../gql/schema/pokemon";

export const pokemonLoader = new DataLoader(async (keys: readonly number[]) => {
  const { data } = await client.from("pokemon").select("*").in("id", keys);
  return keys.map((key) => data?.find((row) => row?.id === key));
});

type PokeType = (typeof PokemonType)["$inferType"];

export const pokemonTypeLoader = new DataLoader(
  async (
    keys: readonly number[]
  ): Promise<[primary: PokeType, secondary: PokeType][]> => {
    const { data } = await client
      .from("pokemon_with_type")
      .select("id, type")
      .in("id", keys);

    if (!data) {
      return [];
    }

    const grouped = Object.groupBy(data, (d) => d.id ?? "");

    const ret = keys.map((key) =>
      (grouped[key] ?? [{ type: "unknown" }])
        ?.map((types) => types.type ?? "unknown")
        .map((t) => {
          return t.charAt(0).toUpperCase() + t.slice(1);
        })
    ) as Array<[PokeType, PokeType]>;

    return ret;
  }
);
