import React from "react";
import { PlusIcon } from "../../icons";
import { SearchBar } from "../Search/SearchBar";

export interface SearchHeaderProps {
  onBackClick?: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder: string;
  searchLoading: boolean;
}

export const SearchHeader: React.FC<SearchHeaderProps> = ({
  onBackClick,
  onSearchChange,
  searchPlaceholder,
  searchLoading,
}) => {
  return (
    <div
      className="flex w-full  gap-1 bg-primary-900 text-primary-100"
      style={{ paddingTop: 0, paddingBottom: 17 }}
    >
      {onBackClick && (
        <button onClick={onBackClick}>
          <PlusIcon
            className="m-auto transform rotate-45"
            height={20}
            width={20}
          />
        </button>
      )}
      <SearchBar
        placeholder={searchPlaceholder}
        onChange={onSearchChange}
        isLoading={searchLoading}
      />
    </div>
  );
};
