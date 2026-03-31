import { FeatureCard } from "@/components/landing/feature-card";

type TrustCardProps = {
  title: string;
  children: React.ReactNode;
};

/** Trust / proof column card — same visual system as feature cards, named for landing semantics. */
export function TrustCard({ title, children }: TrustCardProps) {
  return <FeatureCard title={title}>{children}</FeatureCard>;
}
