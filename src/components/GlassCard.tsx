import { ReactNode } from 'react';

const GlassCard = ({ children, className }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-2xl border border-white/15 bg-white/5 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.25)] backdrop-blur ${className ?? ''}`}>
    {children}
  </div>
);

export default GlassCard;
