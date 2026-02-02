"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { withBasePath } from "@/lib/paths";

type HeaderProps = {
  benchmarks?: { id: string; name: string }[];
};

export default function Header({ benchmarks = [] }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBenchmarkDropdownOpen, setIsBenchmarkDropdownOpen] = useState(false);
  const benchmarkLinks = benchmarks.map((benchmark) => ({
    name: benchmark.name,
    href: `/benchmarks/${benchmark.id}`
  }));

  return (
    <nav className="bg-white shadow-sm border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src={withBasePath("/brand/evomind.png")}
                alt="EvoMind Logo"
                width={108}
                height={36}
                className="rounded"
              />
              <Image
                src={withBasePath("/brand/sjtu.png")}
                alt="SJTU Logo"
                width={36}
                height={36}
                className="rounded"
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-slate-600 hover:text-primary-600 transition-colors font-medium"
            >
              Home
            </Link>

            {benchmarkLinks.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setIsBenchmarkDropdownOpen(!isBenchmarkDropdownOpen)}
                onBlur={() => setTimeout(() => setIsBenchmarkDropdownOpen(false), 150)}
                className="text-slate-600 hover:text-primary-600 transition-colors font-medium flex items-center space-x-1"
              >
                <span>Benchmarks</span>
                <svg
                  className={`w-4 h-4 transition-transform ${
                    isBenchmarkDropdownOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isBenchmarkDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-2">
                  {benchmarkLinks.map((benchmark) => (
                    <Link
                      key={benchmark.href}
                      href={benchmark.href}
                      className="block px-4 py-2 text-slate-600 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                    >
                      {benchmark.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            )}

            <Link
              href="/methodology"
              className="text-slate-600 hover:text-primary-600 transition-colors font-medium"
            >
              Methodology
            </Link>

          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-slate-100"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-slate-200">
            <div className="space-y-2">
              <Link
                href="/"
                className="block px-4 py-2 text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              {benchmarkLinks.length > 0 && (
                <div className="px-4 py-2 text-sm font-semibold text-slate-400 uppercase">Benchmarks</div>
              )}
              {benchmarkLinks.map((benchmark) => (
                <Link
                  key={benchmark.href}
                  href={benchmark.href}
                  className="block px-8 py-2 text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {benchmark.name}
                </Link>
              ))}
              <Link
                href="/methodology"
                className="block px-4 py-2 text-slate-600 hover:bg-primary-50 hover:text-primary-600 rounded-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Methodology
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
