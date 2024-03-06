import type { MutationResolvers } from "@/generated";
import prisma from "../../../../../../prisma";
import { Prisma } from "@prisma/client";
import { authInvariant } from "../../services/users";

export const updateUserSkills: MutationResolvers["updateUserSkills"] = async (
  _,
  { input: { skills } },
  { user },
) => {
  authInvariant(user);
  const userSkills = await prisma.$transaction(
    skills.map(
      (skill) =>
        prisma.userSkill.update({
          where: {
            userId_skillId: {
              userId: Number(user.id),
              skillId: Number(skill.id),
            },
          },
          data: {
            experienceValue: skill.experienceValue,
            likeValue: skill.likeValue,
            skillId: Number(skill.id),
          },
        }),
      {
        isolationLevel: Prisma.TransactionIsolationLevel.Serializable,
      },
    ),
  );
  return userSkills.map((userSkill) => userSkill.id);
};
