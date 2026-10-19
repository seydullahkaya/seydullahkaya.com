import { RevealItem } from "@/components/motion";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      <RevealItem>
        <p className="eyebrow text-primary">
          <span className="text-muted-foreground" aria-hidden="true">
            {"// "}
          </span>
          {eyebrow}
        </p>
      </RevealItem>
      <RevealItem>
        <h2 className="mt-4 text-h2 text-balance">{title}</h2>
      </RevealItem>
      {description && (
        <RevealItem>
          <p className="mt-5 max-w-[60ch] text-pretty text-muted-foreground">
            {description}
          </p>
        </RevealItem>
      )}
    </div>
  );
}
