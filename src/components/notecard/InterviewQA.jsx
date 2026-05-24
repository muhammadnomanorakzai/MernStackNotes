import { useState } from "react";
import SectionCard from "../ui/SectionCard.jsx";

function InterviewQA({ interviewQA }) {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (question) => {
    setOpenItems((current) => ({ ...current, [question]: !current[question] }));
  };

  return (
    <SectionCard accent="border-l-[#EF4444]" icon="07" title="Interview Q&A">
      <div className="space-y-3">
        {interviewQA.map((item) => {
          const isOpen = Boolean(openItems[item.q]);

          return (
            <article
              key={item.q}
              className="overflow-hidden rounded-2xl border border-white/8 bg-black/20"
            >
              <button
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left"
                onClick={() => toggleItem(item.q)}
                type="button"
              >
                <span className="text-sm font-medium text-slate-100">{item.q}</span>
                <svg
                  aria-hidden="true"
                  className={`h-5 w-5 shrink-0 text-slate-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>

              {isOpen ? (
                <div className="border-t border-white/8 px-4 py-4 text-sm leading-7 text-slate-300">
                  {item.a}
                </div>
              ) : null}
            </article>
          );
        })}
      </div>
    </SectionCard>
  );
}

export default InterviewQA;
