export default function Footer() {
  return (
    <footer className="border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-6 flex flex-wrap items-center justify-between gap-4 text-sm text-muted">
        <span>© 2026 Dexterous Manipulation SOTA Leaderboard</span>
        <a
          href="https://github.com/Elvin-yk/Dexterous-Manipulation-on-SOTA-leaderboard"
          target="_blank"
          rel="noreferrer"
          className="text-accent"
        >
          Star us on GitHub
        </a>
      </div>
    </footer>
  );
}
