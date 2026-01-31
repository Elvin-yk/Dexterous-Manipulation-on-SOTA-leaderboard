import { LeaderboardData } from "@/types/leaderboard";

export default function UpdatesSection({ updates }: { updates: LeaderboardData["updates"] }) {
  if (!updates.length) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-display font-semibold mb-4">Latest Updates</h2>
        <p className="text-muted">Run the data build script to populate updates.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-display font-semibold">Latest Updates</h2>
        <span className="text-sm text-muted">Auto-sorted by latest paper date</span>
      </div>
      <div className="mt-6 grid md:grid-cols-2 gap-4">
        {updates.map((item) => (
          <div key={`${item.date}-${item.text}`} className="card">
            <p className="text-sm text-muted">{item.date}</p>
            <p className="text-base font-semibold text-ink mt-2">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
