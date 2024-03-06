"use client";
import { DataTable } from "@/components/Table/Table";
import { columns } from "@/components/Table/columns";
import { useGetUserSkillsWithUserDetailsQuery } from "@/generated";

export default function Home() {
  const userSkills = useGetUserSkillsWithUserDetailsQuery();

  return (
    <DataTable
      columns={columns}
      data={userSkills.data?.userSkillsWithUserDetails || []}
    />
  );
}
