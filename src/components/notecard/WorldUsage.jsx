import SectionCard from "../ui/SectionCard.jsx";

function WorldUsage({ realWorldUsage }) {
  return (
    <SectionCard accent="border-l-[#8B5CF6]" icon="02" title="RealWorldUsage">
      <p className="text-sm leading-8 text-slate-300">{realWorldUsage}</p>
    </SectionCard>
  );
}

export default WorldUsage;
