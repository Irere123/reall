/* eslint-disable turbo/no-undeclared-env-vars */
export const prod = process.env.NODE_ENV === "production";

export const baseUrl = !prod
  ? "http://localhost:3000"
  : "https://reall.vercel.app";

export const apiUrl = !prod
  ? "http://localhost:4000"
  : "https://reall.onrender.app";
