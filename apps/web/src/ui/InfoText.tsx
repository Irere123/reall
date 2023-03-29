import React from "react";

interface InfoTextProps {
  className?: string;
  children?: string;
}

export const InfoText: React.FC<InfoTextProps> = ({ className, children }) => {
  return <div className={`text-primary-100 ${className}`}>{children}</div>;
};
