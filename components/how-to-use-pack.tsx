import { HOW_TO_USE_PACK_STEPS } from "@/lib/site-config";

export function HowToUsePack({ className }: { className?: string }) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-slate-900">How to use this pack</h3>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
        {HOW_TO_USE_PACK_STEPS.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>
    </div>
  );
}
