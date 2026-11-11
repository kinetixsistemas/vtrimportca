import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import type { AnalyticsEvent, AnalyticsParams } from "@/types/analytics";

type ButtonVariant = "primary" | "secondary" | "outline" | "whatsapp" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-vtr-amber text-vtr-black hover:bg-vtr-amber-dark",
  secondary: "bg-vtr-green text-white hover:bg-vtr-green-dark",
  outline:
    "border-2 border-vtr-black/20 bg-transparent text-vtr-black hover:border-vtr-green hover:text-vtr-green",
  whatsapp: "bg-whatsapp text-vtr-black hover:bg-[#1fbe5a]",
  ghost: "bg-white/10 text-white hover:bg-white/20",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-3 text-sm",
  lg: "px-7 py-4 text-base",
};

type CommonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  icon?: ReactNode;
  analyticsEvent?: AnalyticsEvent;
  analyticsParams?: AnalyticsParams;
};

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  target?: string;
  rel?: string;
  "aria-label"?: string;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
  "aria-label"?: string;
};

type ButtonProps = ButtonAsLink | ButtonAsButton;

function ButtonInner({
  children,
  icon,
  variant,
  size,
}: Pick<CommonProps, "children" | "icon" | "variant" | "size">) {
  return (
    <span
      className={cn(
        "clip-corner-sm inline-flex items-center justify-center gap-2 font-sans font-bold uppercase tracking-[0.12em] transition-colors",
        sizeClasses[size ?? "md"],
        variantClasses[variant ?? "primary"],
      )}
    >
      {icon}
      {children}
    </span>
  );
}

export function Button(props: ButtonProps) {
  const {
    children,
    variant = "primary",
    size = "md",
    className,
    icon,
    analyticsEvent,
    analyticsParams,
  } = props;

  const outerClasses = cn(
    "group inline-flex focus-visible:outline-offset-4",
    className,
  );

  const analyticsAttributes = analyticsEvent
    ? {
        "data-analytics-event": analyticsEvent,
        "data-analytics-params": JSON.stringify(analyticsParams ?? {}),
      }
    : {};

  if ("href" in props && props.href) {
    const { href, external, target, rel, "aria-label": ariaLabel } = props;
    if (external || target === "_blank") {
      return (
        <a
          href={href}
          target={target ?? "_blank"}
          rel={rel ?? "noopener noreferrer"}
          aria-label={ariaLabel}
          className={outerClasses}
          {...analyticsAttributes}
        >
          <ButtonInner size={size} variant={variant} icon={icon}>
            {children}
          </ButtonInner>
        </a>
      );
    }
    return (
      <Link
        href={href}
        aria-label={ariaLabel}
        className={outerClasses}
        {...analyticsAttributes}
      >
        <ButtonInner size={size} variant={variant} icon={icon}>
          {children}
        </ButtonInner>
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  const {
    type = "button",
    disabled,
    onClick,
    "aria-label": ariaLabel,
  } = buttonProps;

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(outerClasses, disabled && "cursor-not-allowed opacity-50")}
      {...analyticsAttributes}
    >
      <ButtonInner size={size} variant={variant} icon={icon}>
        {children}
      </ButtonInner>
    </button>
  );
}
