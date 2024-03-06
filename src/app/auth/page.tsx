"use client";

import { AuthCard } from "@/components/Auth/AuthCard";
import { apolloClient } from "@/lib/apolloClient";
import { ApolloProvider } from "@apollo/client";
import { Flex } from "@mantine/core";

export default function Auth() {
  return (
    <ApolloProvider client={apolloClient}>
      <Flex pt={200} justify="center">
        <AuthCard />
      </Flex>
    </ApolloProvider>
  );
}
