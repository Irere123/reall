import React from "react";
import Link from "next/link";

import img from "../../img/irere.jpg";
import { InboxIcon, SendIcon } from "../../icons";
import { SearchBar } from "../Search/SearchBar";
import { SingleUser } from "../UserAvatar/UserAvatar";

export const MiddleHeader = () => {
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
        <Link href={`/u/${74834920128}`}>
          <SingleUser src={img.src as any} size="sm" isOnline={true} />
        </Link>
      </div>
    </div>
  );
};
