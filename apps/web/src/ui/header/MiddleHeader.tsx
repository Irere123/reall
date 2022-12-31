import React from "react";

import img from "../../img/irere.jpg";
import { InboxIcon, SendIcon } from "../../icons";
import { SearchBar } from "../Search/SearchBar";
import { SingleUser } from "../UserAvatar/UserAvatar";

export const MiddleHeader = () => {
  return (
    <div className="flex gap-7">
      <SearchBar placeholder="Search people" />
      <div className="flex gap-3 items-center">
        <SendIcon />
        <InboxIcon />
        <SingleUser src={img.src as any} size="sm" />
      </div>
    </div>
  );
};
