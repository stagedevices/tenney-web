import Section from '../components/Section';
import GlassCard from '../components/GlassCard';

const bullets = [
  {
    title: '1¢ precision',
    description: 'Fine-grained readouts designed for real tuning work.',
  },
  {
    title: '3–31 limits',
    description: 'Traverse systems across limits without losing structure.',
  },
  {
    title: 'Save, export, share',
    description: 'Persist systems and export/share standard formats (e.g., Scala).',
  },
];

const WhyTenney = () => (
  <Section id="why" className="bg-transparent">
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Why Tenney</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Proof-grade tooling for just intonation.</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {bullets.map((bullet) => (
          <GlassCard key={bullet.title}>
            <h3 className="text-lg font-semibold text-white">{bullet.title}</h3>
            <p className="mt-3 text-sm text-white/70">{bullet.description}</p>
          </GlassCard>
        ))}
      </div>
    </div>
  </Section>
);

export default WhyTenney;
