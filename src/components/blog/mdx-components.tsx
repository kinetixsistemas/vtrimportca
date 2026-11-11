import type { ComponentPropsWithoutRef, ReactNode } from "react";

function Anchor({
  href,
  children,
  ...props
}: ComponentPropsWithoutRef<"a">) {
  const isExternal = href?.startsWith("http");
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <div className="my-6 w-full overflow-x-auto border border-vtr-black/10">
      <table className="w-full border-collapse text-left text-sm" {...props} />
    </div>
  );
}

function Callout({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 border-l-4 border-vtr-amber bg-vtr-gray-light px-5 py-4 text-sm">
      {children}
    </div>
  );
}

export const mdxComponents = {
  a: Anchor,
  table: Table,
  Callout,
};
