import { withBasePath } from "@/lib/paths";

export default function ContactSection() {
  return (
    <section id="contact" className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-display font-semibold mb-4">Contact & Contributions</h2>
          <p className="text-muted">
            We welcome new benchmarks, paper updates, and reproduced results. Please reach out with
            evidence so we can keep the leaderboard accurate.
          </p>
          <div className="mt-6 space-y-2 text-sm">
            <p className="text-muted">Email: <span className="text-ink">TODO@example.com</span></p>
            <p className="text-muted">GitHub Issues: <span className="text-ink">TODO (use repo issues)</span></p>
          </div>
        </div>
        <div className="card flex flex-col items-center">
          <img
            src={withBasePath("/brand/wechat-qr-placeholder.svg")}
            alt="WeChat QR placeholder"
            width={220}
            height={220}
          />
          <p className="text-xs text-muted mt-4">WeChat QR placeholder</p>
        </div>
      </div>
    </section>
  );
}
