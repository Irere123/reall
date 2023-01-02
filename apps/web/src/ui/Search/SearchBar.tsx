import React from "react";
import { SearchIcon } from "../../icons";
import { Input } from "../Input";
import { Spinner } from "../Spinner";

export interface SearchBarProps
  extends React.ComponentPropsWithoutRef<"input"> {
  inputClassName?: string;
  mobile?: boolean;
  autoFocus?: boolean;
  isLoading?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  className = "",
  inputClassName = "",
  isLoading = false,
  autoFocus = false,
  mobile = false,
  ...props
}) => {
  return (
    <div
      className={`items-center flex w-full bg-primary-2 text-secondary-2 transition duration-200 ease-in-out focus-within:text-secondary-1 rounded-lg ${
        mobile ? "px-4" : ""
      } ${className}`}
    >
      {!mobile && (
        <div className="h-full mx-2 flex items-center pointer-events-none">
          <SearchIcon />
        </div>
      )}
      <Input
        autoFocus={autoFocus}
        data-testid="searchbar"
        className={`${inputClassName} pl-0`}
        {...props}
      />
      {isLoading && (
        <div
          className={`h-full flex items-center pointer-events-none ${
            !mobile && "mx-4"
          }`}
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};
