import "@mantine/core/styles.css";
import type { PropsWithChildren } from "react";
import React from "react";
import { MantineProvider, ColorSchemeScript, Container } from "@mantine/core";
import { theme } from "../../theme";
import "../lib/apolloClient";
import { AppHeader } from "@/components/layout/AppHeader";
import { ApolloWrapper } from "@/components/layout/ApolloWrapper";
import { headers } from "next/headers";
import "./globals.css";

export const metadata = {
  title: "SkillStacker",
};

export default function RootLayout({ children }: PropsWithChildren) {
  const header_url = headers().get("x-url") || "";
  const regex = "auth$";
  const showHeader = !header_url.match(regex);

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} defaultColorScheme="dark">
          <Container size="sm" h="100%">
            <ApolloWrapper>
              {showHeader && <AppHeader />}
              {children}
            </ApolloWrapper>
          </Container>
        </MantineProvider>
      </body>
    </html>
  );
}
