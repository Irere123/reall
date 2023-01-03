import { User } from "@reall/client";
import React from "react";
import { CheckIcon, HeartIcon, SendIcon } from "../../icons";
import { useWrappedConn } from "../../shared-hooks/useConn";
import { useTypeSafeMutation } from "../../shared-hooks/useTypeSafeMutation";

export interface CardFooterProps {
  user: User;
  onHeartClick?: () => void;
  onCheckClick?: () => void;
  onShareClick?: () => void;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  user,
  onCheckClick,
  onHeartClick,
  onShareClick,
}) => {
  const { mutate: view } = useTypeSafeMutation("viewProfile");

  return (
    <div className="flex flex-col gap-3 w-full p-3">
      <div className="flex flex-1 items-center gap-3 text-secondary-1">
        <button
          onClick={() => {
            view([user.id]);
          }}
        >
          <HeartIcon />
        </button>
        <button
          onClick={() => {
            view([user.id]);
          }}
        >
          <CheckIcon />
        </button>
        <button onClick={onShareClick}>
          <SendIcon />
        </button>
      </div>
      <div className="text-secondary-2">
        <p>{user.bio}</p>
      </div>
    </div>
  );
};
