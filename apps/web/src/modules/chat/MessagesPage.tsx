import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopMainLayout";
import { MiddlePanel } from "../layouts/GridPanels";
import { ChatUserController } from "./ChatUserController";

interface MessagesPageProps {}

export const MessagesPage: PageComponent<MessagesPageProps> = () => {
  return (
    <DefaultDesktopLayout>
      <HeaderController embed={{}} title={`Messages`} />
      <MiddlePanel stickyChildren={<MiddleHeader title="Chat" />}>
        <div className="px-3 pt-3 flex flex-col gap-3">
          <ChatUserController />
        </div>
      </MiddlePanel>
    </DefaultDesktopLayout>
  );
};

MessagesPage.ws = true;
