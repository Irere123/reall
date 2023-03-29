import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { GroupChatController } from "./GroupChatController";

interface GroupPageProps {}

export const GroupPage: PageComponent<GroupPageProps> = () => {
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

GroupPage.ws = true;
