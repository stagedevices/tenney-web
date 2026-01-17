import type { PointerEvent } from "react";
import { useMemo, useRef } from "react";

type PadsProps = {
  degrees: { label: string }[];
  activeDegrees: Set<number>;
  onNoteOn: (noteId: string, degreeIndex: number) => void;
  onNoteOff: (noteId: string, degreeIndex: number) => void;
  offset?: number;
  padCount?: number;
};

const PAD_COUNT = 12;

export default function Pads({
  degrees,
  activeDegrees,
  onNoteOn,
  onNoteOff,
  offset = 0,
  padCount = PAD_COUNT,
}: PadsProps) {
  const pointerMap = useRef(new Map<number, number>());
  const visibleDegrees = useMemo(
    () => degrees.slice(offset, offset + padCount),
    [degrees, offset, padCount],
  );

  const findDegreeAt = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y) as HTMLElement | null;
    const padEl = element?.closest<HTMLElement>("[data-degree]");
    if (!padEl) return null;
    const index = Number(padEl.dataset.degree);
    return Number.isFinite(index) ? index : null;
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    const degreeIndex = findDegreeAt(event.clientX, event.clientY);
    if (degreeIndex === null) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointerMap.current.set(event.pointerId, degreeIndex);
    onNoteOn(`pointer-${event.pointerId}`, degreeIndex);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!pointerMap.current.has(event.pointerId)) return;
    const degreeIndex = findDegreeAt(event.clientX, event.clientY);
    if (degreeIndex === null) return;
    const previous = pointerMap.current.get(event.pointerId);
    if (previous === degreeIndex) return;
    if (previous !== undefined) {
      onNoteOff(`pointer-${event.pointerId}`, previous);
    }
    pointerMap.current.set(event.pointerId, degreeIndex);
    onNoteOn(`pointer-${event.pointerId}`, degreeIndex);
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    const previous = pointerMap.current.get(event.pointerId);
    if (previous !== undefined) {
      onNoteOff(`pointer-${event.pointerId}`, previous);
    }
    pointerMap.current.delete(event.pointerId);
  };

  return (
    <div
      className="grid select-none grid-cols-4 gap-2 touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {visibleDegrees.map((degree, index) => {
        const absoluteIndex = index + offset;
        const isActive = activeDegrees.has(absoluteIndex);
        return (
          <div
            key={degree.label + absoluteIndex}
            data-degree={absoluteIndex}
            className={`tenney-pad tenney-plusgrid ${isActive ? "tenney-pad-active" : ""}`}
          >
            <span className="text-xs text-slate-700 dark:text-slate-200">{degree.label}</span>
          </div>
        );
      })}
    </div>
  );
}
