import { cva, type VariantProps } from "class-variance-authority";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const pillVariants = cva(
  "group/pill inline-flex items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap transition-[background-color,color,box-shadow,transform,filter,border-color] duration-200 outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/40 active:scale-[0.97]",
  {
    variants: {
      variant: {
        primary: "btn-glow hover:brightness-110",
        outline:
          "border border-white/12 bg-white/[0.04] text-foreground backdrop-blur hover:border-white/20 hover:bg-white/[0.08]",
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
