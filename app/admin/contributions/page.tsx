
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase";

type Contribution = {
  id: string;
  type: string;
  country: string | null;
  message: string;
  source_url: string | null;
  contact_email: string | null;
  status: "new" | "under_review" | "verified" | "implemented" | "rejected";
  created_at: string;
};

type Status = Contribution["status"];

const statusLabels: Record<Status, string> = {
  new: "New",
  under_review: "Under review",
  verified: "Verified",
  implemented: "Implemented",
  rejected: "Rejected",
};

const typeLabels: Record<string, string> = {
  incorrect_info: "Incorrect information",
  suggest_registry: "Suggest a registry",
  share_experience: "Shared experience",
  other: "Other",
};

export default function AdminContributionsPage() {
  const [supabase] = useState(() => createClient());

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  const loadContributions = useCallback(async () => {
    const { data, error } = await supabase
      .from("contributions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      setError("Could not load contributions. Check your access permissions.");
      return;
    }

    setContributions(data ?? []);
    setError("");
  }, [supabase]);

  const refreshContributions = async () => {
    setRefreshing(true);
    await loadContributions();
    setRefreshing(false);
  };

  useEffect(() => {
    let active = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;

      setLoggedIn(Boolean(data.session));
      setLoading(false);

      if (data.session) {
        void loadContributions();
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setLoggedIn(Boolean(session));

        if (session) {
          void loadContributions();
        } else {
          setContributions([]);
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [supabase, loadContributions]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("Login failed. Check your email and password.");
    }

    setSubmitting(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setLoggedIn(false);
    setContributions([]);
  };

  const updateStatus = async (id: string, status: Status) => {
    setError("");

    const { error } = await supabase
      .from("contributions")
      .update({ status })
      .eq("id", id);

    if (error) {
      setError("Could not update the contribution status.");
      return;
    }

    setContributions((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const counts = useMemo(() => ({
    all: contributions.length,
    new: contributions.filter((item) => item.status === "new").length,
    under_review: contributions.filter((item) => item.status === "under_review").length,
    verified: contributions.filter((item) => item.status === "verified").length,
    implemented: contributions.filter((item) => item.status === "implemented").length,
    rejected: contributions.filter((item) => item.status === "rejected").length,
  }), [contributions]);

  const filteredContributions = useMemo(() => {
    return contributions.filter((item) => {
      const matchesStatus =
        statusFilter === "all" || item.status === statusFilter;

      const matchesType =
        typeFilter === "all" || item.type === typeFilter;

      return matchesStatus && matchesType;
    });
  }, [contributions, statusFilter, typeFilter]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#09090B] text-white flex items-center justify-center">
        Loading...
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen bg-[#09090B] text-white px-6 py-12">
        <div className="max-w-md mx-auto pt-20">
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🔐</div>
            <h1 className="text-3xl font-bold">OneMatch Admin</h1>
            <p className="text-zinc-400 mt-3">
              Sign in to manage community contributions.
            </p>
          </div>

          <form
            onSubmit={handleLogin}
            className="rounded-3xl border border-zinc-800 bg-zinc-900/60 p-7 space-y-5"
          >
            <div>
              <label className="block text-sm mb-2">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm mb-2">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 outline-none focus:border-red-500"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-400">{error}</p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-full bg-red-600 py-3 font-semibold hover:bg-red-500 transition disabled:opacity-50"
            >
              {submitting ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-white px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-red-500 text-sm font-semibold tracking-wider uppercase">
              OneMatch
            </p>
            <h1 className="text-3xl font-bold mt-1">Community contributions</h1>
            <p className="text-zinc-400 mt-2">
              {counts.all} contribution(s) received
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={refreshContributions}
              disabled={refreshing}
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm hover:bg-zinc-800 transition disabled:opacity-50"
            >
              {refreshing ? "Refreshing..." : "↻ Refresh"}
            </button>
            <button
              onClick={handleLogout}
              className="rounded-full border border-zinc-700 px-5 py-2 text-sm hover:bg-zinc-800 transition"
            >
              Sign out
            </button>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {[
            { key: "all", label: "All", value: counts.all },
            { key: "new", label: "New", value: counts.new },
            { key: "under_review", label: "Under review", value: counts.under_review },
            { key: "verified", label: "Verified", value: counts.verified },
            { key: "implemented", label: "Implemented", value: counts.implemented },
            { key: "rejected", label: "Rejected", value: counts.rejected },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setStatusFilter(item.key)}
              className={`rounded-2xl border p-4 text-left transition ${
                statusFilter === item.key
                  ? "border-red-500 bg-red-500/10"
                  : "border-zinc-800 bg-zinc-900/60 hover:border-zinc-600"
              }`}
            >
              <p className="text-xs text-zinc-400">{item.label}</p>
              <p className="text-2xl font-bold mt-1">{item.value}</p>
            </button>
          ))}
        </section>

        <section className="flex flex-col sm:flex-row gap-3 mb-6">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm"
            aria-label="Filter by status"
          >
            <option value="all">All statuses</option>
            {Object.entries(statusLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-xl border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm"
            aria-label="Filter by type"
          >
            <option value="all">All contribution types</option>
            {Object.entries(typeLabels).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <p className="text-sm text-zinc-500 self-center">
            Showing {filteredContributions.length} of {counts.all}
          </p>
        </section>

        {error && (
          <p role="alert" className="mb-6 text-sm text-red-400">{error}</p>
        )}

        <div className="space-y-5">
          {filteredContributions.length === 0 ? (
            <div className="rounded-2xl border border-zinc-800 p-8 text-center text-zinc-400">
              No contributions match these filters.
            </div>
          ) : (
            filteredContributions.map((item) => (
              <article
                key={item.id}
                className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6"
              >
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-lg">
                      {typeLabels[item.type] ?? item.type}
                    </p>
                    <p className="text-sm text-zinc-400 mt-1">
                      Country: {item.country ?? "Not specified"}
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>

                  <select
                    value={item.status}
                    onChange={(e) => updateStatus(item.id, e.target.value as Status)}
                    className="rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm"
                    aria-label="Contribution status"
                  >
                    {Object.entries(statusLabels).map(([value, label]) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                </div>

                <div className="mt-5 rounded-xl bg-zinc-950/70 p-4">
                  <p className="text-sm text-zinc-300 whitespace-pre-wrap">
                    {item.message}
                  </p>
                </div>

                {item.source_url && (
                  <p className="mt-4 text-sm">
                    Source:{" "}
                    <a
                      href={item.source_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-400 underline break-all"
                    >
                      {item.source_url}
                    </a>
                  </p>
                )}

                {item.contact_email && (
                  <p className="mt-3 text-sm text-zinc-400">
                    Contact: {item.contact_email}
                  </p>
                )}

                <p className="mt-4 text-xs text-zinc-600 break-all">
                  ID: {item.id}
                </p>
              </article>
            ))
          )}
        </div>
      </div>
    </main>
  );
}
