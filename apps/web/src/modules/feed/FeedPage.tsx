import React from "react";
import { useConn } from "../../shared-hooks/useConn";
import { PageComponent } from "../../types/PageComponent";
import { Card } from "../../ui/Card";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

interface FeedPageProps {}

export const FeedPage: PageComponent<FeedPageProps> = () => {
  return (
    <WaitForWsAndAuth>
      <MainLayout>
        <HeaderController embed={{}} title={`Dashboard`} />
        <MiddlePanel stickyChildren={<MiddleHeader />}>
          <div className="flex flex-col mb-3">
            <Card />
          </div>
        </MiddlePanel>
      </MainLayout>
    </WaitForWsAndAuth>
  );
};

FeedPage.ws = true;
