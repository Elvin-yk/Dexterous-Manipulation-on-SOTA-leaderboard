export default function MethodologyContent() {
  return (
    <div className="space-y-6 text-muted leading-relaxed">
      <p>
        This leaderboard tracks dexterous hand manipulation policies across three benchmark suites:
        Adroit, DexArt, and Bi-DexHands. We normalize reported success rates and keep links to
        the original papers, project pages, and proof artifacts where available.
      </p>
      <p>
        For each method, we record the evaluation setting (data regime, number of demonstrations,
        training setup) alongside the raw task scores. Mean success values are taken directly from
        the reported benchmark tables or aggregated from the listed tasks.
      </p>
      <p>
        We prioritize reproducibility. If results are reproduced by another work, we mark the source
        accordingly. When scores are missing or not reported, we leave the field blank rather than
        interpolate.
      </p>
      <p>
        To submit new results, please provide paper links, project pages, and the exact benchmark
        settings. Use the “Submit Results” link on the homepage or open a GitHub issue with evidence.
      </p>
    </div>
  );
}
