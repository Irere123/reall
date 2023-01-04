import React, { useContext } from "react";
import LoadingScreen from "../../ui/LoadingScreen";
import { WebSocketContext } from "../ws/WebSocketProvider";
import { useVerifyLoggedIn } from "./useVerifyLoggedIn";

interface WaitForWsAndAuthProps {
  children: React.ReactNode;
}

export const WaitForWsAndAuth: React.FC<WaitForWsAndAuthProps> = ({
  children,
}) => {
  const { conn } = useContext(WebSocketContext);

  if (!useVerifyLoggedIn()) {
    return null;
  }

  if (!conn) {
    return <LoadingScreen />;
  }

  return (
    <>
      <LoadingScreen />
    </>
  );
};
