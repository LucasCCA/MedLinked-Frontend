"use client";

import { Dispatch, SetStateAction } from "react";
import { CustomText } from "..";
import { TabItemContainer, TabsItemsContainer } from "./styles";

type ItemProps = {
  id: number;
  label: string;
};

type TabsProps = {
  items: ItemProps[];
  currentItemId: number;
  changeCurrentItemId: Dispatch<SetStateAction<number>>;
  disabledItemsIds?: number[];
};

export function Tabs({
  items,
  currentItemId,
  changeCurrentItemId,
  disabledItemsIds,
}: TabsProps) {
  return (
    <TabsItemsContainer>
      {items.map((item, index) => (
        <TabItemContainer
          key={item.id}
          $firstItem={index == 0}
          $lastItem={index == items.length - 1}
          $selected={currentItemId == item.id}
          $disabled={disabledItemsIds?.includes(item.id)}
          onClick={() => changeCurrentItemId(item.id)}
        >
          <CustomText $size="h3">{item.label}</CustomText>
        </TabItemContainer>
      ))}
    </TabsItemsContainer>
  );
}
