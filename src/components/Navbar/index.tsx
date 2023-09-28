"use client";

import { Calendar, Menu, ShieldPlus, Stethoscope, User2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
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
  const windowWidth = useRef(window.innerWidth);
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(windowWidth.current > 768);
  const ref = useDetectClickOutside({
    onTriggered: () => {
      if (windowWidth.current < 768) setExpanded(false);
    },
  });

  function getLinkColor(url: string) {
    if (pathname != url) return "black_80";
  }

  return (
    <>
      <Overlay $expanded={expanded} />
      <AvoidNavbarContainer $expanded={expanded} />
      <NavbarContainer $expanded={expanded} ref={ref}>
        <BlueContainer $expanded={expanded}>
          <CustomLink href="/">
            <LogoContainer>
              {expanded && (
                <Image
                  src="/images/favicon.ico"
                  alt="Logo Medlinked"
                  width={31}
                  height={31}
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
          <CustomLink href="/" $color={getLinkColor("/")}>
            <Calendar size={25} />
            {expanded && <>Agenda</>}
          </CustomLink>
          <CustomLink href="/" $color={getLinkColor("/medico")}>
            <Stethoscope />
            {expanded && <>Médico</>}
          </CustomLink>
          <CustomLink href="/" $color={getLinkColor("/paciente")}>
            <User2 />
            {expanded && <>Paciente</>}
          </CustomLink>
          <CustomLink href="/" $color={getLinkColor("/plano")}>
            <ShieldPlus />
            {expanded && <>Convênio</>}
          </CustomLink>
        </NavigationContainer>
      </NavbarContainer>
    </>
  );
}
