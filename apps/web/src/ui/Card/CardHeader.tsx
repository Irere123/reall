import React from "react";

import { SingleUser } from "../UserAvatar/UserAvatar";

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
    <div>
      <div>
        <SingleUser src={avatarUrl} size="sm" isOnline={isOnline} />
        <p>{username}</p>
      </div>
    </div>
  );
};
