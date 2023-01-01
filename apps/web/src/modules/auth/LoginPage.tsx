import { useRouter } from "next/router";
import React, { useCallback } from "react";
import {
  BugIcon,
  FacebookIcon,
  GithubIcon,
  LgLogo,
  TwitterIcon,
} from "../../icons";
import { apiUrl, __prod__ } from "../../lib/constants";
import { Button } from "../../ui/Button";
import { HeaderController } from "../display/HeaderController";
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
  // const clickHandler = useCallback(() => {
  //   window.location.href = oauthUrl as string;
  // }, []);

  function clickHandler() {
    console.log("yyooo");
  }

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
  const { push } = useRouter();

  return (
    <div
      className="grid w-full h-full"
      style={{ gridTemplateRows: "1fr auto 1fr" }}
    >
      <HeaderController embed={{}} title="Login" />
      <div className="hidden sm:flex" />
      <div className="flex justify-self-center self-center sm:hidden">
        <LgLogo />
      </div>
      <div className="flex m-auto flex-col p-6 gap-5 bg-primary-800 sm:rounded-8 z-10 sm:w-400 w-full">
        <div className="flex justify-center">
          <h3 className="text-secondary-1">Login</h3>
        </div>
        <div className="flex flex-col gap-2">
          <LoginButton color="primary" oauthUrl={`${apiUrl}/auth/facebook`}>
            <FacebookIcon width={20} height={20} />
            Continue with Facebook
          </LoginButton>
          <LoginButton oauthUrl={`${apiUrl}/auth/twitter`}>
            <TwitterIcon width={20} height={20} />
            Continue with Twitter
          </LoginButton>
          <div className="border-b-2 border-primary-2" />
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
              href="https://github.com/benawad/dogehouse"
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
              href="https://discord.gg/wCbKBZF9cV"
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
