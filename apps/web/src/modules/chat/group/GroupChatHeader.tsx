import Link from "next/link";
import React from "react";
import { PlusIcon } from "../../../icons";
import { useConn } from "../../../shared-hooks/useConn";
import { FormattedDate } from "../../../ui/FormattedDate";
import { SingleUser } from "../../../ui/UserAvatar/UserAvatar";

export const GroupChatHeader: React.FC = () => {
  const { user } = useConn();
  return (
    <div className="flex z-10 pt-3 mb-3 bg-primary-1 w-full sticky top-0">
      <div className="flex flex-1 gap-3 ">
        <SingleUser src={user.avatarUrl} size="md" isOnline={user.online} />
        <div className="flex flex-col">
          <p className="text-secondary-2 text-lg font-bold">{user.username}</p>
          {!user.online ? (
            <p className="text-accent-secondary">
              last online <FormattedDate date={new Date(user.lastOnline)} />
            </p>
          ) : (
            <>Online</>
          )}
        </div>
      </div>
      <div>
        <Link href={`/messages`}>
          <PlusIcon className="rotate-45 " width={30} height={30} />
        </Link>
      </div>
    </div>
  );
};
