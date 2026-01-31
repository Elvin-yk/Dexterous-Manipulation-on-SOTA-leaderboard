import Link from "next/link";

export default function Hero() {
  return (
    <section className="hero-grid">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 fade-in">
          <span className="badge">Dexterous Manipulation</span>
          <h1 className="text-4xl md:text-5xl font-display font-semibold leading-tight">
            <span className="gradient-text">Dexterous Manipulation SOTA</span> Leaderboard
          </h1>
          <p className="text-lg text-muted">
            A living scoreboard for dexterous hand manipulation research, covering Adroit, DexArt,
            and Bi-DexHands benchmarks with consistent metrics, papers, and settings.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/leaderboard"
              className="px-5 py-3 rounded-full bg-accent text-white font-semibold shadow-glow"
            >
              View Leaderboards
            </Link>
            <Link
              href="#submit"
              className="px-5 py-3 rounded-full border border-slate-300 text-slate font-semibold hover:border-accent transition"
            >
              Submit Results
            </Link>
          </div>
        </div>
        <div className="card fade-in">
          <h3 className="text-xl font-display font-semibold mb-4">What’s inside</h3>
          <ul className="space-y-3 text-sm text-muted">
            <li>Unified leaderboard across three benchmark suites</li>
            <li>Links to papers, project pages, and proof artifacts</li>
            <li>Sorted ranking by mean success rates</li>
            <li>Updates highlighting the newest published methods</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
