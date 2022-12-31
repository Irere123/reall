import React from "react";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const MessagesPage: React.FC = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Chat`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <h3>Chattings </h3>
      </MiddlePanel>
    </MainLayout>
  );
};
