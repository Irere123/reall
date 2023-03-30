import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopMainLayout";
import { MiddlePanel } from "../layouts/GridPanels";
import { FeedController } from "./FeedController";

interface FeedPageProps {}

export const FeedPage: PageComponent<FeedPageProps> = () => {
  return (
    <DefaultDesktopLayout>
      <HeaderController embed={{}} title={`Dashboard`} />
      <MiddlePanel stickyChildren={<MiddleHeader title="Feed" />}>
        <FeedController />
      </MiddlePanel>
    </DefaultDesktopLayout>
  );
};

FeedPage.ws = true;
