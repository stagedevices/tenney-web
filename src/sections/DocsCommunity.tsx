import Section from '../components/Section';
import GlassCard from '../components/GlassCard';
import { ANDROID_HELP_URL, CONTACT_EMAIL, DISCORD_URL, GITHUB_URL } from '../config';
import { Link } from 'react-router-dom';

const cards = [
  { title: 'Docs', description: 'Guides and technical references.', to: '/docs' },
  { title: 'Learn JI', description: 'Foundations of just intonation.', to: '/docs/learn' },
  { title: 'Discord', description: 'Community and support.', href: DISCORD_URL },
  { title: 'GitHub', description: 'Roadmap and releases.', href: GITHUB_URL },
  { title: 'Email', description: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { title: 'Nightly', description: 'TestFlight channel.', to: '/nightly' },
];

const DocsCommunity = () => (
  <Section id="docs-community">
    <div className="space-y-8">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Docs + community</p>
        <h2 className="mt-4 text-3xl font-semibold text-white">Field manuals, nightly builds, and the lab.</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <GlassCard key={card.title}>
            <div className="space-y-2">
              <p className="text-lg text-white">{card.title}</p>
              <p className="text-sm text-white/70">{card.description}</p>
              {card.to ? (
                <Link className="text-e3blue" to={card.to}>Open →</Link>
              ) : (
                <a className="text-e3blue" href={card.href}>Open →</a>
              )}
            </div>
          </GlassCard>
        ))}
        <GlassCard className="border-e5orange/40">
          <p className="text-lg text-white">Help ship Android.</p>
          <p className="mt-2 text-sm text-white/70">Join the early build queue and feedback list.</p>
          <a className="text-e5orange" href={ANDROID_HELP_URL}>Signal interest →</a>
        </GlassCard>
      </div>
    </div>
  </Section>
);

export default DocsCommunity;
