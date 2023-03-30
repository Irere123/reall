import React from "react";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { MainInnerGrid } from "../../ui/MainGrid";
import { RightPanel } from "./GridPanels";

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
  const screenType = useScreenType();

  let middle = null;
  let prepend = null;

  switch (screenType) {
    case "3-cols":
      middle = (
        <>
          {leftPanel}
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "2-cols":
      middle = (
        <>
          {leftPanel}
          {children}
          <RightPanel>{rightPanel}</RightPanel>
        </>
      );
      break;
    case "1-cols":
      middle = (
        <>
          {leftPanel}
          {children}
        </>
      );
      break;
    case "fullscreen":
      prepend = <></>;
      middle = <>{children}</>;
  }

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
