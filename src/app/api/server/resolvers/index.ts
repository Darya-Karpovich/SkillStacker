import * as Queries from "./queries";
import * as Mutation from "./mutations";
import * as types from "./types";

const resolvers = {
  Query: Queries,
  Mutation,
  ...types,
};

export { resolvers };
