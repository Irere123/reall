import { User } from "@reall/client";
import React from "react";
import { apiUrl } from "../../lib/constants";
import { PageComponent } from "../../types/PageComponent";
import { MiddleHeader } from "../../ui/header/MiddleHeader";
import { WaitForWsAndAuth } from "../auth/WaitForWsAndAuth";
import { HeaderController } from "../display/HeaderController";
import { MiddlePanel } from "../layouts/GridPanels";
import { MainLayout } from "../layouts/MainLayout";
import { UserProfileController } from "./UserProfileController";

interface ProfilePageProps {
  username: string;
  user: User | null;
}

export const ProfilePage: PageComponent<ProfilePageProps> = ({
  user,
  username,
}) => {
  return (
    <>
      {user ? (
        <HeaderController
          title={user.username}
          embed={{ image: user.avatarUrl }}
          description={user.bio ? user.bio : undefined}
        />
      ) : (
        <HeaderController />
      )}
      <WaitForWsAndAuth>
        <MainLayout>
          <MiddlePanel stickyChildren={<MiddleHeader />}>
            <UserProfileController key={username} />
          </MiddlePanel>
        </MainLayout>
      </WaitForWsAndAuth>
    </>
  );
};

ProfilePage.getInitialProps = async ({ query }) => {
  const username = typeof query.username === "string" ? query.username : "";
  try {
    const res = await fetch(`${apiUrl}/user/${username}`);
    const { user }: { user: User | null } = await res.json();
    return { username, user };
  } catch {
    return { username, user: null };
  }
};

ProfilePage.ws = true;
