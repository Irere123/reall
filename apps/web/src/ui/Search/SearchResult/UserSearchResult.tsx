import { User } from "@reall/client";
import React from "react";
import { SingleUser } from "../../UserAvatar/SingleUser";

export interface UserSearchResultProps {
  user: User;
  className?: string;
  onClick?: () => void;
}

export const UserSearchResult: React.FC<UserSearchResultProps> = ({
  user,
  className = "",
  onClick = () => undefined,
}) => {
  return (
    <div
      className={`flex cursor-pointer bg-primary-2 px-4 py-3 w-full rounded-8 ${className}`}
      onClick={onClick}
    >
      <div className="flex mr-3">
        <SingleUser isOnline={user.online} src={user.avatarUrl} size="md" />
      </div>
      <div className="flex flex-col">
        <span className="text-secondary-2 font-bold">{user.username}</span>
        <span className="text-secondary-1">{user.bio}</span>
      </div>
    </div>
  );
};
