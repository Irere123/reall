import React from "react";
import { GroupChatHeader } from "./group/GroupChatHeader";
import { GroupChatInput } from "./group/GroupChatInput";
import { GroupChatMessages } from "./group/GroupChatMessages";

export const GroupChatController: React.FC = () => {
  return (
    <div className="flex flex-col p-2 border-r-2 border-l-2 border-primary-800 flex-1">
      <GroupChatHeader />
      <GroupChatMessages />
      <GroupChatInput />
    </div>
  );
};
