
export default function Home() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white flex flex-col items-center justify-center px-6">
      <div className="text-center max-w-3xl">

        {/* Heartbeat */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 rounded-full border-4 border-red-500 flex items-center justify-center animate-pulse">
            <span className="text-red-500 text-4xl">♥</span>
          </div>
        </div>

        <h1 className="text-6xl md:text-7xl font-bold tracking-tight">
          OneMatch
        </h1>

        <p className="mt-6 text-xl text-zinc-300">
          Find your official bone marrow donor registry.
        </p>

        <p className="mt-2 text-red-400">
          One world. One match. One life.
        </p>

        <button className="mt-10 px-8 py-4 rounded-full bg-red-500 hover:bg-red-600 transition font-semibold">
          Find your country
        </button>

        <div className="mt-16 grid grid-cols-3 gap-8">

          <div>
            <div className="text-3xl font-bold text-red-400">44M+</div>
            <div className="text-sm text-zinc-400">Donors</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-red-400">60+</div>
            <div className="text-sm text-zinc-400">Countries</div>
          </div>

          <div>
            <div className="text-3xl font-bold text-red-400">#001</div>
            <div className="text-sm text-zinc-400">Founder</div>
          </div>

        </div>

        <p className="mt-16 text-xs text-zinc-500">
          Heartbeat v0.1 • Founder #001 — Tiago Reis Leitão
        </p>

      </div>
    </main>
  );
}