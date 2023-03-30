import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { GroupChatController } from "./GroupChatController";

interface ChatPageProps {}

export const ChatPage: PageComponent<ChatPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <MainLayout>
        <MiddlePanel>
          <GroupChatController />
        </MiddlePanel>
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

ChatPage.ws = true;
