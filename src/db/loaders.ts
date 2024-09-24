import DataLoader from "dataloader";
import { client } from "./client";

export const pokemonLoader = new DataLoader(async (keys: readonly number[]) => {
  const { data } = await client.from("pokemon").select("*").in("id", keys);
  return keys.map((key) => data?.find((row) => row?.id === key));
});

export const pokemonTypeLoader = new DataLoader(
  async (keys: readonly number[]) => {
    const { data } = await client
      .from("pokemon_with_type")
      .select("id, type")
      .in("id", keys);

    if (!data) {
      return [];
    }

    const grouped = Object.groupBy(data, (d) => d.id);
    return keys.map((key) => data?.find((row) => row?.id === key)?.type ?? "");
  }
);
