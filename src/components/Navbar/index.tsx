import { Calendar, Menu, Stethoscope, User2 } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CustomLink, CustomText } from "..";
import {
  AvoidNavbarContainer,
  BlueContainer,
  LogoContainer,
  NavbarContainer,
  NavigationContainer,
} from "./styles";

export function Navbar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(true);

  function getLinkColor(url: string) {
    if (pathname != url) return "black_80";
  }

  return (
    <>
      <AvoidNavbarContainer $expanded={expanded} />
      <NavbarContainer $expanded={expanded}>
        <BlueContainer $expanded={expanded}>
          <LogoContainer>
            {expanded && (
              <Image
                src="/images/logo.png"
                alt="Logo Medlinked"
                width={31}
                height={31}
              />
            )}
            <CustomText $color="white" $size="h3" $weight={500}>
              {expanded && <>MedLinked</>}
            </CustomText>
          </LogoContainer>
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
        </NavigationContainer>
      </NavbarContainer>
    </>
  );
}
