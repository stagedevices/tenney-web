import { Link } from 'react-router-dom';
import AmbientBackground from '../components/AmbientBackground';
import GlassNav from '../components/GlassNav';

export default function Docs() {
  return (
    <div className="relative min-h-screen text-white">
      <AmbientBackground />
      <GlassNav />
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
        <h1 className="text-4xl font-semibold">Docs</h1>
        <p className="text-white/70">
          The Tenney documentation hub is expanding. For now, explore the overview and join the beta
          to receive the full field guide.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="https://stagedevices.github.io/tenney-web"
            className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
            rel="noreferrer"
            target="_blank"
          >
            View public overview
          </a>
          <Link
            to="/beta"
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition hover:-translate-y-0.5 hover:text-white"
          >
            Join beta
          </Link>
        </div>
      </main>
    </div>
  );
}
