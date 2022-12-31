import React from "react";
import { HeaderController } from "../display/HeaderController";
import { MainLayout } from "../layouts/MainLayout";

export const FeedPage = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title={`Dashboard`} />
      <p className="text-secondary-1">hello</p>
    </MainLayout>
  );
};
