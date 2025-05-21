'use client';

import { NavItem } from "../molecules/NavItem";
import { Divider } from "../atoms/Divider";
import React from "react";

export interface AsideProps {
  menuData: Record<string, any>;
  isDark?: boolean;
  selectedId: string;
  onSelect: (id: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
  className?: string;
}

export const Aside = ({
  menuData,
  isDark = false,
  selectedId,
  onSelect,
  isOpen = true,
  onClose = () => { },
  className = "",
}: AsideProps) => {
  const color = isDark ? "bg-dark-900 text-white-50" : "bg-white-50 text-dark-950";

  return (
    <>
      {/* Mobile overlay when sidebar is open */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={onClose}
        />
      )}

      <aside
        className={`${color} h-screen flex flex-col items-center transition-all duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          } md:w-[17.56%] w-[75%] ${className}`}
      >
        <div className="flex w-full justify-between md:justify-center items-center py-5">
          <h1 className="text-primary-600 font-bold px-5">VA<span className={color}>CS</span></h1>
          <button
            className="md:hidden px-5 text-2xl"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="w-full flex flex-col h-full justify-between overflow-y-auto">
          <div className="w-full">
            {Object.values(menuData.header).map((item: any) => (
              <NavItem
                to={item.path}
                key={item.id}
                isDark={isDark}
                label={item.text}
                icon={item.icon}
                isSelect={selectedId === item.id}
                onClick={() => onSelect(item.id)}
              />
            ))}

            {Object.values(menuData.main).map((section: any) => (
              <div key={section.id} className="w-full">
                <Divider isDark={isDark} />
                <h1 className="py-3 text-xs pl-5 md:pl-12 ml-1 uppercase">{section.text}</h1>

                <div>
                  {Object.values(section.subMenu).map((subItem: any) => (
                    <NavItem
                      to={subItem.path}
                      key={subItem.id}
                      isDark={isDark}
                      label={subItem.text}
                      icon={subItem.icon}
                      isSelect={selectedId === subItem.id}
                      onClick={() => onSelect(subItem.id)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="w-full">
            <Divider isDark={isDark} />
            <div className="pt-3">
              {Object.values(menuData.footer).map((item: any) => (
                <NavItem
                  to={item.path}
                  key={item.id}
                  isDark={isDark}
                  label={item.text}
                  icon={item.icon}
                  isSelect={selectedId === item.id}
                  onClick={() => onSelect(item.id)}
                />
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
