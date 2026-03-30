import { cn } from "@/lib/utils";

type LandingSectionProps = {
  id?: string;
  children: React.ReactNode;
  className?: string;
  variant?: "white" | "muted" | "dark";
};

export function LandingSection({ id, children, className, variant = "white" }: LandingSectionProps) {
  const bg =
    variant === "muted" ? "bg-slate-50" : variant === "dark" ? "bg-black text-white" : "bg-white";

  return (
    <section id={id} className={cn("scroll-mt-20 border-t border-slate-200 py-20 md:py-24", bg, className)}>
      <div className="landing-max">{children}</div>
    </section>
  );
}
