import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FeatureCard({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Card className={cn("border-slate-200 bg-white shadow-sm", className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg leading-snug text-slate-900">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm leading-relaxed text-slate-600">{children}</CardContent>
    </Card>
  );
}
