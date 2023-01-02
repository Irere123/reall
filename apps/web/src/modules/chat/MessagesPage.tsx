import React from "react";
import { SettingsIcon } from "../../icons";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { ChatUserController } from "./ChatUserController";

interface MessagesPageProps {}

export const MessagesPage: PageComponent<MessagesPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <MainLayout>
        <HeaderController embed={{}} title={`Messages`} />
        <MiddlePanel stickyChildren={<MiddleHeader />}>
          <div className="flex w-full items-center px-3">
            <h4 className="text-secondary-1 flex flex-1">Chat</h4>
            <button>
              <SettingsIcon />
            </button>
          </div>
          <div className="px-3 pt-3 flex flex-col gap-3">
            <ChatUserController />
          </div>
        </MiddlePanel>
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

MessagesPage.ws = true;
