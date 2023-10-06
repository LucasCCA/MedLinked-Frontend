"use client";

import { Container, Header, Navbar } from "@medlinked/components";
import { ContentContainer } from "./styles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <title>MedLinked - Agenda</title>
      </head>
      <body>
        <ContentContainer>
          <Navbar />
          <Header username="Lucas">
            <Container>{children}</Container>
          </Header>
        </ContentContainer>
      </body>
    </>
  );
}
