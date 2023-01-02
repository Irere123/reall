import Link from "next/link";
import React from "react";
import { SingleUser } from "../../ui/UserAvatar/SingleUser";

const ChatUser: React.FC<{
  user: { avatarUrl: string; username: string; isOnline: boolean };
  lastMessage: string;
}> = ({ user, lastMessage }) => {
  return (
    <Link href={`/messages/${73293221012}`}>
      <div className="flex gap-4 items-center">
        <SingleUser src={user.avatarUrl} size="sm" isOnline={user.isOnline} />
        <div className="flex flex-col">
          <p className="text-secondary-2 text-lg">{user.username}</p>
          <p className="text-secondary-1 text-sm">{lastMessage}</p>
        </div>
      </div>
    </Link>
  );
};

export const ChatUserController: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <ChatUser
        lastMessage="Hello mn"
        user={{ avatarUrl: "", isOnline: true, username: "Betty chan" }}
      />
      <ChatUser
        lastMessage="Hello mn"
        user={{ avatarUrl: "", isOnline: false, username: "Calk Kent" }}
      />
      <ChatUser
        lastMessage="Hello mn"
        user={{ avatarUrl: "", isOnline: true, username: "Bite dance" }}
      />
    </div>
  );
};
