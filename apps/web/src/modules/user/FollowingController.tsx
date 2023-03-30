import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { SettingsIcon } from "../../icons";
import { isServer } from "../../lib/isServer";
import { ApiPreloadLink } from "../../shared-components/ApiPreloadLink";
import { useConn } from "../../shared-hooks/useConn";
import { useIntersectionObserver } from "../../shared-hooks/useIntersectionObserver";
import { useTypeSafeMutation } from "../../shared-hooks/useTypeSafeMutation";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { useTypeSafeUpdateQuery } from "../../shared-hooks/useTypeSafeUpdateQuery";
import { Button } from "../../ui/Button";
import { CenterLoader } from "../../ui/CenterLoader";
import { Spinner } from "../../ui/Spinner";
import { SingleUser } from "../../ui/UserAvatar/SingleUser";

interface FollowingControllerProps {}

const Page = ({
  cursor,
  isLastPage,
  onLoadMore,
  username,
  isFollowing,
}: {
  isFollowing: boolean;
  username: string;
  cursor: number;
  isLastPage: boolean;
  isOnlyPage: boolean;
  onLoadMore: (o: number) => void;
}) => {
  const conn = useConn();
  const { setNode, entry } = useIntersectionObserver({});
  const {
    mutateAsync: follow,
    isLoading: followLoading,
    variables,
  } = useTypeSafeMutation("userFollow");
  const { mutateAsync: unfollow, isLoading: unfollowLoading } =
    useTypeSafeMutation("userUnfollow");

  const updater = useTypeSafeUpdateQuery();
  const vars: [string] = [username];
  const { data, isLoading } = useTypeSafeQuery(
    ["getFollowList", ...vars],
    {
      enabled: !!username && !isServer,
      staleTime: Infinity,
      refetchOnMount: "always",
    },
    vars
  );

  const [shouldLoadMore, setShouldLoadMore] = useState(false);

  useEffect(() => {
    setShouldLoadMore(!!entry?.isIntersecting);
  }, [entry?.isIntersecting]);

  useEffect(() => {
    if (shouldLoadMore && data?.nextCursor) {
      onLoadMore(data.nextCursor!);
      setShouldLoadMore(false);
    }
  }, [data?.nextCursor, entry?.isIntersecting, onLoadMore, shouldLoadMore]);

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data || data.followers.length === 0) {
    const styles = "text-primary-200 text-center";
    if (isFollowing) return <div className={styles}>Following no one</div>;
    else return <div className={styles}>Have no followers</div>;
  }

  return (
    <>
      {data.followers.map((user) => (
        <div key={user.id} className="flex items-center mb-6">
          <div className="flex">
            <SingleUser size="md" src={user.avatarUrl} />
          </div>
          <div className="flex px-4 flex-1">
            <ApiPreloadLink route="profile" data={{ username: user.username }}>
              <div className="flex flex-col w-full">
                <div className="block max-w-md text-primary-100 truncate w-full">
                  {user.displayName}
                </div>
                <div className="flex text-primary-200">@{user.username}</div>
              </div>
            </ApiPreloadLink>
          </div>
          <div className="flex">
            {conn.user.username !== user.username && (
              <Button
                loading={
                  followLoading ||
                  (unfollowLoading && variables?.[0] === user.id)
                }
                onClick={async () => {
                  if (user.youAreFollowing) {
                    await unfollow([user.id]);
                    updater(["getFollowList", ...vars], (x) =>
                      !x
                        ? x
                        : {
                            ...x,
                            users: x.followers.map((u) =>
                              u.id === user.id
                                ? {
                                    ...u,
                                    numFollowers: u.numFollowers - 1,
                                    youAreFollowing: !user.youAreFollowing,
                                  }
                                : u
                            ),
                          }
                    );
                  } else {
                    await follow([user.id]);
                    updater(["getFollowList", ...vars], (x) =>
                      !x
                        ? x
                        : {
                            ...x,
                            users: x.followers.map((u) =>
                              u.id === user.id
                                ? {
                                    ...u,
                                    numFollowers: u.numFollowers + 1,
                                    youAreFollowing: !user.youAreFollowing,
                                  }
                                : u
                            ),
                          }
                    );
                  }
                }}
                size="small"
                color={user.youAreFollowing ? "secondary" : "primary"}
                icon={user.youAreFollowing ? null : <SettingsIcon />}
              >
                {user.youAreFollowing ? "unfollow" : "follow"}
              </Button>
            )}
          </div>
        </div>
      ))}
      {isLastPage && data.nextCursor && (
        <div ref={setNode} className={`flex justify-center py-5`}>
          <Spinner />
        </div>
      )}
    </>
  );
};

export const FollowingController: React.FC<FollowingControllerProps> = () => {
  const { pathname, query } = useRouter();
  const isFollowing = pathname.includes("/following");
  const username = typeof query.username === "string" ? query.username : "";
  const [cursors, setCursors] = useState([0]);

  return (
    <div className="flex flex-col mb-6 mt-5">
      {cursors.map((cursor, i) => (
        <Page
          username={username}
          isFollowing={isFollowing}
          key={cursor}
          cursor={cursor}
          isOnlyPage={cursors.length === 1}
          onLoadMore={(c) => setCursors([...cursors, c])}
          isLastPage={i === cursors.length - 1}
        />
      ))}
    </div>
  );
};
