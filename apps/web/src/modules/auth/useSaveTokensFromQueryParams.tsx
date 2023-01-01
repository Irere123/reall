import { useRouter } from "next/router";
import { useEffect } from "react";

import { loginNextPathKey } from "../../lib/constants";
import { useTokenStore } from "./useTokenStore";

export const useSaveTokensFromQueryParams = () => {
  const { query: params, push } = useRouter();

  useEffect(() => {
    if (typeof params.error === "string" && params.error) {
      console.log(params.error);
    }

    if (
      typeof params.accessToken === "string" &&
      typeof params.refreshToken === "string" &&
      params.accessToken &&
      params.refreshToken
    ) {
      useTokenStore.getState().setTokens({
        accessToken: params.accessToken,
        refreshToken: params.refreshToken,
      });

      let nextPath = "/feed";
      try {
        const possibleNextPath = localStorage.getItem(loginNextPathKey);
        if (possibleNextPath && possibleNextPath.startsWith("/")) {
          nextPath = possibleNextPath;
          localStorage.setItem(possibleNextPath, "");
        }
        // Push to next path after auto redirect to /dash (100 msecs is unoticeable)
        setTimeout(() => push(nextPath), 100);
      } catch {}
    }
  }, [params, push]);
};
