import { cn } from "@/lib/cn";

export function SpeedDivider({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "flex h-3 w-full items-center gap-1 overflow-hidden",
        className,
      )}
    >
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <span
          key={index}
          className={cn(
            "h-0.5 flex-1 skew-x-[-30deg]",
            index % 3 === 0
              ? "bg-vtr-amber"
              : tone === "dark"
                ? "bg-white/15"
                : "bg-vtr-black/15",
          )}
        />
      ))}
    </div>
  );
}

export function SpeedLinesBackground({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("speed-lines pointer-events-none absolute inset-0", className)}
    />
  );
}
