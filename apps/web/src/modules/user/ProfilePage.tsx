import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

interface ProfilePageProps {}

export const ProfilePage: PageComponent<ProfilePageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <MainLayout>
        <HeaderController embed={{}} title={`Profile name (@name)`} />
        <MiddlePanel stickyChildren={<MiddleHeader />}>
          <h3>Profile</h3>
        </MiddlePanel>
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

ProfilePage.ws = true;
