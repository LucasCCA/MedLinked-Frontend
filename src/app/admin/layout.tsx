"use client";

import { Container, Header, Navbar } from "@medlinked/components";
import { useRouter } from "next/navigation";
import { ContentContainer } from "./styles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  if (!localStorage.getItem("token")) {
    router.push("/");
  }

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
