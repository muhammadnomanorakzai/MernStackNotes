import Badge from "../ui/Badge.jsx";
import ProgressRing from "../ui/ProgressRing.jsx";
import { useProgress } from "../../hooks/useProgress.js";

function PanelIcon({ collapsed }) {
  return (
    <svg aria-hidden="true" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d={collapsed ? "M8 4v16" : "M16 4v16"} />
    </svg>
  );
}

function Header({ allTopics, onToggleSidebar, selectedTopic, sidebarCollapsed }) {
  const { overallMastery } = useProgress(selectedTopic?.id, allTopics);

  return (
    <header className="sticky top-0 z-20 border-b border-white/10 bg-[#0A0A0F]/95 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6 lg:px-8">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <button
              aria-label={sidebarCollapsed ? "Open sidebar" : "Collapse sidebar"}
              className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#111118] text-slate-300 transition hover:border-white/20 hover:text-white"
              onClick={onToggleSidebar}
              type="button"
            >
              <PanelIcon collapsed={sidebarCollapsed} />
            </button>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/30 bg-violet-500/15 text-sm font-semibold tracking-[0.2em] text-violet-200">
              DN
            </div>
            <div>
              <p className="font-heading text-lg font-semibold text-slate-50">DevNotes</p>
              <p className="text-sm text-slate-400">
                {selectedTopic
                  ? "Revision view for your selected topic"
                  : "Your personal CS interview preparation system"}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {selectedTopic ? (
            <div className="hidden items-center gap-3 rounded-2xl border border-white/8 bg-[#111118] px-4 py-3 md:flex">
              <div className="min-w-0">
                <p className="truncate font-heading text-base font-semibold text-slate-50">
                  {selectedTopic.title}
                </p>
                <p className="text-sm text-slate-400">{selectedTopic.category}</p>
              </div>
              <Badge difficulty={selectedTopic.difficulty} />
            </div>
          ) : null}

          <div className="rounded-2xl border border-white/8 bg-[#111118] px-3 py-2">
            <ProgressRing label="Overall mastery" progress={overallMastery} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
