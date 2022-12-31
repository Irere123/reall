import React from "react";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { SearchBar } from "../../ui/Search/SearchBar";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const FeedPage = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Dashboard`} />
      <MiddlePanel stickyChildren={<MiddleHeader />}>
        <h3>hello home</h3>
      </MiddlePanel>
    </MainLayout>
  );
};
