import { authInvariant } from "@/app/api/server/services/users";
import type { SkillResolvers } from "@/generated";
import prisma from "../../../../../../prisma";

export const Skill: SkillResolvers = {
  experienceValue: async (skill, _, { user }) => {
    authInvariant(user);
    const userSkill = await prisma.userSkill.findFirst({
      where: {
        userId: user.id,
        skillId: skill.id,
      },
    });
    return Number(userSkill?.experienceValue ?? 0);
  },
  likeValue: async (skill, _, { user }) => {
    authInvariant(user);
    const userSkill = await prisma.userSkill.findFirst({
      where: {
        userId: user.id,
        skillId: skill.id,
      },
    });
    return Number(userSkill?.likeValue ?? 0);
  },
};
