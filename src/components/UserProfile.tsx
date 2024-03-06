"use client";

import { LoadingOverlay } from "@mantine/core";
import {
  UserSkillsTable,
  withUserSkillFormProvider,
} from "./UserSkillsTable/UserSkillsTable";
import { useGetUserQuery } from "@/generated";

export const UserProfile = ({ userId }: { userId: string }) => {
  const { data, loading } = useGetUserQuery({
    variables: { input: { id: Number(userId) } },
  });
  if (loading) return <LoadingOverlay visible />;
  const skills = data?.user?.skills || [];
  return withUserSkillFormProvider(<UserSkillsTable skills={skills} />);
};
