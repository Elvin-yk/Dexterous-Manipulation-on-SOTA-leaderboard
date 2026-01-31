import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LeaderboardTable from "@/components/LeaderboardTable";
import { loadLeaderboardData } from "@/lib/leaderboard";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return [
    { slug: "adroit" },
    { slug: "dexart" },
    { slug: "bidexhands" }
  ];
}

export default function BenchmarkDetailPage({ params }: { params: { slug: string } }) {
  const data = loadLeaderboardData();
  const benchmark = data.benchmarks.find((item) => item.id === params.slug);
  if (!benchmark) return notFound();

  return (
    <div>
      <Header />
      <LeaderboardTable benchmark={benchmark} rows={data.methods} title={`${benchmark.name} Leaderboard`} />
      <Footer />
    </div>
  );
}
