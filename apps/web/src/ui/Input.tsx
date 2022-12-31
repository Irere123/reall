import React, { forwardRef } from "react";

export interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  textarea?: boolean;
  rows?: number;
  error?: string;
  transparent?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ textarea, className, error, transparent, ...props }, ref) => {
    const bg = transparent ? `bg-transparent` : `bg-primary-2`;
    const ring = error ? `ring-1 ring-secondary-2` : "";
    const cn = `w-full py-2 px-4 rounded-8 text-secondary-1 placeholder-primary-secondary-2 focus:outline-none ${bg} ${ring} ${className}`;

    return textarea ? (
      <textarea
        ref={ref as any}
        className={cn}
        data-testid="textarea"
        {...(props as any)}
      />
    ) : (
      <input ref={ref} className={cn} data-testid="input" {...props} />
    );
  }
);

Input.displayName = "Input";
