import React from "react";

interface PanelProps {
  children: React.ReactNode;
}

export const GridPanel: React.FC<PanelProps> = ({ children }) => {
  return <div className={`flex flex-col flex-1 w-full`}>{children}</div>;
};

export const FixedGridPanel: React.FC<PanelProps> = ({ children }) => {
  return (
    <div className={`flex pt-5 flex-col flex-1 sticky top-0 h-screen`}>
      {children}
    </div>
  );
};

export const MiddlePanel: React.FC<
  PanelProps & { stickyChildren?: React.ReactNode }
> = ({ stickyChildren, children }) => {
  return (
    <GridPanel>
      <div
        className={
          !!stickyChildren
            ? `flex sticky w-full flex-col z-10 bg-primary-1 mb-6`
            : ""
        }
      >
        {stickyChildren}
      </div>
      {children}
    </GridPanel>
  );
};
