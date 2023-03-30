import React from "react";
import { FixedGridPanel, GridPanel } from "../../ui/GridPanel";

interface PanelProps {
  children: React.ReactNode;
}

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

export const RightPanel: React.FC<PanelProps> = ({ children }) => {
  return <FixedGridPanel>{children}</FixedGridPanel>;
};
