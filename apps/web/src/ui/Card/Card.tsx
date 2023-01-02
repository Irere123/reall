import React from "react";
import { User } from "@reall/client";

import { CardHeader } from "./CardHeader";
import Image from "next/image";
import { CardFooter } from "./CardFooter";

interface CardProps {
  user?: User;
}

export const Card: React.FC<CardProps> = ({}) => {
  return (
    <div className="flex flex-col border-2 rounded-5 border-primary-2 sm:w-400">
      <CardHeader
        avatarUrl={"https://placekitten.com/200/200"}
        isOnline={true}
        username={"ce_moi_irere"}
      />
      <div>
        <Image
          src={"https://placekitten.com/200/200"}
          alt={`irere`}
          className="w-full"
          width={400}
          height={300}
        />
      </div>
      <CardFooter />
    </div>
  );
};
