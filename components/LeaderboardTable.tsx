"use client";

import { useMemo, useState } from "react";
import { Benchmark, MethodRow } from "@/types/leaderboard";
import { toHsla, shiftHslLightness } from "@/lib/colors";

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
  const [showAllMetrics, setShowAllMetrics] = useState(false);
  const [sortBy, setSortBy] = useState<"rank" | "mean" | "date">("rank");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [expandedRow, setExpandedRow] = useState<number | null>(null);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const value = row.benchmarks?.[benchmark.id]?.values?.[benchmark.meanColumnId];
      return parseScore(value) !== null;
    });
  }, [rows, benchmark]);

  const sortedRows = useMemo(() => {
    const copy = [...filteredRows];
    if (sortBy === "mean") {
      copy.sort((a, b) => {
        const aScore = parseScore(a.benchmarks?.[benchmark.id]?.values?.[benchmark.meanColumnId]) || 0;
        const bScore = parseScore(b.benchmarks?.[benchmark.id]?.values?.[benchmark.meanColumnId]) || 0;
        return sortOrder === "asc" ? aScore - bScore : bScore - aScore;
      });
    } else if (sortBy === "date") {
      copy.sort((a, b) => {
        const aDate = a.time || "";
        const bDate = b.time || "";
        return sortOrder === "asc" ? aDate.localeCompare(bDate) : bDate.localeCompare(aDate);
      });
    } else {
      copy.sort((a, b) => {
        const aScore = parseScore(a.benchmarks?.[benchmark.id]?.values?.[benchmark.meanColumnId]);
        const bScore = parseScore(b.benchmarks?.[benchmark.id]?.values?.[benchmark.meanColumnId]);
        if (aScore === null && bScore === null) return 0;
        if (aScore === null) return 1;
        if (bScore === null) return -1;
        return bScore - aScore;
      });
      if (sortOrder === "asc") copy.reverse();
    }
    return copy;
  }, [filteredRows, benchmark, sortBy, sortOrder]);

  const maxMap = useMemo(() => getMaxByColumn(benchmark, sortedRows), [benchmark, sortedRows]);
  const accent = benchmark.color || "#3b82f6";
  const headerGradient = `linear-gradient(90deg, ${accent}, ${shiftHslLightness(accent, -10)})`;

  const handleSort = (key: "rank" | "mean" | "date") => {
    if (sortBy === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(key);
      setSortOrder(key === "rank" ? "asc" : "desc");
    }
  };

  const detailColumns = benchmark.columns.filter((col) => col.kind === "score" && col.id !== benchmark.meanColumnId);

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
              style={{ borderColor: accent, color: accent, backgroundColor: "transparent" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-sm text-slate-600">
          <span>Sort by:</span>
          <button
            onClick={() => handleSort("rank")}
            className="px-3 py-1.5 border border-slate-300 rounded-lg hover:border-primary-500"
          >
            Rank {sortBy === "rank" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => handleSort("mean")}
            className="px-3 py-1.5 border border-slate-300 rounded-lg hover:border-primary-500"
          >
            Mean {sortBy === "mean" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
          <button
            onClick={() => handleSort("date")}
            className="px-3 py-1.5 border border-slate-300 rounded-lg hover:border-primary-500"
          >
            Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
          </button>
        </div>
        <button
          onClick={() => setShowAllMetrics(!showAllMetrics)}
          className="px-4 py-2 rounded-lg border border-slate-300 hover:border-primary-500 text-sm font-medium"
        >
          {showAllMetrics ? "Compact View" : "Show All Metrics"}
        </button>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200" style={{ background: toHsla(accent, 0.1) }}>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort("rank")}
                >
                  Rank
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Model</th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort("mean")}
                >
                  Mean
                </th>
                <th
                  className="px-4 py-3 text-left text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-100"
                  onClick={() => handleSort("date")}
                >
                  Date
                </th>
                {showAllMetrics &&
                  detailColumns.map((col) => (
                    <th key={col.id} className="px-4 py-3 text-left text-sm font-semibold text-slate-700">
                      {col.label}
                    </th>
                  ))}
                <th className="px-4 py-3 text-center text-sm font-semibold text-slate-700">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
            {sortedRows.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                  No data available.
                </td>
              </tr>
            ) : (
              sortedRows.map((row, index) => {
                const meta = row.benchmarks?.[benchmark.id];
                const rowKey = index + 1;
                return (
                  <>
                    <tr
                      key={row.id}
                      className={`border-b border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors ${
                        expandedRow === rowKey ? "bg-slate-50" : ""
                      }`}
                      onClick={() => setExpandedRow(expandedRow === rowKey ? null : rowKey)}
                    >
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold border ${
                              index === 0
                                ? "rank-1"
                                : index === 1
                                  ? "rank-2"
                                  : index === 2
                                    ? "rank-3"
                                    : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}
                          >
                            {index + 1}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-slate-800">{row.shortName}</div>
                          <div className="text-xs text-slate-500">{row.title}</div>
                          {meta?.source && meta.source !== "original" && (
                            <div className="text-xs text-slate-500">{meta.source}</div>
                          )}
                          <div className="mt-2 flex gap-3 text-xs">
                            {row.paper && (
                              <a href={row.paper.url} target="_blank" rel="noreferrer" className="text-primary-600">
                                {row.paper.label}
                              </a>
                            )}
                            {row.project && (
                              <a href={row.project.url} target="_blank" rel="noreferrer" className="text-primary-600">
                                {row.project.label}
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="font-mono font-semibold" style={{ color: accent }}>
                            {parseScore(meta?.values?.[benchmark.meanColumnId])?.toFixed(2) ?? "-"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-600 text-sm">{row.time || "-"}</td>
                        {showAllMetrics &&
                          detailColumns.map((col) => (
                            <td key={col.id} className="px-4 py-3 text-slate-700">
                              {meta?.values?.[col.id] ?? "-"}
                            </td>
                          ))}
                        <td className="px-4 py-3 text-center">
                          <button
                            className="text-slate-400 hover:text-slate-600"
                            aria-label={expandedRow === rowKey ? "Hide details" : "Show details"}
                          >
                            <svg
                              className={`w-5 h-5 transition-transform ${expandedRow === rowKey ? "rotate-180" : ""}`}
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                      {expandedRow === rowKey && (
                        <tr className="bg-slate-50 border-b border-slate-200">
                          <td colSpan={showAllMetrics ? 6 + detailColumns.length : 6} className="px-4 py-4">
                            <div className="ml-4 space-y-4">
                              {!showAllMetrics && (
                                <div>
                                  <h4 className="text-sm font-semibold text-slate-700 mb-3">Sub-metrics</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    {detailColumns.map((col) => (
                                      <div key={col.id} className="bg-white rounded-lg p-3 shadow-sm">
                                        <div className="text-xs text-slate-500 mb-1">{col.label}</div>
                                        <div className="font-mono text-lg font-semibold text-slate-800">
                                          {meta?.values?.[col.id] ?? "-"}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center gap-4">
                                {row.project && (
                                  <a
                                    href={row.project.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-800 text-white rounded-lg text-sm hover:bg-slate-700 transition-colors"
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    Code / Project
                                  </a>
                                )}
                                {row.paper && (
                                  <a
                                    href={row.paper.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1.5 text-white rounded-lg text-sm transition-colors"
                                    style={{ backgroundColor: accent }}
                                    onClick={(e) => e.stopPropagation()}
                                  >
                                    📄 Paper
                                  </a>
                                )}
                              </div>
                              {meta?.source && meta.source !== "original" && (
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                                  <span className="text-sm font-medium text-amber-800">Source: </span>
                                  <span className="text-sm text-amber-700">{meta.source}</span>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
