import React from "react";
import Link from "next/link";

import { InboxIcon, SendIcon } from "../../icons";
import { SearchBar } from "../Search/SearchBar";
import { SingleUser } from "../UserAvatar/SingleUser";
import { useConn } from "../../shared-hooks/useConn";

export const MiddleHeader = () => {
  const { user } = useConn();

  return (
    <div className="flex gap-7">
      <SearchBar placeholder="Search for people" />
      <div className="flex gap-3 items-center">
        <Link href={`/messages`}>
          <SendIcon />
        </Link>
        <Link href={`/inbox`}>
          <InboxIcon />
        </Link>
        <Link href={`/u/${user.username}`}>
          <SingleUser src={user.avatarUrl} size="sm" isOnline={user.online} />
        </Link>
      </div>
    </div>
  );
};
