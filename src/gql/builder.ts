import SchemaBuilder from "@pothos/core";

const builder = new SchemaBuilder<{
  // Type of the context object
  Context: {};
}>({
  // plugins may add options that can  be provided here
});

export default builder;
