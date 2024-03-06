import prisma from "../../../../../../prisma";

export const skills = () => {
  return prisma.skill.findMany();
};
