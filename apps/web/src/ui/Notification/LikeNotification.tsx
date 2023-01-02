import React from "react";
import { GenericNotification } from "./GenericNotification";
import { Button } from "../Button";
import { PeopleIcon } from "../../icons";
import Link from "next/link";

export interface LikeNotificationProps {
  username: string;
  userProfileLink?: string;
  time: string;
}

export const LikeNotification: React.FC<LikeNotificationProps> = ({
  username,
  userProfileLink,
  time,
}) => {
  const icon = <PeopleIcon className="text-accent" />;

  const notificationMsg = (
    <>
      <a
        className="font-bold"
        {...(userProfileLink ? { href: userProfileLink } : {})}
      >
        {username}
      </a>
      <span>&nbsp; liked you!</span>
    </>
  );

  const viewButton = (
    <Link href={`${userProfileLink}`}>
      <Button size="small" color={"secondary"} style={{ width: "90px" }}>
        View
      </Button>
    </Link>
  );

  return (
    <GenericNotification
      icon={icon}
      notificationMsg={notificationMsg}
      time={time}
      actionButton={viewButton}
    />
  );
};
