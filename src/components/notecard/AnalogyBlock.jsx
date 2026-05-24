import SectionCard from "../ui/SectionCard.jsx";

function AnalogyBlock({ analogy }) {
  return (
    <SectionCard accent="border-l-[#10B981]" icon="05" title="Analogy">
      <p className="text-sm leading-8 text-slate-300">{analogy}</p>
    </SectionCard>
  );
}

export default AnalogyBlock;
