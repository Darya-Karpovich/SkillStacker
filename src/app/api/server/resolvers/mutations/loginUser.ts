import { login } from "@/app/api/server/services/users";
import type { MutationResolvers } from "@/generated";

export const loginUser: MutationResolvers["loginUser"] = (_, { input }) =>
  login(input);
