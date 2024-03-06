import type { QueryResolvers } from "@/generated";
import prisma from "../../../../../../prisma";
import { authInvariant } from "@/app/api/server/services/users";

export const currentUser: QueryResolvers["currentUser"] = (
  _,
  input,
  { user },
) => {
  authInvariant(user);
  return prisma.user.findUniqueOrThrow({
    where: { id: user.id },
  });
};
