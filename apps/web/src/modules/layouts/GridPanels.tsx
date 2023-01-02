import React from "react";
import { GridPanel } from "../../ui/GridPanel";

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
            ? `flex sticky w-full flex-col z-10 bg-primary-1 mb-6 pt-3`
            : ""
        }
      >
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  );
};
