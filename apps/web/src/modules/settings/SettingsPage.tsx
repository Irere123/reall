import React from "react";
import { HeaderController } from "../display/HeaderController";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopMainLayout";
import { MiddlePanel } from "../layouts/GridPanels";

export const SettingsPage: React.FC = () => {
  return (
    <DefaultDesktopLayout>
      <HeaderController embed={{}} title="Settings" />
      <MiddlePanel>
        <h3>Settings</h3>
      </MiddlePanel>
    </DefaultDesktopLayout>
  );
};
