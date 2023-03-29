import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";

import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { InboxController } from "./InboxController";

interface InboxPageProps {}

export const InboxPage: PageComponent<InboxPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <MainLayout>
        <HeaderController title={`Inbox`} />
        <MiddlePanel stickyChildren={<MiddleHeader title="Inbox" />}>
          <InboxController />
        </MiddlePanel>
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

InboxPage.ws = true;
