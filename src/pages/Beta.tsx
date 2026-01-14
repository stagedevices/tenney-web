import { Link } from 'react-router-dom';
import AmbientBackground from '../components/AmbientBackground';
import GlassNav from '../components/GlassNav';

export default function Beta() {
  return (
    <div className="relative min-h-screen text-white">
      <AmbientBackground />
      <GlassNav />
      <main className="mx-auto flex max-w-4xl flex-col gap-8 px-6 py-16">
        <h1 className="text-4xl font-semibold">Join the Tenney beta</h1>
        <p className="text-white/70">
          Get early access builds, lattice workflows, and performer-first updates. We will reach out
          with the latest TestFlight and roadmap details.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:beta@stagedevices.io?subject=Tenney%20Beta"
            className="rounded-full border border-white/20 bg-white px-6 py-3 text-sm font-semibold text-slate-950 transition hover:-translate-y-0.5"
          >
            Email for access
          </a>
          <Link
            to="/docs"
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white/70 transition hover:-translate-y-0.5 hover:text-white"
          >
            Read docs
          </Link>
        </div>
      </main>
    </div>
  );
}
