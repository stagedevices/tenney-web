import { FlutedGlass } from '@paper-design/shaders-react';
import { SHADER_DPR, SHADER_MAX_PIXELS, SHADER_SEED } from '../constants';

const FlutedGlassPanel = ({ className }: { className?: string }) => (
  <div className={className} aria-hidden>
    <FlutedGlass
      className="h-full w-full"
      colorBack="#0B0E14"
      colorShadow="#0B0E14"
      colorHighlight="#2B8CFF"
      size={0.6}
      distortion={0.4}
      highlights={0.5}
      speed={0}
      frame={SHADER_SEED}
      minPixelRatio={SHADER_DPR}
      maxPixelCount={SHADER_MAX_PIXELS}
    />
  </div>
);

export default FlutedGlassPanel;
