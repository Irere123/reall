import React from "react";
import { Card } from "../../ui/Card";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const FeedPage = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Dashboard`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <div className="">
          <Card />
        </div>
      </MiddlePanel>
    </MainLayout>
  );
};
