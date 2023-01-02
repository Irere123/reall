import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

interface MessagesPageProps {}

export const MessagesPage: PageComponent<MessagesPageProps> = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Messages`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <h3>Chattings </h3>
      </MiddlePanel>
    </MainLayout>
  );
};

MessagesPage.ws = true;
