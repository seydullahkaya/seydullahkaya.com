import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const pillVariants = cva(
  "group/pill inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-[0_1px_2px_rgb(0_0_0/0.08),inset_0_1px_0_rgb(255_255_255/0.18)] hover:bg-primary/90",
        outline:
          "border border-border bg-card text-foreground hover:bg-secondary",
        ghost: "text-muted-foreground hover:bg-secondary hover:text-foreground",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-[0.95rem]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

type PillLinkProps = ComponentProps<"a"> &
  VariantProps<typeof pillVariants> & { arrow?: boolean };

/** Yuvarlak (pill) link butonu. arrow: hover'da sağa kayan ok ikonu. */
export function PillLink({
  className,
  variant,
  size,
  arrow,
  children,
  ...props
}: PillLinkProps) {
  return (
    <a className={cn(pillVariants({ variant, size }), className)} {...props}>
      {children}
      {arrow && (
        <ArrowRight
          className="size-4 transition-transform duration-200 group-hover/pill:translate-x-0.5"
          aria-hidden="true"
        />
      )}
    </a>
  );
}
