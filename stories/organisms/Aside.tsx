'use client';

import { NavItem } from "@molecules/NavItem";
import { Divider } from "@atoms/Divider";
import React from "react";

export interface AsideProps {
  menuData: Record<string, any>;
  isDark?: boolean;
  selectedId: string;
  onSelect: (id: string) => void;
}

export const Aside = ({ menuData, isDark = false, selectedId, onSelect }: AsideProps) => {
  const color = isDark ? "bg-dark-900 text-white-50" : "bg-white-50 text-dark-950";

  return (
    <aside className={`w-[17.56%] ${color} h-screen flex flex-col items-center`}>
      <h1 className="text-primary-600 font-bold py-5">VA<span className={color}>CS</span></h1>

      <div className="w-full flex flex-col h-full justify-between">
        <div className="w-full">
          {Object.values(menuData.header).map((item) => (
            <NavItem key={item.id} isDark={isDark} label={item.text} icon={item.icon} isSelect={selectedId === item.id} onClick={() => onSelect(item.id)} />
          ))}

          {Object.values(menuData.main).map((section) => (
            <div key={section.id} className="w-full">
              <Divider isDark={isDark} />
              <h1 className="py-3 text-xs pl-12 ml-1 uppercase">{section.text}</h1>

              <div>
                {Object.values(section.subMenu).map((subItem) => (
                  <NavItem key={subItem.id} isDark={isDark} label={subItem.text} icon={subItem.icon} isSelect={selectedId === subItem.id} onClick={() => onSelect(subItem.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="w-full">
          <Divider isDark={isDark} />
          <div className="pt-3">
            {Object.values(menuData.footer).map((item) => (
              <NavItem key={item.id} isDark={isDark} label={item.text} icon={item.icon} isSelect={selectedId === item.id} onClick={() => onSelect(item.id)} />
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
