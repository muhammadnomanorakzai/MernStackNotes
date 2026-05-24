function SectionCard({ accent, children, icon, title }) {
  return (
    <section
      className={`rounded-[28px] border border-white/8 border-l-[3px] ${accent} bg-[#111118] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_26px_70px_rgba(0,0,0,0.34)]`}
    >
      <div className="mb-5 flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/8 bg-black/20 text-xs font-semibold tracking-[0.22em] text-slate-300">
          {icon}
        </div>
        <h2 className="font-heading text-xl font-semibold text-slate-50">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default SectionCard;
