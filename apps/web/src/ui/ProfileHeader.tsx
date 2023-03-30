import React from "react";

import { UserWithFollowInfo } from "@reall/client";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { SingleUser } from "./UserAvatar/SingleUser";
import { Button } from "./Button";
import { SettingsIcon } from "../icons";

export interface ProfileHeaderProps {
  displayName: string;
  username: string;
  children?: React.ReactNode;
  pfp?: string;
  canDM?: boolean;
  isCurrentUser?: boolean;
  user: UserWithFollowInfo;
}

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  displayName,
  user,
  username,
  canDM,
  children,
  isCurrentUser,
  pfp,
}) => {
  return (
    // @TODO: Add the cover api (once it's implemented)}
    <ProfileHeaderWrapper
      coverUrl={user.bannerUrl || "https://source.unsplash.com/random"}
    >
      <div className="flex mr-4 ">
        <SingleUser
          isOnline={user.online}
          className="absolute flex-none -top-5.5 rounded-full shadow-outlineLg bg-primary-900"
          src={pfp!}
        />
      </div>
      <div className="flex flex-col w-3/6 font-sans">
        <h4 className="text-primary-100 font-bold truncate">
          {displayName || username}
        </h4>
        <div className="flex flex-row items-center">
          <p
            className="text-primary-300 mr-2"
            data-testid="profile-info-username"
          >{`@${username}`}</p>

          {user.followsYou && <p>follows you</p>}
        </div>
        <div className="mt-2 flex">{children}</div>
      </div>

      <div className="sm:w-3/6">
        <div className="flex flex-row justify-end content-end gap-2">
          {!isCurrentUser && (
            <Button
              size="small"
              color={user.iBlockedThem ? "secondary" : "primary"}
            >
              Block
            </Button>
          )}
          {!isCurrentUser && (
            <Button
              size="small"
              color={user.youAreFollowing ? "secondary" : "primary"}
            >
              Unfollow
            </Button>
          )}
          {isCurrentUser ? (
            <Button size="small" color="secondary" icon={<SettingsIcon />}>
              Edit profile
            </Button>
          ) : (
            ""
          )}
        </div>
      </div>
    </ProfileHeaderWrapper>
  );
};
