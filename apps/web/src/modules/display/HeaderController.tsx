import React from "react";
import Header from "next/head";
import { NextPage } from "next";
import { baseUrl } from "../../lib/constants";

export interface HeaderControllerProps {
  title?: string;
  embed?: { hexColor?: string; image?: string };
  additionalKeywords?: string[];
  description?: string;
}

export const HeaderController: NextPage<HeaderControllerProps> = ({
  title,
  description = "Reall is making you real. Connect with your friends and your loved ones.",
  additionalKeywords = [],
  embed,
}) => {
  return (
    <Header>
      {title ? <title>{title} | Reall</title> : <title>Reall / Connect</title>}
      <meta name="description" content={description} />
      <meta
        name="keywords"
        content={`Reall, Reall${additionalKeywords.map((k) => `, ${k}`)}`}
      />
      <meta name="theme-color" content={embed?.hexColor || "#EFE7DD"} />
      {embed ? (
        <>
          <meta name="og:title" content={title || "Reall"} />

          <meta name="og:description" content={description} />
          <meta name="og:site_name" content="Reall" />
          <meta
            name="og:image"
            content={embed.image ? embed.image : `${baseUrl}/img/doge.png`}
          />
        </>
      ) : (
        ""
      )}
    </Header>
  );
};
