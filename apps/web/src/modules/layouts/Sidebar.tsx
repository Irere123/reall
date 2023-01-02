import React from "react";
import Link from "next/link";

import { HomeIcon, Logo, PeopleIcon, SettingsIcon } from "../../icons";
import { FixedGridPanel } from "../../ui/GridPanel";

export const Sidebar: React.FC = () => {
  return (
    <FixedGridPanel>
      <div className="flex items-center flex-col">
        <Link href={`/feed`}>
          <Logo width={45} height={45} />
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
    </FixedGridPanel>
  );
};
