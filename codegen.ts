import type { CodegenConfig } from "@graphql-codegen/cli";

import dotenv from "dotenv";
dotenv.config();

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/app/api/server/schema.ts",
  documents: "src/**/*.graphql",
  generates: {
    "src/generated.ts": {
      config: {
        contextType: "./app/api/graphql/route.ts#CustomApolloContext",
        scalars: {
          ID: "number",
        },
        mappers: {
          User: ".prisma/client#User as UserType",
          UserSkill: ".prisma/client#UserSkill as UserSkillType",
          Skill: ".prisma/client#Skill as SkillType",
        },
      },
      plugins: [
        "typescript",
        "typescript-resolvers",
        "typescript-operations",
        "typescript-react-apollo",
      ],
    },
  },
};

export default config;
