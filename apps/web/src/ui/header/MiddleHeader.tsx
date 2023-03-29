import React, { FC, MouseEventHandler, ReactNode } from "react";
import { Button } from "../Button";

export interface MiddleProps {
  emptyPlaceholder: ReactNode;
}

export interface MiddleHeaderProps {
  title: string;
  actionTitle?: string;
  onActionClicked?: MouseEventHandler<HTMLButtonElement>;
}

export const MiddleHeader: FC<MiddleHeaderProps> = ({
  actionTitle,
  onActionClicked,
  title,
}) => {
  return (
    <div className="flex justify-between items-end mb-5 ml-4">
      <h4 className="text-primary-100">{title}</h4>
      {actionTitle ?? (
        <Button
          data-testid="Middle-action-button"
          transition
          onClick={onActionClicked}
        >
          {actionTitle}
        </Button>
      )}
    </div>
  );
};
