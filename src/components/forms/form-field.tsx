import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export const fieldLabelClasses =
  "mb-1.5 block text-[11px] font-bold uppercase tracking-[0.14em] text-vtr-gray-dark";

export const fieldInputClasses =
  "h-11 w-full border border-vtr-black/15 bg-white px-3 text-sm text-vtr-black outline-none transition-colors placeholder:text-vtr-black/40 focus:border-vtr-green aria-[invalid=true]:border-red-700";

export const fieldTextareaClasses =
  "min-h-28 w-full border border-vtr-black/15 bg-white px-3 py-2.5 text-sm text-vtr-black outline-none transition-colors placeholder:text-vtr-black/40 focus:border-vtr-green aria-[invalid=true]:border-red-700";

export function FormField({
  label,
  htmlFor,
  required,
  error,
  hint,
  children,
  className,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={htmlFor} className={fieldLabelClasses}>
        {label}
        {required ? (
          <span className="ml-1 text-vtr-green" aria-hidden="true">
            *
          </span>
        ) : null}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${htmlFor}-hint`} className="mt-1 text-xs text-vtr-gray-dark/70">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="mt-1 text-xs font-semibold text-red-700"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}
