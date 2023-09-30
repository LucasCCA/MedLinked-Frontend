"use client";

import { Container, Header, Navbar } from "@medlinked/components";
import { GlobalStyle, theme } from "@medlinked/config";
import { StyledComponentsRegistry } from "@medlinked/lib";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "styled-components";
import { ContentContainer } from "./styles";

const roboto = Roboto({
  weight: ["100", "300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={roboto.className}>
      <head>
        <title>MedLinked</title>
        <link rel="icon" type="image/x-icon" href="/images/icon.png" />
      </head>
      <body>
        <StyledComponentsRegistry>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            <ContentContainer>
              <Navbar />
              <Header username="Lucas">
                <Container>{children}</Container>
              </Header>
            </ContentContainer>
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
