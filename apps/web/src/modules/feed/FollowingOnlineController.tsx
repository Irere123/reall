import React, { useState } from "react";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import {
  FollowerOnline,
  FollowersOnlineShowMore,
  FollowersOnlineWrapper,
} from "../../ui/FollowersOnline";
import { InfoText } from "../../ui/InfoText";

interface FriendsOnlineControllerProps {}

const Page: React.FC<{
  username: string;
  cursor: number;
  onLoadMore: (cursor: number) => void;
  isLastPage: boolean;
  isOnlyPage: boolean;
}> = ({ cursor, isLastPage, isOnlyPage, username, onLoadMore }) => {
  const { data, isLoading } = useTypeSafeQuery(
    ["getMyFollowing", cursor],
    {
      refetchOnMount: "always",
    },
    [username, cursor]
  );

  if (isOnlyPage && !isLoading && !data?.following.length) {
    return <InfoText>No is online</InfoText>;
  }

  return (
    <>
      {data?.following.map((u) => (
        <FollowerOnline {...u} key={u.id} />
      ))}
      {isLastPage && data?.nextCursor ? (
        <FollowersOnlineShowMore
          onClick={() => onLoadMore(data!.nextCursor!)}
        />
      ) : null}
    </>
  );
};

export const FollowingOnlineController: React.FC<
  FriendsOnlineControllerProps
> = ({}) => {
  const [cursors, setCursors] = useState<number[]>([0]);
  const conn = useConn();

  if (!conn) {
    return null;
  }

  return (
    <FollowersOnlineWrapper>
      {cursors.map((c, i) => (
        <Page
          key={c}
          username={conn.user.username}
          cursor={c}
          onLoadMore={(nc) => setCursors([...cursors, nc])}
          isLastPage={i === cursors.length - 1}
          isOnlyPage={cursors.length === 1}
        />
      ))}
    </FollowersOnlineWrapper>
  );
};
