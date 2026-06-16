import { useMemo } from "react";
import { getRecentlyRevisedTopics } from "../../hooks/useProgress.js";
import { getTopicCollections } from "../../utils/topicHelpers.js";

function EmptyState({ allTopics, onSelectTopic }) {
  const recentlyRevised = useMemo(() => getRecentlyRevisedTopics(allTopics), [allTopics]);
  const categoryCount = Object.keys(getTopicCollections(allTopics)).length;

  return (
    <div className="flex min-h-full items-center justify-center">
      <div className="w-full max-w-4xl rounded-4xl border border-white/8 bg-[#111118] p-8 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:p-10">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] border border-violet-400/25 bg-violet-500/12 text-2xl font-semibold tracking-[0.24em] text-violet-200">
            DN
          </div>
          <h1 className="mt-6 font-heading text-4xl font-semibold text-slate-50 sm:text-5xl">
            DevNotes
          </h1>
          <p className="mt-4 text-base leading-8 text-slate-400">
            Your personal CS interview preparation system
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          <StatCard label="Topics ready" value={String(allTopics.length).padStart(2, "0")} />
          <StatCard label="Categories" value={String(categoryCount).padStart(2, "0")} />
          <StatCard label="How to begin" value="Pick a note" />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[28px] border border-white/8 bg-black/20 p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="font-heading text-xl font-semibold text-slate-50">Start your revision</p>
                <p className="mt-2 text-sm leading-7 text-slate-400">
                  Select a topic from the sidebar to begin. Everything in the note is rendered from data, so new topics drop in automatically.
                </p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {allTopics.map((topic) => (
                <button
                  key={topic.id}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-sm text-slate-200 transition hover:border-violet-400/35 hover:bg-violet-500/10"
                  onClick={() => onSelectTopic(topic.id)}
                  type="button"
                >
                  {topic.title}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-[28px] border border-white/8 bg-black/20 p-6">
            <p className="font-heading text-xl font-semibold text-slate-50">Recently revised</p>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Local progress is stored in your browser, including the last topic revision date.
            </p>

            <div className="mt-5 space-y-3">
              {recentlyRevised.length ? (
                recentlyRevised.map((topic) => (
                  <div
                    key={topic.id}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3"
                  >
                    <p className="text-sm font-medium text-slate-100">{topic.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{topic.lastRevised}</p>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-5 text-sm text-slate-500">
                  No revisions yet. Open a topic to start your study trail.
                </div>
              )}
            </div>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          Select a topic from the sidebar to begin
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="rounded-[24px] border border-white/8 bg-black/20 p-5 text-center">
      <p className="text-xs uppercase tracking-[0.22em] text-slate-500">{label}</p>
      <p className="mt-3 font-heading text-2xl font-semibold text-slate-50">{value}</p>
    </div>
  );
}

export default EmptyState;
