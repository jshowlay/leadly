export function LandingStatsStrip() {
  const stats = [
    { num: "150", label: "scored leads per search" },
    { num: "200+", label: "agencies and freelancers" },
    { num: "$99", label: "one-time, no subscription" },
  ] as const;

  return (
    <section className="dh-stats" aria-label="Key metrics">
      <div className="dh-stats-grid">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="dh-stat-num">{s.num}</div>
            <div className="dh-stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
