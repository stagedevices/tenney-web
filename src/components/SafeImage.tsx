import { useState } from 'react';

type SafeImageProps = {
  src: string;
  alt: string;
  className?: string;
  fallbackSvg?: string;
};

const defaultFallback =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600"><rect width="100%" height="100%" fill="%230B0E14"/><text x="50%" y="50%" fill="%23FFFFFF" font-family="Inter, sans-serif" font-size="28" text-anchor="middle">Tenney Placeholder</text></svg>';

const SafeImage = ({ src, alt, className, fallbackSvg = defaultFallback }: SafeImageProps) => {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={() => setImgSrc(fallbackSvg)}
      loading="lazy"
    />
  );
};

export default SafeImage;
