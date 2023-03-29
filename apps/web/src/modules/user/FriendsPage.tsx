import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

interface FriendsPageProps {}

export const FriendsPage: PageComponent<FriendsPageProps> = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Friends`} />
      <MiddlePanel>
        <h3>friends</h3>
      </MiddlePanel>
    </MainLayout>
  );
};

FriendsPage.ws = true;
