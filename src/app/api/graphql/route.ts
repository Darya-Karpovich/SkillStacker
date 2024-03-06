import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "../server/resolvers";

import type { BaseContext } from "@apollo/server";
import { ApolloServer } from "@apollo/server";
import { typeDefs } from "@/app/api/server/schema";
import type { User } from "@prisma/client";
import prisma from "../../../../prisma";
import type { JwtPayload } from "jsonwebtoken";
import { verify } from "jsonwebtoken";
import type { NextApiRequest } from "next";

export type CustomApolloContext = BaseContext & {
  user: User | null;
};

const apolloServer = new ApolloServer<CustomApolloContext>({
  typeDefs,
  resolvers,
  nodeEnv: process.env.NODE_ENV,
});

export interface CustomJWTPayload extends JwtPayload {
  id: User["id"];
  email: User["email"];
}

const decodeTokenSafely = (token: string): CustomJWTPayload | null => {
  try {
    return verify(token, process.env.JWT_SECRET!) as CustomJWTPayload;
  } catch (error) {
    return null;
  }
};

const handler = startServerAndCreateNextHandler<
  NextApiRequest,
  CustomApolloContext
>(apolloServer, {
  context: async (req, res) => {
    const authorization = req.headers.get?.("authorization");
    if (!authorization) {
      return { req, res, user: null };
    }
    const token = authorization.replace("Bearer ", "");

    const decodedToken = decodeTokenSafely(token);
    if (!decodedToken) {
      return { req, res, user: null };
    }

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: decodedToken.id },
    });
    return { req, res, user };
  },
});

export { handler as GET, handler as POST };
