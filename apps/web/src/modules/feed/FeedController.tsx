// import { useRouter } from "next/router";
import { motion } from "framer-motion";
import React, { useState } from "react";
import { isServer } from "../../lib/isServer";
import { useScreenType } from "../../shared-hooks/useScreenType";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { Button } from "../../ui/Button";
import { Card } from "../../ui/Card";
import { CenterLoader } from "../../ui/CenterLoader";

const Page = ({
  cursor,
  isLastPage,
  onLoadMore,
}: {
  cursor: number;
  isLastPage: boolean;
  isOnlyPage: boolean;
  onLoadMore: (o: number) => void;
}) => {
  //   const { push } = useRouter();
  const { isLoading, data } = useTypeSafeQuery(
    ["getTopUserProfiles", cursor],
    {
      staleTime: Infinity,
      enabled: !isServer,
      refetchOnMount: "always",
    },
    [cursor]
  );

  if (isLoading) {
    return <CenterLoader />;
  }

  if (!data) {
    return null;
  }

  // if (isOnlyPage && data.profiles.length === 0) {
  //   return (
  //     <Button variant="small" onClick={() => refetch()}>
  //       Refresh
  //     </Button>
  //   );
  // }
  return (
    <>
      {data.profiles.map((profile) => (
        <Card user={profile} />
      ))}
      {isLastPage && data.nextCursor ? (
        <div className={`flex justify-center py-5`}>
          <Button
            size="small"
            onClick={() => {
              onLoadMore(data.nextCursor!);
            }}
          >
            Load more
          </Button>
        </div>
      ) : null}
    </>
  );
};

export const FeedController: React.FC = () => {
  const screenType = useScreenType();
  const [cursors, setCursors] = useState([0]);

  let mb = "mb-7";
  if (screenType === "fullscreen") {
    mb = "mb-8";
  }

  return (
    <div className={`flex flex-1 flex-col ${mb}`} data-testid="feed">
      <div className="flex flex-col space-y-4">
        {cursors.map((cursor, i) => (
          <Page
            key={cursor}
            cursor={cursor}
            isOnlyPage={cursors.length === 1}
            onLoadMore={(c) => setCursors([...cursors, c])}
            isLastPage={i === cursors.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
