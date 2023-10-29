"use client";

import { Container, Header, Navbar } from "@medlinked/components";
import { TokenData } from "@medlinked/types";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { ContentContainer } from "./styles";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [name, setName] = useState("");

  useEffect(() => {
    if (Cookies.get("token"))
      setName(jwt_decode<TokenData>(Cookies.get("token")!).nome);
  }, []);

  return (
    <ContentContainer>
      <Navbar />
      <Header username={name}>
        <Container>{children}</Container>
      </Header>
    </ContentContainer>
  );
}
