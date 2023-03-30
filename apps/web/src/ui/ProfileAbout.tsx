import React from "react";
import { PlusIcon } from "../icons";
import { kFormatter } from "../lib/kFormatter";
import { TextParser } from "../modules/display/TextParser";

export interface ProfileAboutProps
  extends React.HTMLAttributes<HTMLDivElement> {
  username: string;
  followers: number;
  following: number;
  description?: string;
  link?: string;
}

export const ProfileAbout: React.FC<ProfileAboutProps> = ({
  username,
  followers,
  following,
  description,
  link,
  className = "",
}) => {
  return (
    <div
      className={`mt-2 bg-primary-800 p-4 rounded-8 w-full leading-8 ${className}`}
      style={{ maxWidth: 640 }}
    >
      <div className="text-primary-100 font-bold text-xl pb-4">{username}</div>
      <div className="flex mb-2">
        <div className="flex group mr-4">
          <span className="text-primary-100 font-bold">
            {kFormatter(followers)}
          </span>
          <span className="text-primary-300 ml-1 lowercase group-hover:underline">
            followers
          </span>
        </div>
        <div className="flex group">
          <span className="text-primary-100 font-bold">
            {kFormatter(following)}
          </span>
          <span className="text-primary-300 ml-1 lowercase group-hover:underline">
            following
          </span>
        </div>
      </div>
      <div className="text-primary-100 pb-4 whitespace-pre-wrap max-h-5l overflow-y-auto">
        {<TextParser>{description || ""}</TextParser>}
      </div>
      {link && (
        <div className="flex flex-row items-center mb-4">
          <PlusIcon className="mr-2" />
          <a
            className="text-accent font-bold text-sm"
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {link.replace(/(^\w+:|^)\/\//, "")}
          </a>
        </div>
      )}
    </div>
  );
};
