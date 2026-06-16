import { Suspense, lazy } from "react";
import AnalogyBlock from "./AnalogyBlock.jsx";
import DefinitionBlock from "./DefinitionBlock.jsx";
import HowBlock from "./HowBlock.jsx";
import InterviewQA from "./InterviewQA.jsx";
import WhyBlock from "./WhyBlock.jsx";
import { useProgress } from "../../hooks/useProgress.js";
import ExplanationBlock from "./ExplanationBlock.jsx";
import UrduRevision from "./UrduRevision.jsx";
import RealLifeExample from "./RealLifeExample.jsx";
import WorldUsage from "./WorldUsage.jsx";
import CommonMistakes from "./CommonMistakes.jsx";
import InterviewSummary from "./interviewSummary.jsx";

const DiagramBlock = lazy(() => import("./DiagramBlock.jsx"));
const CodeBlock = lazy(() => import("./CodeBlock.jsx"));

function NoteCard({ topic, allTopics }) {
  const { getLastRevised, getMastery, overallMastery, setMastery } =
    useProgress(topic.id, allTopics);
  const mastery = getMastery();
  const lastRevised = getLastRevised();

  return (
    <div className="space-y-5">
      <div className="rounded-[28px] border border-white/8 bg-[#111118] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)]">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm uppercase tracking-[0.28em] text-slate-500">
              {topic.category}
            </p>
            <h1 className="mt-3 font-heading text-3xl font-semibold text-slate-50 sm:text-4xl">
              {topic.title}
            </h1>
            {/* <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-400">
              {topic.definition}
            </p> */}
          </div>

          <div className="grid gap-3 text-sm text-slate-400 sm:grid-cols-3 lg:min-w-[360px]">
            <Metric label="Difficulty" value={topic.difficulty} />
            <Metric label="Mastery" value={`${mastery}%`} />
            <Metric
              label="Last revised"
              value={lastRevised ?? "Not revised yet"}
            />
          </div>
        </div>
      </div>

      {topic.definition && <DefinitionBlock definition={topic.definition} />}
      {topic.why && <WhyBlock why={topic.why} />}
      {topic.simpleExplanation && <ExplanationBlock simpleExplanation={topic.simpleExplanation} />}
      {topic.romanUrduRevision && <UrduRevision romanUrduRevision={topic.romanUrduRevision} />}
      {topic.how && <HowBlock how={topic.how} />}
      {topic.diagram && (
        <Suspense fallback={<LoadingCard title="Visual memory anchor" />}>
          <DiagramBlock diagram={topic.diagram} title={topic.title} />
        </Suspense>
      )}
      {topic.realLifeExample && <RealLifeExample realLifeExample={topic.realLifeExample} />}
      {topic.analogy && <AnalogyBlock analogy={topic.analogy} />}
      {topic.code && (
        <Suspense fallback={<LoadingCard title="Code example" />}>
          <CodeBlock code={topic.code} />
        </Suspense>
      )}
      {topic.commonMistakes && <CommonMistakes commonMistakes={topic.commonMistakes} />}
      {topic.interviewQA && <InterviewQA interviewQA={topic.interviewQA} />}
      {topic.realWorldUsage && <WorldUsage realWorldUsage={topic.realWorldUsage} />}
      {topic.interviewSummary && <InterviewSummary interviewSummary={topic.interviewSummary} />}

      <section className="rounded-[28px] border border-white/8 bg-[#111118] p-6 shadow-[0_22px_60px_rgba(0,0,0,0.28)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="font-heading text-xl font-semibold text-slate-50">
              Mastery tracker
            </p>
            <p className="mt-2 text-sm leading-7 text-slate-400">
              Update how confident you feel on this topic. Your progress is
              saved locally and feeds the overall ring in the header.
            </p>
          </div>
          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">
            Overall mastery: {overallMastery}%
          </div>
        </div>

        <div className="mt-5 rounded-2xl border border-white/8 bg-black/20 p-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Current topic</span>
            <span className="font-medium text-slate-100">{mastery}%</span>
          </div>
          <input
            aria-label={`Set mastery for ${topic.title}`}
            className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-violet-500"
            max="100"
            min="0"
            onChange={(event) => setMastery(Number(event.target.value))}
            type="range"
            value={mastery}
          />
        </div>
      </section>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-2xl border border-white/8 bg-black/20 px-4 py-3">
      <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-medium text-slate-100">{value}</p>
    </div>
  );
}

function LoadingCard({ title }) {
  return (
    <section className="rounded-[28px] border border-white/8 bg-[#111118] p-6">
      <div className="animate-pulse">
        <div className="h-5 w-40 rounded-full bg-white/10" />
        <div className="mt-5 h-32 rounded-2xl bg-white/[0.04]" />
        <p className="mt-4 text-sm text-slate-500">
          Loading {title.toLowerCase()}...
        </p>
      </div>
    </section>
  );
}

export default NoteCard;
