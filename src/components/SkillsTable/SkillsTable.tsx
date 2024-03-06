"use client";
import { SkillRow } from "@/components/SkillsTable/SkillRow";
import { TableHeader } from "@/components/SkillsTable/TableHeader";
import {
  useGetSkillsQuery,
  useGetUserSkillsWithUserDetailsQuery,
} from "@/generated";
import { Box, Select, Stack } from "@mantine/core";
import { useMemo } from "react";

export const SkillsTable = () => {
  const userSkills = useGetUserSkillsWithUserDetailsQuery();
  const skills = useGetSkillsQuery();
  const skillValues = useMemo(
    () =>
      skills.data?.skills.map(({ id, name }) => ({
        value: id.toString(),
        label: name,
      })) ?? [],
    [skills.data]
  );

  return (
    <Box w="100%">
      <Select
        label="Filter by skill"
        placeholder="Pick skill"
        data={skillValues}
        w={200}
        searchable
      />
      <Stack
        p="lg"
        my="sm"
        style={{ border: "1px solid grey", borderRadius: 10 }}
      >
        <TableHeader />
        {userSkills.data?.userSkillsWithUserDetails.map((userSkill) => (
          <SkillRow key={userSkill.id} userSkill={userSkill} />
        ))}
      </Stack>
    </Box>
  );
};
