"use client";

import { useWindowWidth } from "@react-hook/window-size";
import { Calendar, Menu, ShieldPlus, Stethoscope, User2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { CustomLink, CustomText } from "..";
import {
  AvoidNavbarContainer,
  BlueContainer,
  LogoContainer,
  NavbarContainer,
  NavigationContainer,
  Overlay,
} from "./styles";

export function Navbar() {
  const width = useWindowWidth() || 769;
  const [expanded, setExpanded] = useState(width > 768);
  const pathname = usePathname();
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (width < 768) setExpanded(false);
    },
  });

  function getLinkColor(url: string) {
    if (
      (url == "/admin" && pathname != url) ||
      !pathname.toLowerCase().includes(url.toLowerCase())
    )
      return "black_80";
  }

  return (
    <>
      <Overlay $expanded={expanded} />
      <AvoidNavbarContainer $expanded={expanded} />
      <NavbarContainer $expanded={expanded} ref={ref}>
        <BlueContainer $expanded={expanded}>
          <CustomLink href="/admin">
            <LogoContainer>
              {expanded && (
                <Image
                  src="/images/icon.png"
                  alt="Logo Medlinked"
                  width={30}
                  height={30}
                  quality={100}
                  priority
                />
              )}
              <CustomText $color="white" $size="h3" $weight={500}>
                {expanded && <>MedLinked</>}
              </CustomText>
            </LogoContainer>
          </CustomLink>
          <Menu size={30} onClick={() => setExpanded(!expanded)} />
        </BlueContainer>
        <NavigationContainer $expanded={expanded}>
          <CustomLink href="/admin" $color={getLinkColor("/admin")}>
            <Calendar size={25} />
            {expanded && <>Agenda</>}
          </CustomLink>
          <CustomLink href="/admin/medicos" $color={getLinkColor("/medicos")}>
            <Stethoscope />
            {expanded && <>Médico</>}
          </CustomLink>
          <CustomLink
            href="/admin/pacientes"
            $color={getLinkColor("/pacientes")}
          >
            <User2 />
            {expanded && <>Paciente</>}
          </CustomLink>
          <CustomLink
            href="/admin/convenios"
            $color={getLinkColor("/convenios")}
          >
            <ShieldPlus />
            {expanded && <>Convênio</>}
          </CustomLink>
        </NavigationContainer>
      </NavbarContainer>
    </>
  );
}
