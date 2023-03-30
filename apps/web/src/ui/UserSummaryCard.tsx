import React from "react";

import { SingleUser } from "./UserAvatar/SingleUser";
import { kFormatter } from "../lib/kFormatter";

export type badge = {
  color: "white" | "grey";
  content: React.ReactNode;
  variant: "primary" | "secondary" | "primary-700";
  classname?: string;
  title?: string;
  naked?: boolean;
};

export interface UserSummaryCardProps {
  onClick: () => void;
  id: string;
  displayName: string;
  username: string;
  numFollowers: number;
  numFollowing: number;
  isOnline: boolean;
  avatarUrl: string;
  badges: badge[];
  bio?: string | null;
  website?: string;
}

interface BadgesProps {
  badges: badge[];
}

interface WebsiteProps {
  website: string;
}

const regex = /(^\w+:|^)\/\//;

export const Website: React.FC<WebsiteProps> = ({ website }) => {
  return (
    <a
      className="text-accent mt-3 font-bold"
      href={website}
      target="_blank"
      rel="noreferrer"
    >
      {website.replace(regex, "")}
    </a>
  );
};

export const UserSummaryCard: React.FC<UserSummaryCardProps> = ({
  onClick,
  displayName,
  username,
  badges,
  numFollowers,
  numFollowing,
  bio,
  website,
  isOnline,
  avatarUrl,
}) => {
  return (
    <div className="flex flex-col rounded-8 bg-primary-800 p-4 w-full">
      <button
        data-testid="edit-profile-widget"
        className="flex"
        onClick={onClick}
      >
        <div className="flex">
          <SingleUser size="default" isOnline={isOnline} src={avatarUrl} />
        </div>
        <div className="flex mt-2">
          <div className="flex flex-col ml-3">
            <span className="text-primary-100 font-bold overflow-hidden break-all text-left">
              {displayName}
            </span>
            <span className="text-primary-300 text-left break-all">
              @{username}
            </span>
          </div>
        </div>
      </button>
      <div className="flex mt-3">
        <div className="flex transition duration-200 ease-in-out hover:bg-primary-700 px-2 py-1 rounded-8">
          <span className="text-primary-100 font-bold">
            {kFormatter(numFollowers)}
          </span>
          <span className="text-primary-300 ml-1.5 lowercase">followers</span>
        </div>
        <div className="flex transition duration-200 ease-in-out hover:bg-primary-700 px-2 py-1 rounded-8">
          <span className="text-primary-100 font-bold">
            {kFormatter(numFollowing)}
          </span>
          <span className="text-primary-300 ml-1.5 lowercase">following</span>
        </div>
      </div>
      <div
        data-testid="current-user:bio"
        className="flex text-primary-300 mt-3 break-words text-left"
      >
        {bio}
      </div>
      {website && <Website website={website} />}
    </div>
  );
};
