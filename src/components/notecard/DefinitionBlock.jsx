import SectionCard from "../ui/SectionCard.jsx";

function DefinitionBlock({ definition }) {
  return (
    <SectionCard accent="border-l-[#3B82F6]" icon="01" title="What is it?">
      <p className="text-sm leading-8 text-slate-300">{definition}</p>
    </SectionCard>
  );
}

export default DefinitionBlock;
