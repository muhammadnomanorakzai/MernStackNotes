import SectionCard from "../ui/SectionCard.jsx";

function HowBlock({ how }) {
  return (
    <SectionCard accent="border-l-[#F59E0B]" icon="03" title="How it works">
      <ol className="space-y-3">
        {how.map((step, index) => (
          <li
            key={step}
            className="flex gap-4 rounded-2xl border border-white/6 bg-black/20 px-4 py-4 text-sm leading-7 text-slate-300"
          >
            <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-xs font-semibold text-amber-200">
              {index + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </SectionCard>
  );
}

export default HowBlock;
