import SectionCard from "../ui/SectionCard.jsx";

function CommonMistakes({ commonMistakes }) {
  if (!commonMistakes) return null;

  return (
    <SectionCard accent="border-l-[#8B5CF6]" icon="02" title="Common Mistakes">
      <div className="space-y-4">
        {Array.isArray(commonMistakes) ? (
          <ul className="list-inside list-disc space-y-2">
            {commonMistakes.map((item, index) => (
              <li key={index} className="text-sm leading-7 text-slate-300">
                {typeof item === "string" ? (
                  item
                ) : (
                  <span>
                    <strong className="text-red-400">{item.mistake || "Mistake"}: </strong>
                    {item.explanation}
                  </span>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm leading-8 text-slate-300">{commonMistakes}</p>
        )}
      </div>
    </SectionCard>
  );
}

export default CommonMistakes;
