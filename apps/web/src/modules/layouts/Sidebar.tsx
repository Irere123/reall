import React from "react";
import Link from "next/link";

import {
  HomeIcon,
  InboxIcon,
  Logo,
  SearchIcon,
  SendIcon,
  SettingsIcon,
} from "../../icons";
import { FixedGridPanel } from "../../ui/GridPanel";
import { useRouter } from "next/router";
import { BoxedIcon } from "../../ui/BoxedIcon";

export const Sidebar: React.FC = () => {
  const router = useRouter();

  return (
    <FixedGridPanel>
      <div className="flex items-center flex-col">
        <Link href={`/feed`}>
          <Logo width={45} height={45} />
        </Link>
        <div className="flex flex-col items-center text-primary-100 justify-center gap-5 pt-7 w-full">
          <BoxedIcon circle color="transparent">
            <Link href={`/feed`}>
              <HomeIcon />
            </Link>
          </BoxedIcon>
          <BoxedIcon circle color="transparent">
            <Link href={`/messages`}>
              <SendIcon />
            </Link>
          </BoxedIcon>
          <BoxedIcon circle color="transparent">
            <Link href={`/search`}>
              <SearchIcon />
            </Link>
          </BoxedIcon>
          <BoxedIcon circle color="transparent">
            <Link href={`/inbox`}>
              <InboxIcon />
            </Link>
          </BoxedIcon>
          <BoxedIcon circle color="transparent">
            <Link href={`/u/settings`}>
              <SettingsIcon />
            </Link>
          </BoxedIcon>
        </div>
      </div>
    </FixedGridPanel>
  );
};
