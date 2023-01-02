import React from "react";
import Link from "next/link";

import { InboxIcon, SendIcon } from "../../icons";
import { SearchBar } from "../Search/SearchBar";
import { SingleUser } from "../UserAvatar/SingleUser";
import { useConn } from "../../shared-hooks/useConn";
import { useRouter } from "next/router";

export const MiddleHeader = () => {
  const { push } = useRouter();
  const { user } = useConn();

  return (
    <div className="flex gap-7">
      <SearchBar
        onClick={() => push("/search")}
        placeholder="Search for people"
      />
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
