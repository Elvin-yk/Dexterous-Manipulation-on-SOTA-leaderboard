import BenchmarkCards from "@/components/BenchmarkCards";
import ContactSection from "@/components/ContactSection";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProgressChart from "@/components/ProgressChart";
import StatsOverview from "@/components/StatsOverview";
import UpdatesSection from "@/components/UpdatesSection";
import { loadLeaderboardData } from "@/lib/leaderboard";

export default function HomePage() {
  const data = loadLeaderboardData();

  return (
    <div>
      <Header benchmarks={data.benchmarks} />
      <Hero />
      <UpdatesSection updates={data.updates} />
      <StatsOverview benchmarks={data.benchmarks} methods={data.methods} />
      <BenchmarkCards benchmarks={data.benchmarks} methods={data.methods} />
      <ProgressChart data={data} />
      <ContactSection />
    </div>
  );
}
