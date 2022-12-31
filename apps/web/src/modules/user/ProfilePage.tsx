import React from "react";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const ProfilePage: React.FC = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Profile name (@name)`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <h3>Profile</h3>
      </MiddlePanel>
    </MainLayout>
  );
};
