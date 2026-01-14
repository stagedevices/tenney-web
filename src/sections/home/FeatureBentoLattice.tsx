import { motion } from 'framer-motion';
import SectionFrame from '../../components/SectionFrame';

const features = [
  { title: '3–31 limits', body: 'Switch limit profiles without losing orientation.' },
  { title: 'Windowed on iPad', body: 'Run alongside session notes or notation tools.' },
  { title: 'Traverse a grid', body: 'Navigate ratios through clear axes.' },
  { title: 'Grid paths', body: 'Map repeated moves as performance paths.' },
  { title: 'Save sets', body: 'Capture systems with labels and notes.' },
  { title: 'Builder + pads', body: 'Compose ratios quickly with tactile pads.', priority: true },
  { title: 'Export/share Scala + other relevant files', body: 'Send to collaborators or hardware.', priority: true },
  { title: 'Advanced tools', body: 'Tenney height, cents deviation vs ET, scope.' },
];

const FeatureBentoLattice = () => (
  <SectionFrame className="space-y-10">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Lattice bento</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Lattice workflow</h2>
    </div>
    <div className="grid gap-6 md:grid-cols-2">
      {features.map((feature) => (
        <motion.div
          key={feature.title}
          whileHover={{ y: -6 }}
          className={`rounded-3xl border border-white/10 bg-white/5 p-6 transition ${
            feature.priority ? 'md:col-span-2 bg-white/10 shadow-[0_0_40px_rgba(43,140,255,0.35)]' : ''
          }`}
        >
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
            <span className="h-10 w-10 rounded-full border border-white/20" />
          </div>
          <p className="mt-3 text-sm text-white/60">{feature.body}</p>
        </motion.div>
      ))}
    </div>
  </SectionFrame>
);

export default FeatureBentoLattice;
