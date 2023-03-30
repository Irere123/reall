import React from "react";
import { PageComponent } from "../../types/PageComponent";
import { DefaultDesktopLayout } from "../layouts/DefaultDesktopMainLayout";
import { FollowingController } from "./FollowingController";

interface UserPageProps {}

export const FollowingPage: PageComponent<UserPageProps> = () => {
  return (
    <DefaultDesktopLayout>
      <FollowingController />
    </DefaultDesktopLayout>
  );
};

FollowingPage.ws = true;
