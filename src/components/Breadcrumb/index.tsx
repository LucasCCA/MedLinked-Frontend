"use client";

import { ArrowLeft } from "lucide-react";
import { Fragment } from "react";
import { CustomLink, CustomText } from "..";
import { BreadcrumbItemsContainer } from "./styles";

type BreadcrumbItem = {
  label: string;
  href: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <BreadcrumbItemsContainer>
      <CustomLink href={items[items.length - 2].href} $color="black_80">
        <ArrowLeft size={25} />
      </CustomLink>
      {items.map((item, index) =>
        index != items.length - 1 ? (
          <Fragment key={index}>
            <CustomLink href={item.href} $color="black_60">
              {item.label}
            </CustomLink>
            <CustomText>/</CustomText>
          </Fragment>
        ) : (
          <CustomText key={index}>{item.label}</CustomText>
        ),
      )}
    </BreadcrumbItemsContainer>
  );
}
