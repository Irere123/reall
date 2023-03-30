import { UserWithFollowInfo } from "@reall/client";
import React from "react";
import { ProfileHeader } from "./ProfileHeader";
import { ProfileTabs } from "./ProfileTabs";

interface UserProfileProps {
  user: UserWithFollowInfo;
  isCurrentUser?: boolean;
}

export const UserProfile: React.FC<UserProfileProps> = ({
  user,
  isCurrentUser,
}) => {
  return (
    <>
      <ProfileHeader
        user={user}
        pfp={user.avatarUrl}
        displayName={user.username}
        isCurrentUser={isCurrentUser}
        username={user.username}
      />
      <ProfileTabs user={user} className="mt-4" />
    </>
  );
};
