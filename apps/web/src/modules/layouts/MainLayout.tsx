import React from "react";
import { MainInnerGrid } from "../../ui/MainGrid";
import { Sidebar } from "./Sidebar";

export interface MainLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  sidebar = <Sidebar />,
}) => {
  let middle = (
    <>
      {sidebar}
      {children}
    </>
  );
  let prepend = null;

  return (
    <>
      <div className={`fixed left-0 w-full z-10`} style={{ top: 0 }}>
        {prepend}
      </div>
      <div
        className={`flex flex-col sm:m-3 items-center w-full scrollbar-thin scrollbar-thumb-primary-2 ${
          prepend ? "mt-8 mb-7" : ""
        }`}
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
