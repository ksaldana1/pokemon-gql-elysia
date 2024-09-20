import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";
import SimpleObjectsPlugin from "@pothos/plugin-simple-objects";

const builder = new SchemaBuilder<{
  // Type of the context object
  Context: {};
}>({
  plugins: [RelayPlugin, SimpleObjectsPlugin],
  relay: {},
});

export default builder;
