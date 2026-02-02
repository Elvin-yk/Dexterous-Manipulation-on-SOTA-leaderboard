import { LeaderboardData } from "@/types/leaderboard";

const parseYearMonth = (time: string) => {
  const match = time.match(/^(\d{4})\.(\d{2})/);
  if (!match) return null;
  return `${match[1]}-${match[2]}`;
};

export default function ProgressChart({ data }: { data: LeaderboardData }) {
  const timeline = data.methods
    .map((method) => ({
      name: method.shortName,
      date: parseYearMonth(method.time || "")
    }))
    .filter((item): item is { name: string; date: string } => Boolean(item.date))
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 8);

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-800">Progress Timeline</h2>
          <p className="text-slate-600 mt-2">
            Recent publications and leaderboard updates across dexterous benchmarks.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {timeline.map((item) => (
              <div key={`${item.date}-${item.name}`} className="flex items-center justify-between">
                <div className="text-slate-700 font-medium">{item.name}</div>
                <div className="text-sm text-slate-500">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
