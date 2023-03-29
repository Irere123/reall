import React from "react";
import { GridPanel } from "../../ui/GridPanel";

interface PanelProps {
  children: React.ReactNode;
}

const HeaderWrapper: React.FC<PanelProps> = ({ children }) => (
  <div className={`flex mt-5 mb-7 h-6 items-center`}>{children}</div>
);

export const MiddlePanel: React.FC<
  PanelProps & { stickyChildren?: React.ReactNode }
> = ({ stickyChildren, children }) => {
  return (
    <GridPanel>
      <div
        className={
          !!stickyChildren
            ? `flex sticky w-full flex-col z-10 bg-primary-900 pt-5`
            : ""
        }
        style={{ top: "0px" }}
      >
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  );
};
