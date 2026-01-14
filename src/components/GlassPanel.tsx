import { PropsWithChildren } from 'react';
import FlutedGlassOverlay from '../shaders/FlutedGlassOverlay';

const GlassPanel = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <div className={`relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 ${className ?? ''}`}>
    <FlutedGlassOverlay className="absolute inset-0 opacity-40" />
    <div className="relative z-10">{children}</div>
  </div>
);

export default GlassPanel;
