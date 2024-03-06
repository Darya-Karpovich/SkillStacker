import type { MutationResolvers } from "@/generated";
import prisma from "../../../../../../prisma";
import { authInvariant } from "../../services/users";

export const deleteUserSkills: MutationResolvers["deleteUserSkills"] = async (
  _,
  { input: { skillIds } },
  { user },
) => {
  authInvariant(user);
  await prisma.userSkill.deleteMany({
    where: {
      userId: user.id,
      skillId: { in: skillIds.map((id) => Number(id)) },
    },
  });
  return true;
};
