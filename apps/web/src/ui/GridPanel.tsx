import React from "react";

interface PanelProps {
  children: React.ReactNode;
}

export const GridPanel: React.FC<PanelProps> = ({ children }) => {
  return <div className={`flex flex-col w-full`}>{children}</div>;
};

export const FixedGridPanel: React.FC<PanelProps> = ({ children }) => {
  return (
    <div className={`flex flex-col pt-3 flex-1 sticky top-0 h-screen`}>
      {children}
    </div>
  );
};
