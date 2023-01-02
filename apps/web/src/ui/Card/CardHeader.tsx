import React from "react";
import { ThreeDotsIcon } from "../../icons";
import { Button } from "../Button";

import { SingleUser } from "../UserAvatar/SingleUser";

export interface CardHeaderProps {
  username: string;
  avatarUrl: string;
  children?: string;
  isOnline: boolean;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  avatarUrl,
  isOnline,
  username,
}) => {
  return (
    <div className="flex w-full p-3">
      <div className="flex flex-1 items-center gap-3">
        <SingleUser src={avatarUrl} size="sm" isOnline={isOnline} />
        <p className="text-secondary-2">{username}</p>
      </div>
      <button>
        <ThreeDotsIcon />
      </button>
    </div>
  );
};
