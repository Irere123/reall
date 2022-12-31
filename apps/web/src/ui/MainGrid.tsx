import React from "react";

interface DashboardGridProps {
  className?: string;
  children?: React.ReactNode;
}

export const MainInnerGrid: React.FC<DashboardGridProps> = ({
  children,
  className = "",
}) => {
  let gridTemplateColumns = "70px 600px";

  return (
    <div
      id="main"
      className={`flex relative sm:grid ${className}`}
      style={{
        gridTemplateColumns,
        columnGap: 40,
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
