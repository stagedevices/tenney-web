import { motion } from 'framer-motion';
import Section from '../components/Section';
import GlassCard from '../components/GlassCard';

const tracks = [
  {
    title: 'Tuner track',
    image: '/assets/howitworks-tuner-master@2x.png',
    steps: [
      'Select Chrono Dial, Gauge, or Numeric.',
      'Calibrate to 1¢ precision readouts.',
      'Tap and hold to lock a pitch reference.',
    ],
  },
  {
    title: 'Lattice track',
    image: '/assets/howitworks-lattice-master@2x.png',
    steps: [
      'Set root + limit for the system.',
      'Traverse ratio space without losing structure.',
      'Lock, save, and reuse lattice paths.',
    ],
  },
];

const HowItWorks = () => (
  <Section id="how-it-works" className="bg-transparent">
    <div className="space-y-10">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">How it works</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Two tracks, one instrument.</h2>
      </div>
      <div className="grid gap-10 lg:grid-cols-2">
        {tracks.map((track) => (
          <GlassCard key={track.title} className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">{track.title}</h3>
              <span className="text-xs text-white/50">Tenney</span>
            </div>
            <img src={track.image} alt={track.title} className="rounded-2xl border border-white/10" />
            <div className="grid gap-3">
              {track.steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 h-2 w-2 rounded-full bg-e3blue" />
                  <p className="text-sm text-white/70">{step}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  </Section>
);

export default HowItWorks;
