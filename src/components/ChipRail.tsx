const ChipRail = ({ chips, className }: { chips: string[]; className?: string }) => (
  <div className={`flex flex-wrap items-center gap-3 ${className ?? ''}`}>
    {chips.map((chip) => (
      <span
        key={chip}
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/70"
      >
        {chip}
      </span>
    ))}
  </div>
);

export default ChipRail;
