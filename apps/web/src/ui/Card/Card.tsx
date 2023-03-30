import React from "react";
import { User } from "@reall/client";

import { CardHeader } from "./CardHeader";
import Image from "next/image";
import { CardFooter } from "./CardFooter";

interface CardProps {
  user: User;
  onHeartClick?: () => void;
  onCheckClick?: () => void;
  onShareClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
  user,
  onCheckClick,
  onHeartClick,
  onShareClick,
}) => {
  return (
    <div className="flex flex-col w-full p-4 transition duration-200 ease-in-out border-b-2 border-primary-800">
      <CardHeader
        avatarUrl={user.avatarUrl}
        isOnline={user.online}
        username={user.username}
      />
      <div>
        <Image
          src={user.bannerUrl || user.avatarUrl}
          alt={user.username + user.bio}
          className="w-full"
          width={400}
          height={300}
        />
      </div>
      <CardFooter
        user={user}
        onCheckClick={onCheckClick}
        onHeartClick={onHeartClick}
        onShareClick={onShareClick}
      />
    </div>
  );
};
