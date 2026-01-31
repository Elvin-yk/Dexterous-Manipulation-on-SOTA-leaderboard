import Image from "next/image";
import Link from "next/link";
import { withBasePath } from "@/lib/paths";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Benchmarks", href: "/benchmarks" },
  { label: "Methodology", href: "/methodology" },
  { label: "Leaderboards", href: "/leaderboard" },
  { label: "Contact", href: "/#contact" }
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/80 border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4">
          <Image src={withBasePath("/brand/evomind.png")} alt="EvoMind" width={140} height={38} />
          <Image src={withBasePath("/brand/sjtu.png")} alt="SJTU" width={48} height={48} className="rounded-full" />
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className="hover:text-accent transition">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
