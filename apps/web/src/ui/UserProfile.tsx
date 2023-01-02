import { User } from "@reall/client";
import { format } from "date-fns";
import React from "react";
import { FormattedDate } from "./FormattedDate";
import { SingleUser } from "./UserAvatar/UserAvatar";

interface UserProfileProps {
  user: User;
}

export const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  console.log(user.inserted_at);
  const dt = new Date(user.inserted_at);

  return (
    <div className="flex flex-col gap-3">
      <SingleUser src={user.avatarUrl} isOnline={user.online} size="lg" />
      <div>
        <p className="font-bold text-lg text-secondary-2">{user.username}</p>
        <p className="text-secondary-1">{user.bio}</p>
        <p className="text-accent-secondary">
          Joined on <FormattedDate date={dt} />
        </p>
      </div>
    </div>
  );
};
