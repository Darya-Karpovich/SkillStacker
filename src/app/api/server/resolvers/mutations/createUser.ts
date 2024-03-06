import bcrypt from "bcrypt";
import prisma from "../../../../../../prisma";
import type { MutationResolvers } from "../../../../../generated";
import { sign } from "jsonwebtoken";

export const createUser: MutationResolvers["createUser"] = async (
  _,
  { input: { email, password, name, surname } },
) => {
  const hashedPassword = bcrypt.hashSync(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      surname,
    },
  });
  const payload = { id: user.id, email: user.email };
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: "30d" });
};
