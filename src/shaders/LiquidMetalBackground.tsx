import { LiquidMetal } from '@paper-design/shaders-react';
import { SHADER_DPR, SHADER_MAX_PIXELS, SHADER_SEED } from '../constants';

const LiquidMetalBackground = ({ className }: { className?: string }) => (
  <div className={className} aria-hidden>
    <LiquidMetal
      className="h-full w-full"
      colorBack="#0B0E14"
      colorTint="#2B8CFF"
      distortion={0.35}
      contour={0.6}
      repetition={5}
      angle={35}
      speed={0}
      frame={SHADER_SEED}
      minPixelRatio={SHADER_DPR}
      maxPixelCount={SHADER_MAX_PIXELS}
    />
  </div>
);

export default LiquidMetalBackground;
