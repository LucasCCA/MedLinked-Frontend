"use client";

import { GlobalStyle, theme } from "@medlinked/config";
import { StyledComponentsRegistry } from "@medlinked/lib";
import { Roboto } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
        <meta
          name="description"
          content="Sistema de agendamento de consultas MedLinked"
        />
        <link rel="icon" type="image/x-icon" href="/images/icon.png" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>
        <ToastContainer />
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
