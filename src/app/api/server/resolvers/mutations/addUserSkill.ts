import type { MutationResolvers } from "@/generated";
import prisma from "../../../../../../prisma";
import { authInvariant } from "@/app/api/server/services/users";

export const addUserSkill: MutationResolvers["addUserSkill"] = async (
  _,
  { input: { skillId, experienceValue, likeValue } },
  { user },
) => {
  authInvariant(user);
  const skill = await prisma.skill.findUniqueOrThrow({
    where: { id: Number(skillId) },
  });

  return prisma.userSkill
    .create({
      data: {
        experienceValue,
        likeValue,
        user: {
          connect: {
            id: user.id,
          },
        },
        skill: {
          connect: {
            id: skill.id,
          },
        },
      },
      include: {
        skill: true,
      },
    })
    .then((r) => r.skill);
};
