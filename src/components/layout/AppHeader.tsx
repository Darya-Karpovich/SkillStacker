"use client";

import { useGetCurrentUserQuery } from "@/generated";
import {
  Flex,
  Menu,
  ActionIcon,
  Text,
  LoadingOverlay,
  Button,
} from "@mantine/core";
import { IconUser } from "@tabler/icons-react";
import { useRouter } from "next/navigation";

export const AppHeader = () => {
  const { data, loading, error } = useGetCurrentUserQuery();

  const onLogout = () => {
    localStorage.removeItem("token");
    router.push("/auth");
  };
  const router = useRouter();
  if (loading || error) return <LoadingOverlay visible />;

  return (
    <Flex w="100%" py="lg" justify="space-between">
      <Button onClick={() => router.push("/")} variant="transparent">
        SkillStacker
      </Button>
      <Flex gap={10}>
        <Text>
          {data?.currentUser?.name} {data?.currentUser.surname}
        </Text>
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <ActionIcon variant="outline">
              <IconUser />
            </ActionIcon>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item onClick={() => router.push(`/${data?.currentUser.id}`)}>
              Profile
            </Menu.Item>
            <Menu.Item onClick={onLogout}>Log out</Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Flex>
    </Flex>
  );
};
