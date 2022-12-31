import React from "react";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const InboxPage: React.FC = () => {
  return (
    <MainLayout>
      <HeaderController title={`Inbox`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <h3>Inbox</h3>
      </MiddlePanel>
    </MainLayout>
  );
};
