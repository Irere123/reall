import React from "react";

interface DashboardGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const MainInnerGrid: React.FC<DashboardGridProps> = ({
  children,
  className = "",
}) => {
  let gridTemplateColumns = "235px 550px 325px";

  return (
    <div
      id="main"
      className={`relative  ${className}`}
      style={{
        display: "grid",
        gridTemplateColumns,
        columnGap: 60,
      }}
    >
      {children}
    </div>
  );
};

export const MainGrid: React.FC<DashboardGridProps> = ({ children }) => {
  return (
    <div
      className={`flex justify-center w-full min-h-screen bg-primary-900`}
      data-testid="main-grid"
    >
      <MainInnerGrid>{children}</MainInnerGrid>
    </div>
  );
};
