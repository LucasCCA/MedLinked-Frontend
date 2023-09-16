"use client";

import { GlobalStyle, theme } from "@medlinked/config";
import { StyledComponentsRegistry } from "@medlinked/lib";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ThemeProvider } from "styled-components";

const roboto = Roboto({
  weight: ["100", "300", "400", "500"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br" className={roboto.className}>
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
