export type Link = { label: string; url: string };

export type BenchmarkColumn = {
  id: string;
  label: string;
  kind: "score" | "meta";
};

export type Benchmark = {
  id: "adroit" | "dexart" | "bidexhands";
  name: string;
  description: string;
  columns: BenchmarkColumn[];
  links: Link[];
  meanColumnId: string;
};

export type BenchmarkValues = {
  values: Record<string, string | null>;
  setting?: string | null;
  source?: string | null;
  proof?: string | null;
};

export type MethodRow = {
  id: string;
  shortName: string;
  title: string;
  time: string;
  paper?: Link;
  project?: Link;
  benchmarks: Record<Benchmark["id"], BenchmarkValues>;
};

export type LeaderboardData = {
  generatedAt: string;
  benchmarks: Benchmark[];
  methods: MethodRow[];
  updates: { date: string; text: string }[];
};
