import SectionCard from "../ui/SectionCard.jsx";

function ExplanationBlock({ simpleExplanation }) {
  return (
    <SectionCard accent="border-l-[#8B5CF6]" icon="02" title="Explanation">
      <p className="text-sm leading-8 text-slate-300">{simpleExplanation}</p>
    </SectionCard>
  );
}

export default ExplanationBlock;
