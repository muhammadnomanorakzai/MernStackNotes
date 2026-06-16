import SectionCard from "../ui/SectionCard.jsx";

function UrduRevision({ romanUrduRevision }) {
  return (
    <SectionCard
      accent="border-l-[#8B5CF6]"
      icon="02"
      title="Roman Urdu Explanation">
      <p className="text-sm leading-8 text-slate-300">{romanUrduRevision}</p>
    </SectionCard>
  );
}

export default UrduRevision;
