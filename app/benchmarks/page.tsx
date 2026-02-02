import BenchmarkCards from "@/components/BenchmarkCards";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { loadLeaderboardData } from "@/lib/leaderboard";

export default function BenchmarksPage() {
  const data = loadLeaderboardData();

  return (
    <div>
      <Header benchmarks={data.benchmarks} />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-display font-semibold">Benchmarks</h1>
        <p className="text-muted mt-2">
          Explore the benchmark suites and jump directly to each leaderboard.
        </p>
      </section>
      <BenchmarkCards benchmarks={data.benchmarks} methods={data.methods} />
      <Footer />
    </div>
  );
}
