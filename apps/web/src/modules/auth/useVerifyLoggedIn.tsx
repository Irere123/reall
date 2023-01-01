import { useEffect } from "react";
import { useRouter } from "next/router";
import { useTokenStore } from "./useTokenStore";

export const useVerifyLoggedIn = () => {
  const { replace, asPath } = useRouter();
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));

  useEffect(() => {
    if (!hasTokens) {
      replace(`/?next=${asPath}`);
    }
  }, [hasTokens, replace, asPath]);

  return hasTokens;
};
