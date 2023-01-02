import React from "react";
import { PeopleIcon, SendIcon, ThreeDotsIcon } from "../../icons";

import { SingleUser } from "../UserAvatar/UserAvatar";

export interface CardFooterProps {}

export const CardFooter: React.FC<CardFooterProps> = ({}) => {
  return (
    <div className="flex flex-col w-full p-3">
      <div className="flex flex-1 items-center gap-3">
        <SendIcon />
        <PeopleIcon />
      </div>
      <div className="text-secondary-2">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores sit
          vel nesciunt amet ut, incidunt error nostrum aliquid optio asperiores!
        </p>
      </div>
    </div>
  );
};
