import React from "react";
import { HeaderController } from "../modules/display/HeaderController";
import { Button } from "../ui/Button";

interface ConnectionTakenProps {}

const ConnectionTaken: React.FC<ConnectionTakenProps> = ({}) => {
  return (
    <>
      <HeaderController title="Connection Taken" embed={{}} />
      <div className="flex w-full h-full flex-col items-center justify-center p-8">
        <h4 className="text-primary-100 mb-4">
          The connection of this client have been taken by another one
        </h4>

        <Button
          onClick={() => {
            window.location.href = window.location.origin + "/dash";
          }}
        >
          Reconnect
        </Button>
      </div>
    </>
  );
};

export default ConnectionTaken;
