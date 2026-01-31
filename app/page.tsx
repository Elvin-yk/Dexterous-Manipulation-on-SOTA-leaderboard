import BenchmarkCards from "@/components/BenchmarkCards";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import MethodologyContent from "@/components/MethodologyContent";
import UpdatesSection from "@/components/UpdatesSection";
import { loadLeaderboardData } from "@/lib/leaderboard";

export default function HomePage() {
  const data = loadLeaderboardData();

  return (
    <div>
      <Header />
      <Hero />
      <UpdatesSection updates={data.updates} />
      <BenchmarkCards benchmarks={data.benchmarks} methods={data.methods} />
      <section className="max-w-6xl mx-auto px-6 py-16" id="methodology">
        <h2 className="text-2xl font-display font-semibold mb-4">Methodology</h2>
        <MethodologyContent />
      </section>
      <section className="max-w-6xl mx-auto px-6 pb-10" id="submit">
        <div className="card">
          <h3 className="text-xl font-display font-semibold">Submit Results</h3>
          <p className="text-muted mt-2">
            Please open a GitHub issue with your paper link, benchmark setting, and proof artifacts.
          </p>
        </div>
      </section>
      <ContactSection />
      <Footer />
    </div>
  );
}
