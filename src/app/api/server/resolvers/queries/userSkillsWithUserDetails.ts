import type { QueryResolvers } from "@/generated";
import prisma from "../../../../../../prisma";

export const userSkillsWithUserDetails: QueryResolvers["userSkillsWithUserDetails"] =
  () => {
    return prisma.userSkill.findMany({
      include: {
        user: true,
        skill: true,
      },
    });
  };
