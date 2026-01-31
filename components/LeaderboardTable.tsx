import { Benchmark, MethodRow } from "@/types/leaderboard";

const parseScore = (value: string | null | undefined) => {
  if (!value) return null;
  const match = String(value).match(/[-+]?[0-9]*\.?[0-9]+/);
  if (!match) return null;
  return Number(match[0]);
};

const getMaxByColumn = (benchmark: Benchmark, rows: MethodRow[]) => {
  const maxMap: Record<string, number> = {};
  benchmark.columns
    .filter((col) => col.kind === "score")
    .forEach((col) => {
      let maxVal = -Infinity;
      rows.forEach((row) => {
        const raw = row.benchmarks?.[benchmark.id]?.values?.[col.id];
        const parsed = parseScore(raw);
        if (parsed !== null && parsed > maxVal) {
          maxVal = parsed;
        }
      });
      if (maxVal !== -Infinity) maxMap[col.id] = maxVal;
    });
  return maxMap;
};

export default function LeaderboardTable({
  benchmark,
  rows,
  title
}: {
  benchmark: Benchmark;
  rows: MethodRow[];
  title: string;
}) {
  const sortedRows = [...rows].sort((a, b) => {
    const aScore = parseScore(a.benchmarks?.[benchmark.id]?.values?.[benchmark.meanColumnId]);
    const bScore = parseScore(b.benchmarks?.[benchmark.id]?.values?.[benchmark.meanColumnId]);
    if (aScore === null && bScore === null) return 0;
    if (aScore === null) return 1;
    if (bScore === null) return -1;
    return bScore - aScore;
  });

  const maxMap = getMaxByColumn(benchmark, sortedRows);

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted">{benchmark.name}</p>
          <h2 className="text-2xl font-display font-semibold">{title}</h2>
        </div>
        <div className="flex gap-3 flex-wrap">
          {benchmark.links.map((link) => (
            <a
              key={link.url}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className="badge"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 table-wrap">
        <table className="min-w-full text-sm">
          <thead className="table-header text-slate">
            <tr>
              <th className="px-4 py-3 text-left font-semibold table-sticky">Method</th>
              <th className="px-4 py-3 text-left font-semibold table-sticky-2">Time</th>
              {benchmark.columns.map((col) => (
                <th key={col.id} className="px-4 py-3 text-left font-semibold whitespace-nowrap">
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedRows.map((row) => {
              const meta = row.benchmarks?.[benchmark.id];
              return (
                <tr key={row.id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 table-sticky">
                    <div className="font-semibold text-ink">{row.shortName}</div>
                    <div className="text-xs text-muted">{row.title}</div>
                    <div className="mt-2 flex gap-3 text-xs">
                      {row.paper && (
                        <a href={row.paper.url} target="_blank" rel="noreferrer" className="text-accent">
                          {row.paper.label}
                        </a>
                      )}
                      {row.project && (
                        <a href={row.project.url} target="_blank" rel="noreferrer" className="text-accent">
                          {row.project.label}
                        </a>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3 table-sticky-2 text-muted whitespace-nowrap">
                    {row.time}
                  </td>
                  {benchmark.columns.map((col) => {
                    const value = meta?.values?.[col.id] ?? null;
                    const parsed = parseScore(value);
                    const isMax = parsed !== null && maxMap[col.id] === parsed;
                    return (
                      <td
                        key={col.id}
                        className={`px-4 py-3 whitespace-nowrap ${
                          col.kind === "meta" ? "text-muted" : "text-ink"
                        } ${isMax ? "font-semibold text-accent" : ""}`}
                      >
                        {value ?? "-"}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
