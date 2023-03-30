import { UserWithFollowInfo } from "@reall/client";
import React, { useState } from "react";
import { useConn } from "../shared-hooks/useConn";
import { ProfileAbout } from "./ProfileAbout";

export interface ProfileTabsProps extends React.HTMLAttributes<HTMLDivElement> {
  user: UserWithFollowInfo;
  tabs?: {
    about?: boolean;
    talks?: boolean;
    groups?: boolean;
  };
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  className,
  user,
  tabs = {
    about: true,
    groups: false,
    talks: false,
  },
  ...props
}) => {
  const [activeTab, setActiveTab] = useState("about");
  const conn = useConn();
  return (
    <>
      <div
        className={`w-full flex items-center justify-around ${className}`}
        {...props}
      >
        <button
          className={`py-1 text-primary-100 text-base font-bold border-b-2 border-primary-900 transition hover:border-accent focus:outline-no-chrome
                 ${activeTab === "about" && `border-accent text-accent`} ${
            !tabs.about ? "hidden" : ""
          }`}
          data-testid={`user:${user.username}:tab:about`}
          onClick={() => setActiveTab("about")}
        >
          About
        </button>

        <button
          className={`py-1 text-primary-100 text-base font-bold border-b-2 border-primary-900 transition hover:border-accent focus:outline-no-chrome
                 ${activeTab === "groups" && `border-accent text-accent`} ${
            !tabs.groups ? "hidden" : ""
          }`}
          data-testid={`user:${user.username}:tab:groups`}
          onClick={() => setActiveTab("groups")}
        >
          Groups
        </button>
      </div>

      <div>
        <ProfileAbout
          className={activeTab !== "about" ? "hidden" : ""}
          username={user.username}
          followers={user.numFollowers}
          following={user.numFollowing}
          description={user.bio}
        />
        <ProfileAbout
          className={activeTab !== "groups" ? "hidden" : ""}
          username={user.username}
          followers={user.numFollowers}
          following={user.numFollowing}
          description={user.bio}
        />
      </div>
    </>
  );
};
