import DataLoader from "dataloader";
import { client } from "./client";

export const pokemonTypeLoader = new DataLoader(
  async (keys: readonly number[]) => {
    const { data } = await client
      .from("pokemon_with_type")
      .select("id, type")
      .in("id", keys);

    return keys.map((key) => data?.find((row) => row?.id === key)?.type ?? "");
  }
);
