import { cn } from "@/lib/utils";

/** Default: dark bar (white tagline). `onLight`: light bar (slate tagline). */
export function BrandMark({
  className,
  variant = "default",
}: {
  className?: string;
  variant?: "default" | "admin" | "onLight";
}) {
  const taglineClass =
    variant === "onLight" ? "text-[11px] font-medium leading-tight text-slate-500" : "text-[11px] font-medium leading-tight text-white/65";
  return (
    <div className={cn("flex flex-col gap-0.5", className)}>
      <p className="text-lg font-semibold leading-tight">
        Dentily{variant === "admin" ? " Admin" : ""}
      </p>
      <p className={taglineClass}>Practice opportunities · outbound-ready</p>
    </div>
  );
}
