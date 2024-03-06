"use client";

import type { CreateUserInput, LoginUserInput } from "@/generated";
import { useCreateUserMutation, useLoginUserMutation } from "@/generated";
import {
  Box,
  Card,
  Center,
  Flex,
  LoadingOverlay,
  Tabs,
  Title,
} from "@mantine/core";
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { useRouter } from "next/navigation";

export const AuthCard = () => {
  const [activeTab, setActiveTab] = useState<"login" | "register" | null>(
    "login",
  );
  const router = useRouter();

  const [createUser, { loading: isCreatingUser }] = useCreateUserMutation();
  const [loginUser, { loading: isLoggingIn }] = useLoginUserMutation();

  const registerUser = async (values: CreateUserInput) => {
    const { data } = await createUser({ variables: { input: values } });
    if (data?.createUser) {
      localStorage.setItem("token", data.createUser);
      router.push("/");
    }
  };
  const login = async (values: LoginUserInput) => {
    const { data } = await loginUser({
      variables: { input: values },
    });
    if (data?.loginUser) {
      localStorage.setItem("token", data.loginUser);
      router.push("/");
    }
  };
  return (
    <>
      <Box pos="relative">
        <LoadingOverlay
          visible={isCreatingUser || isLoggingIn}
          zIndex={1000}
          overlayProps={{ radius: "sm", blur: 2 }}
        />
        {/* ...other content */}
      </Box>
      <Card maw={500} shadow="sm" padding="lg" radius="md" withBorder miw={300}>
        <Center>
          <Title order={3}>Skills</Title>
        </Center>
        <Flex direction="column" gap={20}>
          <Tabs
            value={activeTab}
            onChange={(v) => setActiveTab(v as "login" | "register" | null)}
          >
            <Center>
              <Tabs.List mb={20}>
                <Tabs.Tab value="login">Login</Tabs.Tab>
                <Tabs.Tab value="register">Register</Tabs.Tab>
              </Tabs.List>
            </Center>
            <Tabs.Panel value="login">
              <LoginForm login={login} />
            </Tabs.Panel>
            <Tabs.Panel value="register">
              <RegisterForm register={registerUser} />
            </Tabs.Panel>
          </Tabs>
        </Flex>
      </Card>
    </>
  );
};
