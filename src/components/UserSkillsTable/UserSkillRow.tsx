import { Group, Flex, Box, Rating, Text, Checkbox } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";
import type { Skill } from "@/generated";
import { Action } from "./UserSkillsTable";

interface Props {
  skill: Skill;
  actionType: Action | null;
  onEdit: (id: number, value: number, valueName: string) => void;
  onChangeSelectedSkills: (id: number, checked: boolean) => void;
}

export const UserSkillRow = ({
  skill,
  actionType,
  onEdit,
  onChangeSelectedSkills,
}: Props) => {
  const isEdit = actionType === Action.Edit;

  return (
    <Group grow style={{ borderTop: "1px solid grey" }} pt="md">
      <Flex gap={10}>
        {actionType === Action.Delete && (
          <Checkbox
            key={skill.id}
            onChange={(event) =>
              onChangeSelectedSkills(skill.id, event.target.checked)
            }
          />
        )}
        <Text>{skill.name}</Text>
      </Flex>
      <Box>
        <Rating
          fractions={2}
          value={skill.experienceValue}
          onChange={(value) => onEdit(skill.id, value, "experienceValue")}
          readOnly={!isEdit}
        />
      </Box>
      <Box>
        <Rating
          fractions={2}
          emptySymbol={<IconHeart color="grey" size={18} />}
          fullSymbol={<IconHeart color="red" size={18} />}
          value={skill.likeValue}
          onChange={(value) => onEdit(skill.id, value, "likeValue")}
          readOnly={!isEdit}
        />
      </Box>
    </Group>
  );
};
