import React from "react";
import { useConn } from "../../shared-hooks/useConn";
import { ProfileBlock } from "../../ui/ProfileBlock";
import { UserSummaryCard } from "../../ui/UserSummaryCard";

interface ProfileBlockControllerProps {}

export const ProfileBlockController: React.FC<
  ProfileBlockControllerProps
> = () => {
  const conn = useConn();
  return (
    <>
      <ProfileBlock
        top={
          <UserSummaryCard
            onClick={() => {}}
            {...conn.user}
            username={conn.user.username}
            displayName={conn.user.username}
            badges={[]}
            isOnline={false}
          />
        }
        bottom={<></>}
      />
    </>
  );
};
