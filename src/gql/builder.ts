import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import type { pokemonLoader, pokemonTypeLoader } from "../db/loaders";
import type { DB } from "../db/client";

export type Context = {
  pokemonLoader: ReturnType<typeof pokemonLoader>;
  pokemonTypeLoader: ReturnType<typeof pokemonTypeLoader>;
  db: DB;
};

const builder = new SchemaBuilder<{
  Context: Context;
  DefaultFieldNullability: false;
}>({
  defaultFieldNullability: false,
  plugins: [RelayPlugin, SimpleObjectsPlugin],
  relay: {},
});

export default builder;
