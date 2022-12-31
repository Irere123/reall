import React from "react";
import Link from "next/link";

import { HomeIcon, Logo, PeopleIcon } from "../../icons";

export const Sidebar: React.FC = () => {
  return (
    <div className="flex items-center flex-col pt-3">
      <Link href={`/feed`}>
        <Logo />
      </Link>
      <div className="flex flex-col items-center justify-center gap-3 pt-7 w-full">
        <Link href={`/feed`}>
          <HomeIcon />
        </Link>
        <Link href={`/people`}>
          <PeopleIcon />
        </Link>
      </div>
    </div>
  );
};
