import { motion } from 'framer-motion';
import SectionFrame from '../../components/SectionFrame';
import SafeImage from '../../components/SafeImage';

const stepsLattice = [
  { title: 'Choose root', body: 'Set a root pitch and reference path.' },
  { title: 'Traverse + select ratios', body: 'Move through the lattice and pick targets.' },
  { title: 'Save + share a system', body: 'Persist and export your structure.' },
];

const stepsTuner = [
  { title: 'Choose root + limit', body: 'Dial in a limit profile for the session.' },
  { title: 'Pick a tuner', body: 'Chrono Dial, Gauge, or Numeric.' },
  { title: 'Lock for performance', body: 'Hold to lock when the stage heats up.' },
];

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const HowItWorks = () => (
  <SectionFrame className="space-y-16">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">How it works</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Lattice first. Tuner second.</h2>
    </div>

    <div className="grid gap-10 lg:grid-cols-2">
      <motion.div
        className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Lattice track</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Build a system</h3>
          </div>
          <SafeImage
            src="/public/assets/howitworks-lattice-master@2x.png"
            alt="Lattice master"
            className="h-20 w-20 object-contain"
          />
        </div>
        <div className="space-y-4">
          {stepsLattice.map((step) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <h4 className="text-sm font-semibold text-white">{step.title}</h4>
              <p className="mt-2 text-sm text-white/60">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="space-y-6 rounded-3xl border border-white/10 bg-white/5 p-6"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.4 }}
        transition={{ staggerChildren: 0.12 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">Tuner track</p>
            <h3 className="mt-2 text-2xl font-semibold text-white">Track in the moment</h3>
          </div>
          <SafeImage
            src="/public/assets/howitworks-tuner-master@2x.png"
            alt="Tuner master"
            className="h-20 w-20 object-contain"
          />
        </div>
        <div className="space-y-4">
          {stepsTuner.map((step) => (
            <motion.div
              key={step.title}
              variants={cardVariants}
              className="rounded-2xl border border-white/10 bg-black/20 p-4"
            >
              <h4 className="text-sm font-semibold text-white">{step.title}</h4>
              <p className="mt-2 text-sm text-white/60">{step.body}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </SectionFrame>
);

export default HowItWorks;
