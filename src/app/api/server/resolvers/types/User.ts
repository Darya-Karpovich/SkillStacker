import type { UserResolvers } from "@/generated";
import prisma from "../../../../../../prisma";

export const User: UserResolvers = {
  skills: (user) =>
    prisma.skill.findMany({
      where: {
        userSkill: {
          some: {
            userId: user.id,
          },
        },
      },
    }),
};
