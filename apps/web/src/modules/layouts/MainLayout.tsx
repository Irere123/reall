import React from "react";
import { MainInnerGrid } from "../../ui/MainGrid";
import { RightPanel } from "./GridPanels";
import { Sidebar } from "./Sidebar";

export interface MainLayoutProps {
  rightPanel?: React.ReactNode;
  leftPanel?: React.ReactNode;
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
  children,
  leftPanel = <div />,
  rightPanel = <div />,
}) => {
  let middle = (
    <>
      {leftPanel}
      {children}
      <RightPanel>{rightPanel}</RightPanel>
    </>
  );
  let prepend = null;

  return (
    <>
      <div className={`fixed left-0 w-full z-10`} style={{ top: 0 }}>
        {prepend}
      </div>
      <div
        className={`flex flex-col items-center w-full scrollbar-thin scrollbar-thumb-primary-2 ${
          prepend ? "mt-8 mb-7" : ""
        }`}
      >
        <MainInnerGrid>{middle}</MainInnerGrid>
      </div>
    </>
  );
};
