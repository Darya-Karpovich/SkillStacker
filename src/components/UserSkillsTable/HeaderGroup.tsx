import { Group, Title } from "@mantine/core";
import React from "react";

export function HeaderGroup() {
  return (
    <Group grow>
      <Title order={3}>Skill</Title>
      <Title order={3}>Experience</Title>
      <Title order={3}>Like</Title>
    </Group>
  );
}
