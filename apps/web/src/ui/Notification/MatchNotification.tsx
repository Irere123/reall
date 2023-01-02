import React from "react";
import { GenericNotification } from "./GenericNotification";
import { SingleUser } from "../UserAvatar/SingleUser";
import { Button } from "../Button";

export interface MatchNotificationProps {
  userAvatarSrc: string;
  username: string;
  userProfileLink?: string;
  time: string;
  isOnline?: boolean;
  matched?: boolean;
}

export const MatchNotification: React.FC<MatchNotificationProps> = ({
  userAvatarSrc,
  isOnline = false,
  username,
  userProfileLink,
  time,
  matched = false,
}) => {
  const icon = <SingleUser src={userAvatarSrc} size="sm" isOnline={isOnline} />;

  const notificationMsg = (
    <>
      <a
        className="font-bold"
        {...(userProfileLink ? { href: userProfileLink } : {})}
      >
        {username}
      </a>
      <span>&nbsp;matched you</span>
    </>
  );

  const matchButton = (
    <Button
      size="small"
      color={matched ? "secondary" : "primary"}
      style={{ width: "90px" }}
    >
      {matched ? "Matched" : "Match back"}
    </Button>
  );

  return (
    <GenericNotification
      icon={icon}
      notificationMsg={notificationMsg}
      time={time}
      actionButton={matchButton}
    />
  );
};
