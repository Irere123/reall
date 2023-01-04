import { useRouter } from "next/router";
import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  BugIcon,
  GithubIcon,
  GoogleIcon,
  LgLogo,
  TwitterIcon,
} from "../../icons";
import { apiUrl, loginNextPathKey, __prod__ } from "../../lib/constants";
import { Button } from "../../ui/Button";
import { HeaderController } from "../display/HeaderController";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { useSaveTokensFromQueryParams } from "./useSaveTokensFromQueryParams";
import { useTokenStore } from "./useTokenStore";

interface LoginButtonProps {
  children: [React.ReactNode, React.ReactNode];
  color?: "secondary" | "primary" | "accent";
  onClick?: () => void;
  oauthUrl?: string; // React.FC didn't like & ({ onClick: () => void } | { oauthUrl: string })
}

const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  onClick,
  oauthUrl,
  color = "secondary",
  ...props
}) => {
  const { query: params } = useRouter();
  const clickHandler = useCallback(() => {
    if (typeof params.next === "string" && params.next) {
      try {
        localStorage.setItem(loginNextPathKey, params.next);
      } catch {}
    }
    window.location.href = oauthUrl as string;
  }, [params, oauthUrl]);

  return (
    <Button
      className="justify-center text-base py-3 mt-2"
      color={color}
      onClick={oauthUrl ? clickHandler : onClick}
      {...props}
    >
      <div
        className="grid gap-4"
        style={{
          gridTemplateColumns: "1fr auto 1fr",
        }}
      >
        {children[0]}
        {children[1]}
        <div />
      </div>
    </Button>
  );
};

export const LoginPage: React.FC = () => {
  useSaveTokensFromQueryParams();
  const { push } = useRouter();
  const { setConn } = useContext(WebSocketContext);
  const [tokensChecked, setTokensChecked] = useState(false);
  const hasTokens = useTokenStore((s) => !!(s.accessToken && s.refreshToken));

  useEffect(() => {
    // only want this on mount
    setConn(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (hasTokens) {
      push("/feed");
    } else {
      setTokensChecked(true);
    }
  }, [hasTokens, push]);

  if (!tokensChecked) return null;

  return (
    <div
      className="grid w-full h-full"
      style={{
        gridTemplateRows: "0.3fr auto 1fr",
      }}
    >
      <HeaderController embed={{}} title="Login" />
      <div className="hidden sm:flex" />
      <div className="flex justify-self-center self-center sm:hidden">
        <LgLogo />
      </div>
      <div className="flex m-auto flex-col p-6 gap-5  sm:rounded-8 z-10 sm:w-400 w-full">
        <div className="flex justify-center">
          <h3 className="text-secondary-1">Login</h3>
        </div>
        <div className="flex flex-col gap-2">
          <LoginButton color="primary" oauthUrl={`${apiUrl}/auth/google/web`}>
            <GoogleIcon width={20} height={20} />
            Continue with Google
          </LoginButton>

          <LoginButton oauthUrl={`${apiUrl}/auth/twitter/web`}>
            <TwitterIcon width={20} height={20} />
            Continue with Twitter
          </LoginButton>
          {!__prod__ && (
            <LoginButton
              color="accent"
              onClick={async () => {
                const name = window.prompt("username");

                if (!name) {
                  return;
                }

                const r = await fetch(
                  `${apiUrl}/dev/test-info?username=` + name
                );

                const d = await r.json();
                useTokenStore.getState().setTokens({
                  accessToken: d.accessToken,
                  refreshToken: d.refreshToken,
                });
                push("/feed");
              }}
            >
              <BugIcon width={20} height={20} />
              Create a test user
            </LoginButton>
          )}
        </div>
      </div>
      <div className="flex flex-row absolute bottom-0 w-full justify-between px-5 py-5 mt-auto items-center sm:px-7">
        <div className="hidden sm:flex">
          <LgLogo />
        </div>
        <div className="flex flex-row gap-6 text-secondary-2">
          <div className="flex flex-row gap-6 sm:gap-4">
            <a
              href="https://twitter.com/irere_emmanuel"
              target="_blank"
              rel="noreferrer"
            >
              <TwitterIcon
                width={20}
                height={20}
                className="ml-2 cursor-pointer hover:text-secondary-2"
              />
            </a>
            <a
              href="https://github.com/Irere123/reall"
              target="_blank"
              rel="noreferrer"
            >
              <GithubIcon width={20} height={20} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
