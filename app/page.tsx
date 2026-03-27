import { DentistLanding } from "@/components/dentist-landing";

/** Avoid static prerender edge cases with cva/buttonVariants in the landing tree. */
export const dynamic = "force-dynamic";

export default function Home() {
  return <DentistLanding />;
}
