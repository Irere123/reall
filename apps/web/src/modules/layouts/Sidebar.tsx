import React from "react";
import Link from "next/link";

import { HomeIcon, Logo, PeopleIcon, SettingsIcon } from "../../icons";

export const Sidebar: React.FC = () => {
  return (
    <div className="flex items-center flex-col">
      <Link href={`/feed`}>
        <Logo />
      </Link>
      <div className="flex flex-col items-center justify-center gap-3 pt-7 w-full">
        <Link href={`/feed`}>
          <HomeIcon />
        </Link>
        <Link href={`/friends`}>
          <PeopleIcon />
        </Link>
        <Link href={`/u/settings`}>
          <SettingsIcon />
        </Link>
      </div>
    </div>
  );
};
