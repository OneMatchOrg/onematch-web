import Link from "next/link";

export default function PortugalPage() {
  return (
    <main className="min-h-screen bg-[#09090B] text-white px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition mb-6"
        >
          ← Back to OneMatch
        </Link>

        {/* Hero */}
        <div className="text-center mb-10">
          <img
            src="/logo-v1.png"
            alt="OneMatch"
            className="w-40 md:w-48 h-auto mx-auto mb-3"
          />

          <h1 className="text-5xl md:text-6xl font-bold">🇵🇹 Portugal</h1>

          <p className="mt-2 text-xl text-zinc-300">
            Bone Marrow Donor Registry
          </p>

          <p className="mt-2 text-red-500">
            Official organisation: CEDACE (IPST)
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Organisation</p>
            <h3 className="text-xl font-semibold mt-1">CEDACE</h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Typical age</p>
            <h3 className="text-xl font-semibold mt-1">18–35 years</h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Verified</p>
            <h3 className="text-xl font-semibold mt-1">Today</h3>
          </div>
        </div>

        {/* Steps */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">How it works</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">Complete the questionnaire</h3>
                <p className="text-zinc-400">
                  Start your official registration through the CEDACE/IPST online questionnaire.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">Blood sample</h3>
                <p className="text-zinc-400">
                  If you're eligible, a small blood sample is collected for HLA typing.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">Join the registry</h3>
                <p className="text-zinc-400">
                  You'll only be contacted if you're a compatible match for a patient.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Quick FAQ</h2>

          <div className="space-y-5">
            <div>
              <h3 className="font-semibold">
                Is donating always surgery?
              </h3>
              <p className="text-zinc-400 mt-1">
                No. Most donations happen through a procedure similar to donating blood.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Will I donate immediately after registering?
              </h3>
              <p className="text-zinc-400 mt-1">
                No. Registration simply means you'll be contacted if you're a compatible match.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Is registration free?
              </h3>
              <p className="text-zinc-400 mt-1">
                Yes. Registration through the official CEDACE/IPST process is free.
              </p>
            </div>
          </div>
        </section>

        {/* Official CTA */}
        <a
          href="https://plataforma.dadiva.ipst.pt/donor/marrow/self-assessment"
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-red-500 hover:bg-red-600 transition rounded-full py-5 text-xl font-semibold"
        >
          Start Official Registration →
        </a>

        <p className="text-center text-zinc-500 text-sm mt-8">
          Eligibility requirements may change. Always confirm the latest information on the official IPST website.
        </p>
      </div>
    </main>
  );
}