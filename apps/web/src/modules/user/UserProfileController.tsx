import { useRouter } from "next/router";
import React from "react";
import { isServer } from "../../lib/isServer";
import { useConn } from "../../shared-hooks/useConn";
import { useTypeSafeQuery } from "../../shared-hooks/useTypeSafeQuery";
import { CenterLoader } from "../../ui/CenterLoader";
import { InfoText } from "../../ui/InfoText";
import { UserProfile } from "../../ui/UserProfile";

export const UserProfileController = () => {
  const conn = useConn();
  const { query: params, push } = useRouter();
  const { data, isLoading } = useTypeSafeQuery(
    ["getUserProfile", params.username as string],
    {
      enabled:
        typeof params.username === "string" && !!params.username && !isServer,
    },
    [params.username]
  );

  if (isLoading) {
    return <CenterLoader />;
  }
  if (!data || ("error" in data && data.error.includes("could not find"))) {
    return <InfoText>That user does not exist on reall</InfoText>;
  } else if ("error" in data && data.error.includes("blocked")) {
    return <InfoText>You have been blocked by this user.</InfoText>;
  } else if ("error" in data) {
    return <InfoText>{data.error}</InfoText>;
  }

  return (
    <>
      <UserProfile user={data} isCurrentUser={data.id === conn.user.id} />
    </>
  );
};
