import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeaderboardTable from "@/components/LeaderboardTable";
import { loadLeaderboardData } from "@/lib/leaderboard";

export default function LeaderboardPage() {
  const data = loadLeaderboardData();

  return (
    <div>
      <Header />
      <section className="max-w-6xl mx-auto px-6 pt-16">
        <h1 className="text-3xl font-display font-semibold">Leaderboards</h1>
        <p className="text-muted mt-2">
          Ranked by mean success rate. Click paper/project links for details.
        </p>
      </section>
      {data.benchmarks.map((benchmark) => (
        <LeaderboardTable
          key={benchmark.id}
          benchmark={benchmark}
          rows={data.methods}
          title={`${benchmark.name} Leaderboard`}
        />
      ))}
      <Footer />
    </div>
  );
}
