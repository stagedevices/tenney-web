import { PaperTexture } from '@paper-design/shaders-react';
import { SHADER_DPR, SHADER_MAX_PIXELS, SHADER_SEED, SHADERS_ENABLED } from './shaderConfig';

const PaperPanelTexture = ({ className }: { className?: string }) => {
  if (!SHADERS_ENABLED) {
    return <div className={className} aria-hidden />;
  }

  return (
    <div className={className} aria-hidden>
      <PaperTexture
        className="h-full w-full"
        colorFront="#F6F3EE"
        colorBack="#ECE7DD"
        speed={0}
        frame={SHADER_SEED}
        minPixelRatio={SHADER_DPR}
        maxPixelCount={SHADER_MAX_PIXELS}
      />
    </div>
  );
};

export default PaperPanelTexture;
