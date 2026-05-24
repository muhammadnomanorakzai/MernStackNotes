function ProgressRing({ label, progress }) {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (Math.min(Math.max(progress, 0), 100) / 100) * circumference;

  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-16 w-16 items-center justify-center">
        <svg className="-rotate-90" height="64" width="64">
          <circle cx="32" cy="32" fill="transparent" r={radius} stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
          <circle
            cx="32"
            cy="32"
            fill="transparent"
            r={radius}
            stroke="#7C3AED"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="round"
            strokeWidth="6"
          />
        </svg>
        <span className="absolute text-sm font-semibold text-slate-100">{progress}%</span>
      </div>
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{label}</p>
        <p className="mt-1 text-sm text-slate-300">Across all saved topics</p>
      </div>
    </div>
  );
}

export default ProgressRing;
