import React from "react";

export default function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11 5C7.6863 5 5 7.6863 5 11C5 14.3137 7.6863 17 11 17C14.3137 17 17 14.3137 17 11C17 7.6863 14.3137 5 11 5ZM3 11C3 6.5817 6.5817 3 11 3C15.4183 3 19 6.5817 19 11C19 12.8487 18.3729 14.551 17.3199 15.9057L21.6905 20.2782C21.8856 20.4735 21.8856 20.7901 21.6903 20.9853L20.9832 21.6924C20.788 21.8876 20.4713 21.8876 20.2761 21.6923L15.9057 17.3199C14.551 18.3729 12.8487 19 11 19C6.5817 19 3 15.4183 3 11Z"
        fill="#E2F6FC"
      />
    </svg>
  );
}
