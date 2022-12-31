import React from "react";

import img from "../../img/irere.jpg";
import { CardHeader } from "./CardHeader";

export const Card: React.FC = () => {
  return (
    <div className="flex flex-col border-2 border-primary-2 sm:w-400">
      <CardHeader avatarUrl={img.src} isOnline={true} username={"irere_emmy"} />
      <div></div>
      <div></div>
    </div>
  );
};
