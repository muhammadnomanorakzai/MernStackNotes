import SectionCard from "../ui/SectionCard.jsx";

function RealLifeExample({ realLifeExample }) {
  return (
    <SectionCard
      accent="border-l-[#8B5CF6]"
      icon="02"
      title="Real Life Example">
      <p className="text-sm leading-8 text-slate-300">{realLifeExample}</p>
    </SectionCard>
  );
}

export default RealLifeExample;
