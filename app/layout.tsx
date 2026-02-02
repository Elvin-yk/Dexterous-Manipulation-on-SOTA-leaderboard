import type { Metadata } from "next";
import { withBasePath } from "@/lib/paths";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dexterous Manipulation SOTA Leaderboard",
  description: "Track state-of-the-art dexterous hand manipulation across Adroit, DexArt, and Bi-DexHands."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body text-ink">
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">{children}</main>
          <footer className="bg-slate-800 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex flex-col items-center">
                  <img
                    src={withBasePath("/brand/evomind_wechat.jpg")}
                    alt="WeChat Group QR Code"
                    className="w-32 h-32 rounded-lg border-2 border-slate-600"
                  />
                  <p className="mt-2 text-sm text-slate-300">欢迎加入我们的微信交流群</p>
                  <p className="text-xs text-slate-400">Join our WeChat Group</p>
                </div>
                <div className="text-center text-sm text-slate-400">
                  <p>© 2026 Dexterous Manipulation SOTA Leaderboard. Data collected from published papers.</p>
                  <p className="mt-1">
                    <a
                      href="https://github.com/Elvin-yk/Dexterous-Manipulation-on-SOTA-leaderboard"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors"
                    >
                      EvoMind & SJTU
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
