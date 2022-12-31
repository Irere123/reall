import React from "react";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const FriendsPage: React.FC = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Friends`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <h3>friends</h3>
      </MiddlePanel>
    </MainLayout>
  );
};
