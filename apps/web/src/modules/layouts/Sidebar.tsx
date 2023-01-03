import React from "react";
import Link from "next/link";

import { HomeIcon, Logo, PeopleIcon, SettingsIcon } from "../../icons";
import { FixedGridPanel } from "../../ui/GridPanel";
import { useRouter } from "next/router";

export const Sidebar: React.FC = () => {
  const router = useRouter();
  const currentRoute = router.pathname;

  return (
    <FixedGridPanel>
      <div className="flex items-center flex-col">
        <Link href={`/feed`}>
          <Logo width={45} height={45} />
        </Link>
        <div className="flex flex-col items-center justify-center gap-3 pt-7 w-full">
          <Link
            href={`/feed`}
            className={
              currentRoute === "/feed" ? "text-accent" : "text-secondary-2"
            }
          >
            <HomeIcon />
          </Link>
          <Link
            href={`/friends`}
            className={
              currentRoute === "/friends" ? "text-accent" : "text-secondary-2"
            }
          >
            <PeopleIcon />
          </Link>
          <Link
            href={`/u/settings`}
            className={
              currentRoute === "/u/settings"
                ? "text-accent"
                : "text-secondary-2"
            }
          >
            <SettingsIcon />
          </Link>
        </div>
      </div>
    </FixedGridPanel>
  );
};
