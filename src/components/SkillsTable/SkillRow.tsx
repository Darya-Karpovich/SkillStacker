import type { UserSkill } from "@/generated";
import { Box, Group, Rating, Text } from "@mantine/core";
import { IconHeart } from "@tabler/icons-react";

export const SkillRow = ({ userSkill }: { userSkill: UserSkill }) => {
  return (
    <Group grow style={{ borderTop: "1px solid grey" }} pt="md">
      <Text>{userSkill.user.name + " " + userSkill.user.surname}</Text>
      <Text>{userSkill.skill.name}</Text>
      <Box>
        <Rating
          fractions={2}
          value={userSkill.skill.experienceValue}
          readOnly
        />
      </Box>
      <Box>
        <Rating
          fractions={2}
          emptySymbol={<IconHeart color="grey" size={18} />}
          fullSymbol={<IconHeart color="red" size={18} />}
          value={userSkill.skill.likeValue}
          readOnly
        />
      </Box>
    </Group>
  );
};
