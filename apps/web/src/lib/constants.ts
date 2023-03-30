/* eslint-disable turbo/no-undeclared-env-vars */
export const __prod__ = process.env.NODE_ENV === "production";
export const loginNextPathKey = "@reall/login-next";
export const linkRegex =
  /(^|\s)(https?:\/\/)(www\.)?([-a-z0-9]{1,63}\.)*?[a-z0-9][-a-z0-9]{0,61}[a-z0-9]\.[a-z]{1,6}(\/[-\\w@\\+\\.~#\\?&/=%]*)?[^\s()]+/;

export const baseUrl = !__prod__
  ? "http://localhost:3000"
  : "https://bereall.netlify.com";

export const apiUrl = !__prod__
  ? "http://localhost:4000"
  : "https://reall.onrender.com";
