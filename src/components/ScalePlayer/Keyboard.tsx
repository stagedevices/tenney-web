import type { PointerEvent } from "react";
import { useEffect, useMemo, useRef } from "react";

type KeyboardProps = {
  degrees: { label: string }[];
  activeDegrees: Set<number>;
  onNoteOn: (noteId: string, degreeIndex: number) => void;
  onNoteOff: (noteId: string, degreeIndex: number) => void;
};

const MAX_KEYS = 12;

export default function Keyboard({ degrees, activeDegrees, onNoteOn, onNoteOff }: KeyboardProps) {
  const pointerMap = useRef(new Map<number, number>());

  const visibleDegrees = useMemo(() => degrees.slice(0, MAX_KEYS), [degrees]);

  useEffect(() => {
    return () => {
      pointerMap.current.clear();
    };
  }, []);

  const findDegreeAt = (x: number, y: number) => {
    const element = document.elementFromPoint(x, y) as HTMLElement | null;
    const keyEl = element?.closest<HTMLElement>("[data-degree]");
    if (!keyEl) return null;
    const index = Number(keyEl.dataset.degree);
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
      className="flex select-none gap-1 touch-none"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {visibleDegrees.map((degree, index) => {
        const isActive = activeDegrees.has(index);
        return (
          <div
            key={degree.label + index}
            data-degree={index}
            className={`tenney-key tenney-plusgrid flex-1 ${
              isActive ? "tenney-key-active" : ""
            }`}
          >
            <span className="text-xs text-slate-600 dark:text-slate-300">{degree.label}</span>
          </div>
        );
      })}
    </div>
  );
}
