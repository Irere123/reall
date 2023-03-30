import React from "react";
import { linkRegex } from "../../lib/constants";

interface TextParserProps {
  children: string;
}

export const TextParser: React.FC<TextParserProps> = ({ children }) => {
  return (
    <>
      {children.split(/(?=[ ,\n])|(?<=[ ,\n])/g).map((text, i) => {
        if (new RegExp(linkRegex).test(text))
          return (
            <a
              key={i}
              className={
                "text-accent text-center hover:underline inline font-bold"
              }
              href={text}
            >
              {text}
            </a>
          );
        return text;
      })}
    </>
  );
};
