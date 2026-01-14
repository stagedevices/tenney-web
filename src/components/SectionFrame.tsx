import { PropsWithChildren } from 'react';

const SectionFrame = ({ children, className }: PropsWithChildren<{ className?: string }>) => (
  <section className={`mx-auto max-w-6xl px-6 py-20 ${className ?? ''}`}>{children}</section>
);

export default SectionFrame;
