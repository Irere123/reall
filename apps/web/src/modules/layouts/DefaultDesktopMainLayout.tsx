import React from "react";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { ProfileBlockController } from "../feed/ProfileBlockController";
import { MainLayout } from "./MainLayout";
import { Sidebar } from "./Sidebar";

interface DefaultDesktopLayoutProps {
  children?: React.ReactNode;
  mobileHeader?: React.ReactNode;
}

export const DefaultDesktopLayout: React.FC<DefaultDesktopLayoutProps> = ({
  children,
  mobileHeader = undefined,
}) => {
  return (
    <WaitForWsAndAuth>
      <MainLayout
        leftPanel={<Sidebar />}
        rightPanel={<ProfileBlockController />}
      >
        {children}
      </MainLayout>
    </WaitForWsAndAuth>
  );
};
