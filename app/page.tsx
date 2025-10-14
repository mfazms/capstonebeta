export default function Page() {
  return (
    <main className="min-h-screen grid md:grid-cols-2 bg-emerald-900 text-white">
      <div className="p-10 flex items-center justify-center">
        <img src="/hero.jpg" alt="hero" className="rounded-lg max-h-[70vh] object-cover" />
      </div>
      <div className="p-10 flex flex-col items-start justify-center">
        <h1 className="text-6xl font-extrabold">PLANTIFY</h1>
        <p className="mt-4 text-lg opacity-80">Right plant, right place, happy space.</p>
        <a href="/rekomendasi" className="mt-8 inline-flex items-center gap-2 bg-white text-emerald-900 px-5 py-3 rounded-md">
          Explore plants →
        </a>
      </div>
    </main>
  );
}
