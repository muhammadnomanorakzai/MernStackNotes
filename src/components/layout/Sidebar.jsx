import { useMemo, useState } from "react";
import { useSearch } from "../../hooks/useSearch.js";
import {
  CATEGORY_ACCENTS,
  DIFFICULTY_TONES,
  getTopicCollections,
  topicMatchesCategory,
} from "../../utils/topicHelpers.js";

function SearchIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function Chevron({ open }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 transition-transform ${open ? "rotate-90" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="m9 6 6 6-6 6" />
    </svg>
  );
}

function PanelIcon() {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M16 4v16" />
    </svg>
  );
}

function Sidebar({ allTopics, onSelectTopic, onToggleSidebar, selectedTopicId, sidebarCollapsed }) {
  const { query, results, setQuery } = useSearch(allTopics);
  const [collapsedGroups, setCollapsedGroups] = useState({});

  const groupedTopics = useMemo(() => getTopicCollections(allTopics), [allTopics]);
  const visibleTopics = query.trim() ? getTopicCollections(results) : groupedTopics;

  return (
    <aside
      className={`shrink-0 overflow-hidden border-white/8 bg-[#0E0E14] transition-all duration-300 ${
        sidebarCollapsed
          ? "max-h-0 w-0 border-b-0 md:h-full md:max-h-none md:w-0 md:border-r"
          : "max-h-[42vh] w-full border-b md:h-full md:max-h-none md:w-[260px] md:border-b-0 md:border-r"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="border-b border-white/8 p-4">
          <div className="rounded-2xl border border-white/8 bg-[#111118] p-3">
            <div className="mb-3 flex items-center justify-between gap-3">
              <label className="block text-xs font-medium uppercase tracking-[0.22em] text-slate-500">
                Search topics
              </label>
              <button
                aria-label="Collapse sidebar"
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-slate-400 transition hover:border-white/20 hover:text-white"
                onClick={onToggleSidebar}
                type="button"
              >
                <PanelIcon />
              </button>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/8 bg-black/20 px-3 py-2 text-slate-400 transition focus-within:border-violet-400/40 focus-within:text-slate-200">
              <SearchIcon />
              <input
                className="w-full bg-transparent text-sm text-slate-100 outline-none placeholder:text-slate-500"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Data types, React, async..."
                type="text"
                value={query}
              />
            </div>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-3 py-4">
          <div className="space-y-4">
            {Object.entries(visibleTopics).map(([category, topics]) => {
              const isOpen = collapsedGroups[category] !== true;
              const accent = CATEGORY_ACCENTS[category] ?? "border-slate-500";

              return (
                <section key={category}>
                  <button
                    className={`flex w-full items-center justify-between rounded-xl border border-white/8 bg-[#111118] px-3 py-2 text-left transition hover:border-white/15 hover:bg-white/[0.04] ${accent}`}
                    onClick={() =>
                      setCollapsedGroups((current) => ({ ...current, [category]: isOpen }))
                    }
                    type="button"
                  >
                    <div>
                      <p className="font-heading text-sm font-semibold text-slate-100">{category}</p>
                      <p className="text-xs text-slate-500">
                        {topics.length} topic{topics.length === 1 ? "" : "s"}
                      </p>
                    </div>
                    <Chevron open={isOpen} />
                  </button>

                  {isOpen ? (
                    <div className="mt-2 space-y-2 pl-2">
                      {topics.map((topic) => {
                        const tone = DIFFICULTY_TONES[topic.difficulty] ?? DIFFICULTY_TONES.Beginner;
                        const active = topic.id === selectedTopicId;
                        const matchesSelectedCategory = topicMatchesCategory(topic, category);

                        return (
                          <button
                            key={topic.id}
                            className={`w-full rounded-2xl border px-3 py-3 text-left transition ${
                              active
                                ? "border-white/10 bg-gradient-to-r from-violet-500/18 via-sky-500/10 to-transparent shadow-[0_16px_40px_rgba(12,12,18,0.36)]"
                                : "border-transparent bg-transparent hover:border-white/8 hover:bg-white/[0.03]"
                            }`}
                            onClick={() => onSelectTopic(topic.id)}
                            type="button"
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <p className="truncate text-sm font-medium text-slate-100">{topic.title}</p>
                                <p className="mt-1 truncate text-xs text-slate-500">
                                  {matchesSelectedCategory ? topic.tags.join(" | ") : topic.category}
                                </p>
                              </div>
                              <span
                                aria-label={topic.difficulty}
                                className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${tone.dot}`}
                              />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  ) : null}
                </section>
              );
            })}

            {!Object.keys(visibleTopics).length ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-[#111118] p-4 text-sm text-slate-400">
                No topics matched your search.
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;
