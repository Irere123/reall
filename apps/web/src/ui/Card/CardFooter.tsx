import { User } from "@reall/client";
import React from "react";
import { CheckIcon, HeartIcon, SendIcon } from "../../icons";

export interface CardFooterProps {
  user: User;
}

export const CardFooter: React.FC<CardFooterProps> = ({ user }) => {
  return (
    <div className="flex flex-col gap-3 w-full p-3">
      <div className="flex flex-1 items-center gap-3 text-secondary-1">
        <button>
          <HeartIcon />
        </button>
        <button>
          <CheckIcon />
        </button>
        <button>
          <SendIcon />
        </button>
      </div>
      <div className="text-secondary-2">
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
