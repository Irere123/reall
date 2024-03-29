import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTypeSafePrefetch } from "../shared-hooks/useTypeSafePrefetch";

type Prefetch = ReturnType<typeof useTypeSafePrefetch>;

const handlers = {
  following: ({ username }: { username: string }) => ({
    href: "/u/[username]/following",
    as: `/u/${username}/following`,
    onClick: (prefetch: Prefetch) => prefetch("getFollowList", [username]),
  }),
  followers: ({ username }: { username: string }) => ({
    href: "/u/[username]/followers",
    as: `/u/${username}/followers`,
    onClick: (prefetch: Prefetch) => prefetch("getFollowList", [username]),
  }),
  profile: ({ username }: { username: string }) => ({
    href: "/u/[username]",
    as: `/u/${username}`,
    onClick: (prefetch: Prefetch) => prefetch("getUserProfile", [username]),
  }),
};
type Handler = typeof handlers;

type ValueOf<T> = T[keyof T];
type DifferentProps = {
  [K in keyof Handler]: {
    route: K;
    data: Parameters<Handler[K]>[0];
  };
};

// the purpose of this component is to start the query to the api before navigating to the page
// this will result in less loading time for the user
export const ApiPreloadLink: React.FC<
  ValueOf<DifferentProps> & { children: React.ReactNode }
> = ({ children, route, data, ...props }) => {
  const prefetch = useTypeSafePrefetch();

  const { as, href, onClick } = handlers[route](data as any);

  return (
    <Link href={href} as={as} {...props} onClick={() => onClick(prefetch)}>
      {children}
    </Link>
  );
};

export const usePreloadPush = () => {
  const { push } = useRouter();
  const prefetch = useTypeSafePrefetch();
  return ({ route, data }: ValueOf<DifferentProps>) => {
    const { as, href, onClick } = handlers[route](data as any);
    onClick(prefetch);
    push(href, as);
  };
};
