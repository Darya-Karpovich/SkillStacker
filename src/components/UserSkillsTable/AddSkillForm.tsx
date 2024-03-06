import { useGetSkillsQuery } from "@/generated";
import { Box, Group, Rating, Select } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import { useMemo } from "react";
import {
  useUserSkillFormContext,
  type AddUserSkillFormValues,
} from "./FormContext";

interface Props {
  onSubmit: ({
    skillId,
    experienceValue,
    likeValue,
  }: AddUserSkillFormValues) => void;
}

export const AddSkillForm = ({ onSubmit }: Props) => {
  const form = useUserSkillFormContext();
  const skills = useGetSkillsQuery({
    fetchPolicy: "cache-and-network",
    nextFetchPolicy: "cache-first",
  });
  const skillValues = useMemo(
    () =>
      skills.data?.skills.map(({ id, name }) => ({
        value: id.toString(),
        label: name,
      })) ?? [],
    [skills.data],
  );

  if (skills.loading) {
    return <div>Loading...</div>;
  }

  return (
    <form style={{ width: "100%" }} onSubmit={form.onSubmit(onSubmit)}>
      <Group grow style={{ borderTop: "1px solid grey" }} pt="md">
        <Select
          {...form.getInputProps("skillId")}
          placeholder="Select skill"
          data={skillValues}
          w={200}
          searchable
        />
        <Box>
          <Rating fractions={2} {...form.getInputProps("experienceValue")} />
        </Box>
        <Box>
          <Rating
            fractions={2}
            emptySymbol={<IconHeart color="gray" size={18} />}
            fullSymbol={<IconHeart color="red" size={18} />}
            {...form.getInputProps("likeValue")}
          />
        </Box>
      </Group>
    </form>
  );
};
