import React from "react";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";

export const SettingsPage: React.FC = () => {
  return (
    <MainLayout>
      <HeaderController embed={{}} title="Settings" />
      <MiddlePanel>
        <h3>Settings</h3>
      </MiddlePanel>
    </MainLayout>
  );
};
