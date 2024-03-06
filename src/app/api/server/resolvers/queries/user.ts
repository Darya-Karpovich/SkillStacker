import type { QueryResolvers } from "@/generated";
import prisma from "../../../../../../prisma";

export const user: QueryResolvers["user"] = (_, { input: { id } }) => {
  return prisma.user.findUniqueOrThrow({
    where: { id: Number(id) },
  });
};
