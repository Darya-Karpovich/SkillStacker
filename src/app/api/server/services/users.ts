import type { LoginUserInput } from "@/generated";
import prisma from "../../../../../prisma";
import { compareSync } from "bcrypt";
import type { User } from "@prisma/client";
import { sign } from "jsonwebtoken";
import type { CustomJWTPayload } from "../../graphql/route";

export const login = async ({ email, password }: LoginUserInput) => {
  const user = await prisma.user.findUniqueOrThrow({ where: { email } });
  const isPasswordValid = compareSync(password, user.password);
  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }
  const payload: CustomJWTPayload = { id: user.id, email: user.email };
  return sign(payload, process.env.JWT_SECRET!, { expiresIn: "30d" });
};

export function authInvariant(user: User | null): asserts user {
  if (!user) throw new Error("Unauthorized");
}
