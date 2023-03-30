import React from "react";

import { UserWithFollowInfo } from "@reall/client";
import { ProfileHeaderWrapper } from "./ProfileHeaderWrapper";
import { SingleUser } from "./UserAvatar/SingleUser";
import { Button } from "./Button";
import { SettingsIcon } from "../icons";
import { useTypeSafeMutation } from "../shared-hooks/useTypeSafeMutation";
import { useTypeSafeUpdateQuery } from "../shared-hooks/useTypeSafeUpdateQuery";

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
  const { mutateAsync: follow, isLoading: followLoading } =
    useTypeSafeMutation("userFollow");
  const { mutateAsync: unfollow, isLoading: unfollowLoading } =
    useTypeSafeMutation("userUnfollow");
  const updater = useTypeSafeUpdateQuery();

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
          {/* {!isCurrentUser && (
            <Button
              size="small"
              color={user.iBlockedThem ? "secondary" : "primary"}
            >
              Block
            </Button>
          )} */}
          {!isCurrentUser && (
            <Button
              size="small"
              color={user.youAreFollowing ? "secondary" : "primary"}
              onClick={async () => {
                if (user.youAreFollowing) {
                  await unfollow([user.id]);
                  updater(["getUserProfile", username], (u) =>
                    !u || "error" in u
                      ? u
                      : {
                          ...u,
                          numFollowers: u.numFollowers + -1,
                          youAreFollowing: !user.youAreFollowing,
                        }
                  );
                } else {
                  await follow([user.id]);
                  updater(["getUserProfile", username], (u) =>
                    !u || "error" in u
                      ? u
                      : {
                          ...u,
                          numFollowers: u.numFollowers + 1,
                          youAreFollowing: !user.youAreFollowing,
                        }
                  );
                }
              }}
            >
              {user.youAreFollowing ? "Unfollow" : "Follow"}
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
