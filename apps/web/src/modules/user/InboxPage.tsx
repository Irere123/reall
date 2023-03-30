import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";

import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopMainLayout";
import { MiddlePanel } from "../layouts/GridPanels";
import { InboxController } from "./InboxController";

interface InboxPageProps {}

export const InboxPage: PageComponent<InboxPageProps> = () => {
  return (
    <DefaultDesktopLayout>
      <HeaderController title={`Inbox`} />
      <MiddlePanel stickyChildren={<MiddleHeader title="Inbox" />}>
        <InboxController />
      </MiddlePanel>
    </DefaultDesktopLayout>
  );
};

InboxPage.ws = true;
