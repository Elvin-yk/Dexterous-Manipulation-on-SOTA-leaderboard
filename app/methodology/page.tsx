import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MethodologyContent from "@/components/MethodologyContent";

export default function MethodologyPage() {
  return (
    <div>
      <Header />
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-display font-semibold">Methodology</h1>
        <p className="text-muted mt-2">
          How we collect, normalize, and present dexterous manipulation benchmark results.
        </p>
        <div className="mt-8">
          <MethodologyContent />
        </div>
      </section>
      <Footer />
    </div>
  );
}
