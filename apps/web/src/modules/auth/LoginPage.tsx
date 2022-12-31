import React from "react";
import { HomeIcon } from "../../icons";
import { HeaderController } from "../display/HeaderController";

export const LoginPage: React.FC = () => {
  return (
    <div>
      <HeaderController title="Login" />
      <HomeIcon />
      <h1 className="text-primary-2 text-3xl font-bold underline">
        Hello world!
      </h1>
    </div>
  );
};
