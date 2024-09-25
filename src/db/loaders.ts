import DataLoader from "dataloader";
import { type DB } from "./client";
import type { TPokemonType } from "../gql/schema/pokemon";

export const pokemonLoader = (db: DB) =>
  new DataLoader(async (keys: readonly number[]) => {
    const { data } = await db.from("pokemon").select("*").in("id", keys);
    return keys.map((key) => data?.find((row) => row?.id === key));
  });

export const pokemonTypeLoader = (db: DB) =>
  new DataLoader(
    async (
      keys: readonly number[]
    ): Promise<[primary: TPokemonType, secondary: TPokemonType][]> => {
      const { data } = await db
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
      ) as Array<[TPokemonType, TPokemonType]>;

      return ret;
    }
  );
