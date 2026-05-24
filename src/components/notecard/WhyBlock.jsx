import SectionCard from "../ui/SectionCard.jsx";

function WhyBlock({ why }) {
  return (
    <SectionCard accent="border-l-[#8B5CF6]" icon="02" title="Why does it exist?">
      <p className="text-sm leading-8 text-slate-300">{why}</p>
    </SectionCard>
  );
}

export default WhyBlock;
