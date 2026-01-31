import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-display font-semibold">404</h1>
      <p className="text-muted mt-2">Page not found.</p>
      <Link href="/" className="mt-6 text-accent font-semibold">
        Back to home
      </Link>
    </div>
  );
}
