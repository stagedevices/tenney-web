import SectionFrame from '../../components/SectionFrame';

const bullets = [
  { title: '1¢ precision', body: 'Fine-grained readouts designed for real tuning work.' },
  { title: '3–31 limits', body: 'Traverse systems across limits without losing structure.' },
  { title: 'Save, export, share', body: 'Persist systems and export/share standard formats (e.g., Scala).' },
];

const WhyTenney = () => (
  <SectionFrame className="space-y-10">
    <div>
      <p className="text-xs uppercase tracking-[0.4em] text-white/60">Why Tenney</p>
      <h2 className="mt-4 text-3xl font-semibold text-white">Built for tuning work.</h2>
    </div>
    <div className="grid gap-6 md:grid-cols-3">
      {bullets.map((item) => (
        <div key={item.title} className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          <p className="mt-2 text-sm text-white/60">{item.body}</p>
        </div>
      ))}
    </div>
  </SectionFrame>
);

export default WhyTenney;
