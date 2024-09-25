import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";
import type { pokemonLoader, pokemonTypeLoader } from "../db/loaders";
import type { DB } from "../db/client";

const builder = new SchemaBuilder<{
  Context: {
    pokemonLoader: ReturnType<typeof pokemonLoader>;
    pokemonTypeLoader: ReturnType<typeof pokemonTypeLoader>;
    db: DB;
  };
  DefaultFieldNullability: false;
}>({
  defaultFieldNullability: false,
  plugins: [RelayPlugin, SimpleObjectsPlugin],
  relay: {},
});

export default builder;
