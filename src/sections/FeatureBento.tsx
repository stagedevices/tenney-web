import { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';

const tunerFeatures = [
  '3–31 limits',
  'three tuners (Chrono Dial / Gauge / Numeric)',
  '1¢ precision',
  'tap+hold lock',
  'stage mode',
  'windowed on iPad',
  'root + limit workflow',
  'offline / no accounts',
];

const latticeFeatures = [
  '3–31 limits',
  'windowed on iPad',
  'traverse a grid (without showing a full grid)',
  'grid paths',
  'save sets',
  'builder + pads',
  'export/share Scala + other relevant files',
  'advanced tools (Tenney height, cents deviation vs ET, scope)',
];

const FeatureBento = () => {
  const [tab, setTab] = useState<'tuner' | 'lattice'>('tuner');
  const features = tab === 'tuner' ? tunerFeatures : latticeFeatures;

  return (
    <Section id="features">
      <div className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Feature bento</p>
            <h2 className="mt-4 text-3xl font-semibold text-white">Instrument-ready control.</h2>
          </div>
          <div className="flex gap-2 rounded-full border border-white/15 bg-white/5 p-1">
            {(['tuner', 'lattice'] as const).map((item) => (
              <button
                key={item}
                className={`rounded-full px-4 py-2 text-xs uppercase tracking-[0.3em] transition ${tab === item ? 'bg-white text-black' : 'text-white/70'}`}
                onClick={() => setTab(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              whileHover={{ y: -6 }}
            >
              <GlassCard className="h-full">
                <p className="text-sm text-white/80">{feature}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default FeatureBento;
