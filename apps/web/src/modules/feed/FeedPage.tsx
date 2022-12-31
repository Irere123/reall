import React from "react";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { SearchBar } from "../../ui/Search/SearchBar";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";

export const FeedPage = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Dashboard`} />
      <div>
        <MiddleHeader />
      </div>
    </MainLayout>
  );
};
