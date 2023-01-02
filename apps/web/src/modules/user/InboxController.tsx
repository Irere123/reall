import React from "react";
import { LikeNotification, MatchNotification } from "../../ui/Notification";

export const InboxController: React.FC = () => {
  return (
    <div className="flex flex-col gap-3">
      <MatchNotification
        time=""
        userAvatarSrc=""
        username="irere"
        matched={true}
        isOnline={true}
        userProfileLink={`/user/`}
      />
      <LikeNotification
        time=""
        username="kent"
        userProfileLink={`/u/username`}
      />
    </div>
  );
};
