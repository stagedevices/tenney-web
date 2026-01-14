import { motion } from 'framer-motion';
import SectionFrame from '../../components/SectionFrame';

const features = [
  { title: '3–31 limits', body: 'Stay calibrated across limit profiles.' },
  { title: 'Three tuners: Chrono Dial / Gauge / Numeric', body: 'Switch readouts for the task at hand.' },
  { title: '1¢ precision', body: 'Confidence-grade feedback for tuning work.' },
  { title: 'Tap+hold lock', body: 'Lock a reference pitch on demand.', priority: true },
  { title: 'Stage mode', body: 'High contrast with instant lock recall.', priority: true },
  { title: 'Windowed on iPad', body: 'Keep it visible with other tools.' },
  { title: 'Root + limit workflow', body: 'Set your baseline in seconds.' },
  { title: 'Offline / no accounts', body: 'Remain ready without logins.' },
];

const FeatureBentoTuner = () => (
  <SectionFrame className="space-y-10">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Tuner bento</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Tuner workflow</h2>
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

export default FeatureBentoTuner;
