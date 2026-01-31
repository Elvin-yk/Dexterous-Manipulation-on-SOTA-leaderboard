import Link from "next/link";
import { Benchmark, MethodRow } from "@/types/leaderboard";

const parseScore = (value: string | null | undefined) => {
  if (!value) return null;
  const match = String(value).match(/[-+]?[0-9]*\.?[0-9]+/);
  if (!match) return null;
  return Number(match[0]);
};

const getTopMethod = (
  benchmark: Benchmark,
  methods: MethodRow[]
): { method: MethodRow; score: number } | null => {
  const meanId = benchmark.meanColumnId;
  let top: { method: MethodRow; score: number } | null = null;
  methods.forEach((method) => {
    const value = method.benchmarks?.[benchmark.id]?.values?.[meanId];
    const score = parseScore(value);
    if (score === null) return;
    if (!top || score > top.score) {
      top = { method, score };
    }
  });
  return top;
};

export default function BenchmarkCards({
  benchmarks,
  methods
}: {
  benchmarks: Benchmark[];
  methods: MethodRow[];
}) {
  if (!benchmarks.length) {
    return (
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-display font-semibold mb-4">Benchmarks</h2>
        <p className="text-muted">No benchmarks loaded yet.</p>
      </section>
    );
  }

  return (
    <section className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h2 className="text-2xl font-display font-semibold">Benchmarks</h2>
        <Link href="/leaderboard" className="text-sm font-semibold text-accent">
          View full leaderboard →
        </Link>
      </div>
      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {benchmarks.map((benchmark) => {
          const top = getTopMethod(benchmark, methods);
          return (
            <div key={benchmark.id} className="card flex flex-col justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">{benchmark.name}</p>
                <h3 className="text-xl font-display font-semibold mt-2">{benchmark.description}</h3>
                {top && (
                  <div className="mt-4">
                    <p className="text-sm text-muted">Top mean success</p>
                    <p className="text-lg font-semibold text-ink">
                      {top.method.shortName} · {top.score}
                    </p>
                  </div>
                )}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <div className="flex gap-2 flex-wrap">
                  {benchmark.links.map((link) => (
                    <a
                      key={link.url}
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-semibold text-accent"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
                <Link
                  href={`/benchmarks/${benchmark.id}`}
                  className="text-sm font-semibold text-slate hover:text-accent"
                >
                  Details →
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
