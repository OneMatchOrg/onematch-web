
"use client";

import { useState } from "react";
import Link from "next/link";
import { countries } from "@/data/countries";

export default function PortugalPage() {
  const [loading, setLoading] = useState(false);

  const portugal = countries.find((c) => c.code === "PT");

  const verifiedLabel = portugal
    ? new Date(portugal.verified).toLocaleDateString("pt-PT", {
        month: "long",
        year: "numeric",
      })
    : "Verificado";

  const handleStart = () => {
    setLoading(true);

    setTimeout(() => {
      window.open(
        "https://plataforma.dadiva.ipst.pt/donor/marrow/self-assessment",
        "_blank",
        "noopener,noreferrer"
      );

      setLoading(false);
    }, 450);
  };

  return (
    <main className="min-h-screen bg-[#09090B] text-white px-6 py-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center text-zinc-400 hover:text-red-500 transition mb-6"
        >
          ← Voltar ao OneMatch
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
            Registo Português de Dadores de Medula Óssea
          </p>

          <p className="mt-2 text-red-500">
            Entidade oficial: CEDACE (IPST)
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Entidade</p>
            <h3 className="text-xl font-semibold mt-1">CEDACE</h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Idade habitual</p>
            <h3 className="text-xl font-semibold mt-1">18–35 anos</h3>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
            <p className="text-zinc-400 text-sm">Última verificação</p>
            <h3 className="text-xl font-semibold mt-1">{verifiedLabel}</h3>
          </div>
        </div>

        {/* Steps */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">Como funciona</h2>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-red-500 flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Preenche o questionário
                </h3>
                <p className="text-zinc-400">
                  Inicia o teu processo de inscrição através do questionário
                  online oficial do CEDACE/IPST.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-red-500 flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-lg">Colheita de sangue</h3>
                <p className="text-zinc-400">
                  Se reunires as condições necessárias, será recolhida uma
                  pequena amostra de sangue para determinar as tuas
                  características HLA.
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-10 h-10 shrink-0 rounded-full bg-red-500 flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-lg">Entrada no registo</h3>
                <p className="text-zinc-400">
                  Só serás contactado se fores compatível com um doente que
                  necessite de um transplante.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-6">
            Perguntas frequentes
          </h2>

          <div className="space-y-5">
            <div>
              <h3 className="font-semibold">
                A doação implica sempre uma cirurgia?
              </h3>
              <p className="text-zinc-400 mt-1">
                Não. A maioria das dádivas é realizada através de um
                procedimento semelhante a uma dádiva de sangue.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">
                Vou doar imediatamente após a inscrição?
              </h3>
              <p className="text-zinc-400 mt-1">
                Não. A inscrição significa apenas que poderás ser contactado
                caso sejas compatível com um doente.
              </p>
            </div>

            <div>
              <h3 className="font-semibold">A inscrição é gratuita?</h3>
              <p className="text-zinc-400 mt-1">
                Sim. A inscrição através do processo oficial do CEDACE/IPST
                é gratuita.
              </p>
            </div>
          </div>
        </section>

        {/* Official CTA */}
        <div className="relative">
          <button
            onClick={handleStart}
            disabled={loading}
            className="block w-full text-center bg-red-500 hover:bg-red-600 transition rounded-full py-5 text-xl font-semibold disabled:opacity-100"
          >
            Iniciar inscrição oficial →
          </button>

          {loading && (
            <div className="absolute inset-0 rounded-full bg-[#09090B]/95 backdrop-blur flex flex-col items-center justify-center">
              <div className="animate-pulse text-3xl mb-2">❤️</div>
              <p className="text-white font-medium text-center">
                A encaminhar para o registo oficial português...
              </p>
            </div>
          )}
        </div>

        {/* Community Contributions */}
        <section className="mt-16 mb-10">
          <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-950/40 p-8 md:p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative max-w-2xl mx-auto">
              <div className="text-4xl mb-5">❤️</div>

              <p className="text-red-400 text-sm font-semibold uppercase tracking-[0.2em] mb-3">
                Construído com a comunidade
              </p>

              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ajuda a melhorar o OneMatch
              </h2>

              <p className="mt-5 text-zinc-300 text-base md:text-lg leading-relaxed">
                Conheces alguma informação que devemos atualizar?
                Encontraste uma fonte mais recente ou fidedigna?
                Partilha o teu conhecimento e ajuda-nos a manter o
                OneMatch correto, atualizado e útil para todos.
              </p>

              <Link
                href="/contribute?lang=pt"
                className="inline-flex items-center justify-center gap-2 mt-8 rounded-full bg-red-600 hover:bg-red-500 px-8 py-4 text-white font-semibold transition duration-300 shadow-lg shadow-red-950/30"
              >
                Ajuda-nos a melhorar
                <span aria-hidden="true">→</span>
              </Link>

              <p className="mt-5 text-sm text-zinc-500">
                Cada contributo faz a diferença.
              </p>
            </div>
          </div>
        </section>

        <p className="text-center text-zinc-500 text-sm mt-8 pb-6">
          A idade e os critérios de elegibilidade podem sofrer alterações.
          Confirma sempre a informação mais recente junto do IPST.
        </p>
      </div>
    </main>
  );
}
