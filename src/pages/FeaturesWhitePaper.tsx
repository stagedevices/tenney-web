import { Link } from "react-router-dom";
import BackgroundField from "../components/BackgroundField";

export default function FeaturesWhitePaper() {
  return (
    <main className="relative tenney-pagegrid">
      <BackgroundField />
      <div className="mx-auto max-w-4xl space-y-10 px-6 py-16">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">
            White paper
          </p>
          <h1 className="text-4xl font-semibold text-slate-900 dark:text-white">
            Tenney: Pitch as Spatial Navigation
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This document outlines the interaction model behind Tenney’s just intonation workflow,
            focusing on lattice navigation, vocabulary constraints, and performance presentation.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>Version 1.0</span>
            <span aria-hidden>•</span>
            <span>Last updated: 2024-10-01</span>
            <span aria-hidden>•</span>
            <Link
              to="/features"
              className="text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Back to features
            </Link>
          </div>
        </header>

        <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Abstract</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Tenney reframes just intonation as a spatial interface. Instead of scrolling through
            numeric lists, performers traverse a lattice that encodes ratios as directional
            movement. The system pairs this lattice with vocabulary filters, tooling for performance
            layouts, and export formats so that a tuning is both navigable and portable.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Design goals for just intonation
          </h2>
          <ul className="grid gap-3 text-sm text-slate-600 dark:text-slate-300">
            <li className="list-disc pl-5">
              Make harmonic relationships visible by anchoring ratios to spatial distance.
            </li>
            <li className="list-disc pl-5">
              Reduce cognitive load with vocabulary constraints, locks, and landmark labels.
            </li>
            <li className="list-disc pl-5">
              Provide tools that move from exploration to repeatable performance layouts.
            </li>
            <li className="list-disc pl-5">
              Preserve portability with exports that translate to common tuning formats.
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Pitch as a lattice
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The lattice is generated from prime vectors. Each axis represents a prime factor, and a
            coordinate corresponds to a reduced ratio. Moving diagonally traverses compound
            intervals, so harmonic proximity is visible as spatial proximity. Zooming changes the
            density of displayed ratios without altering the underlying math, allowing performers to
            focus on local neighborhoods or broader harmonic space.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            A reference anchor keeps the ear aligned. By holding a tonic or reference ratio in view,
            performers can move through the lattice while maintaining orientation. Lattice cards
            translate any point into ratio, cents deviation, and prime-limit vocabulary, which keeps
            the map interpretable during rehearsal and performance.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Vocabulary and locking
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tenney uses prime-limit vocabulary as a way to scope available pitch. Filters such as
            5-limit, 7-limit, or 11-limit compress the lattice into a smaller cone, narrowing the
            decision space while preserving harmonic intent. Lock mode applies the filter in
            performance, preventing accidental ratios and keeping ensemble pitch aligned.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Locks are additive: a performer can combine a vocabulary lock with pad layouts and
            overlays. This means a rehearsal preset can specify both the accessible ratios and the
            physical layout that triggers them, without remapping or re-entering data.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Tools for performance layout
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Builder tools translate the lattice into surfaces that can be played. Pads, gesture
            lanes, and scopes allow performers to capture ratio sets and reuse them quickly. Because
            each pad references a ratio ID, layouts remain stable even if the tonic changes. The
            scope lets a player audition nearby ratios without moving away from their layout.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            These tools are optimized for clarity. Labels, ratio previews, and lock indicators are
            positioned so a performer can read them in motion. The goal is not to hide the
            underlying math, but to make it actionable in a rehearsal or live setting.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Export and portability
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Tenney exports tuning data as Scala, CSV, tuning tables, and MTS-compatible formats.
            Exports include both ratios and cents offsets so that external instruments can interpret
            the data without ambiguity. Project packs bundle overlays, locks, and layout metadata so
            collaborators can reproduce an entire tuning setup.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            This portability ensures that a tuning created in Tenney can become a rehearsal preset,
            a DAW tuning file, and a live backup without manual conversion. The goal is to keep the
            performer focused on the musical result rather than file management.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
            Stage presentation
          </h2>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Stage views present a simplified interface for performance. Gauge, Chrono, and Scope
            presentations emphasize different information: a large pitch target, time-based cues, or
            a compact lattice view. Each stage preset stores its visual layout alongside the tuning
            state, so switching pieces does not require recalibration.
          </p>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            The tuner’s confidence indicator communicates when a pitch has stabilized, which helps
            performers decide when to lock or move on. This supports ensemble alignment and reduces
            the need for verbal confirmation during live work.
          </p>
        </section>

        <section className="tenney-plusgrid rounded-card border border-tenney-line bg-white/80 p-8 shadow-soft backdrop-blur-lg dark:bg-slate-950/60">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">Conclusion</h2>
          <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">
            Tenney’s approach centers on clarity: a spatial lattice for exploration, vocabulary
            locks for performance, tooling for playable layouts, and exports that travel. The system
            aims to reduce the overhead of just intonation so that the musical decision remains
            front and center.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
            <Link
              to="/features"
              className="text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Review features
            </Link>
            <span className="text-slate-400">•</span>
            <a
              href="/docs/"
              className="text-xs font-medium text-slate-600 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
            >
              Explore docs
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
