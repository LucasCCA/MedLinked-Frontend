"use client";

import { GlobalStyle } from "@medlinked/config";
import StyledComponentsRegistry from "@medlinked/lib/registry";
import type { Metadata } from "next";

export const metadata: Metadata = {};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body>
        <GlobalStyle />
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
