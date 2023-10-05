"use client";

import { GlobalStyle, theme } from "@medlinked/config";
import { StyledComponentsRegistry } from "@medlinked/lib";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "styled-components";

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
            {children}
          </ThemeProvider>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
