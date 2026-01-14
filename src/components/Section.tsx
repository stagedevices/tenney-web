import { ReactNode } from 'react';

const Section = ({ id, children, className }: { id?: string; children: ReactNode; className?: string }) => (
  <section id={id} className={`relative py-20 ${className ?? ''}`}>
    <div className="mx-auto w-full max-w-6xl px-6">
      {children}
    </div>
  </section>
);

export default Section;
