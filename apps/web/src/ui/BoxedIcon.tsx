import { useRouter } from "next/router";
import React from "react";

const colorMap = {
  primary: "bg-primary-800",
  transparent: "bg-transparent",
  secondary: "bg-primary-700",
};

export interface BoxedIconProps
  extends React.ComponentPropsWithoutRef<"button"> {
  circle?: boolean;
  transition?: boolean;
  hover?: boolean;
  color?: keyof typeof colorMap;
}

export const BoxedIcon: React.FC<BoxedIconProps> = ({
  color = "primary",
  children,
  className = "",
  circle = false,
  transition = false,
  hover = false,
  ...props
}) => {
  return (
    <button
      className={`flex hover:scale-110 ${colorMap[color]} ${
        transition ? `transition duration-200 ease-in-out` : ``
      } ${hover ? `` : ``} h-6 w-6 cursor-pointer justify-center items-center ${
        circle ? `rounded-full` : `rounded-8`
      } ${className.includes("text-button") ? "" : "text-secondary-2"}
        ${className}`}
      data-testid="boxed-icon"
      {...props}
    >
      {children}
    </button>
  );
};
