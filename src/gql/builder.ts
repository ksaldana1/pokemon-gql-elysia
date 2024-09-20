import SchemaBuilder from "@pothos/core";
import RelayPlugin from "@pothos/plugin-relay";

const builder = new SchemaBuilder<{
  // Type of the context object
  Context: {};
}>({
  plugins: [RelayPlugin],
  relay: {},
});

export default builder;
