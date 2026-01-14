import HeroScrolly from '../sections/HeroScrolly';
import HowItWorks from '../sections/HowItWorks';
import WhyTenney from '../sections/WhyTenney';
import FeatureBento from '../sections/FeatureBento';
import DocsCommunity from '../sections/DocsCommunity';
import Section from '../components/Section';
import AppStoreBadge from '../components/AppStoreBadge';

const Home = () => (
  <div>
    <HeroScrolly />
    <HowItWorks />
    <WhyTenney />
    <FeatureBento />
    <DocsCommunity />
    <Section>
      <div className="flex flex-col items-start gap-4 rounded-3xl border border-white/10 bg-white/5 p-10">
        <p className="text-xs uppercase tracking-[0.4em] text-white/60">Ready</p>
        <h2 className="text-3xl font-semibold text-white">Download Tenney for iOS, iPadOS, and macOS.</h2>
        <AppStoreBadge variant="white" />
      </div>
    </Section>
  </div>
);

export default Home;
