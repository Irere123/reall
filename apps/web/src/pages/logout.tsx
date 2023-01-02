import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useTokenStore } from "../modules/auth/useTokenStore";

interface logoutProps {}

// purpose of this page is to wait for token store to be cleared
// should be done by the component sending the user here
// then it should redirect to landing page
const Logout: React.FC<logoutProps> = ({}) => {
  const [hasTokens, setTokens] = useTokenStore((s) => [
    !!(s.accessToken && s.refreshToken),
    s.setTokens,
  ]);
  const { replace } = useRouter();
  useEffect(() => {
    if (!hasTokens) {
      replace("/");
    }
  }, [hasTokens, replace]);

  return (
    <>
      <p onClick={() => setTokens({ accessToken: "", refreshToken: "" })}>
        click here if you are not automatically redirected
      </p>
    </>
  );
};

export default Logout;
