import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

interface InboxPageProps {}

export const InboxPage: PageComponent<InboxPageProps> = () => {
  return (
    <MainLayout>
      <HeaderController title={`Inbox`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <h3>Inbox</h3>
      </MiddlePanel>
    </MainLayout>
  );
};

InboxPage.ws = true;
