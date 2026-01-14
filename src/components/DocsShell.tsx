import { PropsWithChildren } from 'react';
import PaperPanelTexture from '../shaders/PaperPanelTexture';

const DocsShell = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <div className="mx-auto max-w-5xl px-6 py-16">
    <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-[#F6F3EE] p-10">
      <PaperPanelTexture className="absolute inset-0 opacity-90" />
      <div className="relative z-10 text-black">
        <p className="text-xs uppercase tracking-[0.4em] text-black/60">Docs</p>
        <h1 className="mt-4 text-4xl font-semibold text-black">{title}</h1>
        <div className="mt-6 space-y-6 text-base leading-relaxed text-black/80">{children}</div>
      </div>
    </div>
  </div>
);

export default DocsShell;
