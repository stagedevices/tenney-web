import {
  ComponentPropsWithoutRef,
  MouseEvent,
  MutableRefObject,
  PointerEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motion, useReducedMotion } from "framer-motion";

type TenneyButtonVariant = "primary" | "secondary";
type TenneyButtonSize = "md" | "sm";

type TenneyButtonBaseProps = {
  as?: "button" | "a";
  variant?: TenneyButtonVariant;
  size?: TenneyButtonSize;
  className?: string;
  disabled?: boolean;
  children: ReactNode;
};

type TenneyButtonAnchorProps = TenneyButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"a">, "className" | "color"> & {
    as: "a";
  };

type TenneyButtonButtonProps = TenneyButtonBaseProps &
  Omit<ComponentPropsWithoutRef<"button">, "className" | "color" | "disabled"> & {
    as?: "button";
  };

export type TenneyButtonProps = TenneyButtonAnchorProps | TenneyButtonButtonProps;

const MAX_HIGHLIGHT_SHIFT = 5;

export default function TenneyButton({
  as = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  children,
  onClick,
  onPointerMove,
  onPointerLeave,
  ...rest
}: TenneyButtonProps) {
  const reducedMotion = useReducedMotion();
  const buttonRef = useRef<HTMLElement | null>(null);
  const [magnetEnabled, setMagnetEnabled] = useState(false);

  useEffect(() => {
    if (reducedMotion) {
      setMagnetEnabled(false);
      return;
    }

    const media = window.matchMedia("(pointer: fine)");
    const update = () => setMagnetEnabled(media.matches);
    update();

    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [reducedMotion]);

  const classNames = useMemo(
    () =>
      [
        "tenney-btn",
        `tenney-btn--${variant}`,
        size === "sm" ? "tenney-btn--sm" : "",
        className,
      ]
        .filter(Boolean)
        .join(" "),
    [className, size, variant],
  );

  const updateHighlight = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      if (!magnetEnabled || disabled || event.pointerType !== "mouse") return;
      const element = buttonRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      const clampedX = Math.max(-MAX_HIGHLIGHT_SHIFT, Math.min(MAX_HIGHLIGHT_SHIFT, offsetX / 10));
      const clampedY = Math.max(-MAX_HIGHLIGHT_SHIFT, Math.min(MAX_HIGHLIGHT_SHIFT, offsetY / 10));
      element.style.setProperty("--tenney-highlight-x", `${clampedX}px`);
      element.style.setProperty("--tenney-highlight-y", `${clampedY}px`);
    },
    [disabled, magnetEnabled],
  );

  const resetHighlight = useCallback(() => {
    const element = buttonRef.current;
    if (!element) return;
    element.style.removeProperty("--tenney-highlight-x");
    element.style.removeProperty("--tenney-highlight-y");
  }, []);

  const handlePointerMove = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      updateHighlight(event);
      onPointerMove?.(event);
    },
    [onPointerMove, updateHighlight],
  );

  const handlePointerLeave = useCallback(
    (event: PointerEvent<HTMLElement>) => {
      resetHighlight();
      onPointerLeave?.(event);
    },
    [onPointerLeave, resetHighlight],
  );

  const handleClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
      if (disabled) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      onClick?.(event);
    },
    [disabled, onClick],
  );

  const motionProps = reducedMotion || disabled ? {} : { whileHover: { y: -1 }, whileTap: { y: 0 } };

  if (as === "a") {
    const anchorProps = rest as ComponentPropsWithoutRef<"a">;
    return (
      <motion.a
        {...anchorProps}
        {...motionProps}
        ref={buttonRef as MutableRefObject<HTMLAnchorElement | null>}
        className={classNames}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : anchorProps.tabIndex}
        onClick={handleClick}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {children}
      </motion.a>
    );
  }

  const buttonProps = rest as ComponentPropsWithoutRef<"button">;
  return (
    <motion.button
      {...buttonProps}
      {...motionProps}
      ref={buttonRef as MutableRefObject<HTMLButtonElement | null>}
      type={buttonProps.type ?? "button"}
      className={classNames}
      disabled={disabled}
      onClick={handleClick}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      {children}
    </motion.button>
  );
}
