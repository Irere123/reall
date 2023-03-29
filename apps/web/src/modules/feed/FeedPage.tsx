import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { FeedController } from "./FeedController";

interface FeedPageProps {}

export const FeedPage: PageComponent<FeedPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <MainLayout>
        <HeaderController embed={{}} title={`Dashboard`} />
        <MiddlePanel stickyChildren={<MiddleHeader title="Feed" />}>
          <FeedController />
        </MiddlePanel>
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

FeedPage.ws = true;
