import SectionCard from "../ui/SectionCard.jsx";

function InterviewSummary({ interviewSummary }) {
  return (
    <SectionCard
      accent="border-l-[#8B5CF6]"
      icon="02"
      title="Interview Summary">
      <p className="text-sm leading-8 text-slate-300">{interviewSummary}</p>
    </SectionCard>
  );
}

export default InterviewSummary;
