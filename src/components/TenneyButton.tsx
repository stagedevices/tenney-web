import {
  AnimationEvent,
  ComponentPropsWithoutRef,
  ComponentPropsWithRef,
  ElementType,
  FocusEvent,
  ForwardedRef,
  PointerEvent,
  forwardRef,
  MutableRefObject,
  useCallback,
  useRef,
} from "react";
import { motion } from "framer-motion";
import { useReducedMotion } from "../lib/reducedMotion";

type TenneyButtonVariant = "primary" | "secondary" | "ghost" | "icon";
type TenneyButtonSize = "sm" | "md" | "lg";
type TenneyButtonTone = "cool" | "warm";

type AsProp<T extends ElementType> = {
  as?: T;
};

type PropsToOmit<T extends ElementType, P> = keyof (AsProp<T> & P);

type PolymorphicComponentProps<T extends ElementType, Props = object> =
  Props & AsProp<T> & Omit<ComponentPropsWithoutRef<T>, PropsToOmit<T, Props>>;

type PolymorphicRef<T extends ElementType> = ComponentPropsWithRef<T>["ref"];

type TenneyButtonOwnProps = {
  variant?: TenneyButtonVariant;
  size?: TenneyButtonSize;
  tone?: TenneyButtonTone;
  motion?: boolean;
  disabled?: boolean;
  className?: string;
};

type TenneyButtonProps<T extends ElementType> = PolymorphicComponentProps<T, TenneyButtonOwnProps>;

type TenneyButtonComponent = <T extends ElementType = "button">(
  props: TenneyButtonProps<T> & { ref?: PolymorphicRef<T> },
) => JSX.Element | null;

const TenneyButton = forwardRef(
  <T extends ElementType = "button">(
    {
      as,
      variant = "primary",
      size = "md",
      tone = "cool",
      motion: motionEnabled = true,
      disabled = false,
      className,
      onPointerEnter,
      onPointerMove,
      onPointerLeave,
      onFocus,
      onBlur,
      onAnimationEnd,
      ...rest
    }: TenneyButtonProps<T>,
    ref: ForwardedRef<HTMLElement>,
  ) => {
    const reducedMotion = useReducedMotion();
    const elementRef = useRef<HTMLElement | null>(null);
    const shouldAnimate = motionEnabled && !reducedMotion && !disabled;
    const Component = (as ?? "button") as ElementType;

    const setRefs = useCallback(
      (node: HTMLElement | null) => {
        elementRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [ref],
    );

    const startSweep = useCallback(() => {
      if (!shouldAnimate) {
        return;
      }
      const node = elementRef.current;
      if (!node) {
        return;
      }
      node.classList.remove("is-sweeping");
      void node.offsetWidth;
      node.classList.add("is-sweeping");
    }, [shouldAnimate]);

    const handlePointerEnter = useCallback(
      (event: PointerEvent<HTMLElement>) => {
        startSweep();
        onPointerEnter?.(event);
      },
      [onPointerEnter, startSweep],
    );

    const handlePointerMove = useCallback(
      (event: PointerEvent<HTMLElement>) => {
        if (shouldAnimate) {
          const node = elementRef.current;
          if (node) {
            const rect = node.getBoundingClientRect();
            const x = Math.min(Math.max((event.clientX - rect.left) / rect.width, 0), 1);
            const y = Math.min(Math.max((event.clientY - rect.top) / rect.height, 0), 1);
            node.style.setProperty("--mx", x.toFixed(3));
            node.style.setProperty("--my", y.toFixed(3));
          }
        }
        onPointerMove?.(event);
      },
      [onPointerMove, shouldAnimate],
    );

    const handlePointerLeave = useCallback(
      (event: PointerEvent<HTMLElement>) => {
        const node = elementRef.current;
        if (node) {
          node.style.setProperty("--mx", "0.5");
          node.style.setProperty("--my", "0.5");
        }
        onPointerLeave?.(event);
      },
      [onPointerLeave],
    );

    const handleFocus = useCallback(
      (event: FocusEvent<HTMLElement>) => {
        startSweep();
        onFocus?.(event);
      },
      [onFocus, startSweep],
    );

    const handleBlur = useCallback(
      (event: FocusEvent<HTMLElement>) => {
        onBlur?.(event);
      },
      [onBlur],
    );

    const handleAnimationEnd = useCallback(
      (event: AnimationEvent<HTMLElement>) => {
        if (event.animationName === "tenney-btn-sweep") {
          event.currentTarget.classList.remove("is-sweeping");
        }
        onAnimationEnd?.(event);
      },
      [onAnimationEnd],
    );

    const classes = [
      "tenney-btn",
      `tenney-btn--${variant}`,
      `tenney-btn--${size}`,
      tone === "warm" ? "tenney-btn--warm" : null,
      disabled ? "is-disabled" : null,
      className,
    ]
      .filter(Boolean)
      .join(" ");

    const isButtonElement = typeof Component === "string" && Component === "button";

    const buttonType = isButtonElement && !("type" in rest) ? "button" : undefined;

    const sharedProps = {
      className: classes,
      onPointerEnter: handlePointerEnter,
      onPointerMove: handlePointerMove,
      onPointerLeave: handlePointerLeave,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onAnimationEnd: handleAnimationEnd,
      ref: setRefs,
      ...(isButtonElement
        ? { disabled, type: buttonType }
        : { "aria-disabled": disabled || undefined, tabIndex: disabled ? -1 : undefined }),
    };

    if (motionEnabled) {
      const MotionComponent =
        typeof Component === "string"
          ? motion[Component as keyof typeof motion]
          : motion.create(Component);
      return (
        <MotionComponent
          {...sharedProps}
          {...rest}
          whileHover={{ y: reducedMotion ? -0.5 : -1 }}
          whileTap={{ scale: reducedMotion ? 0.995 : 0.99, y: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
        />
      );
    }

    const StaticComponent = Component as ElementType;
    return <StaticComponent {...sharedProps} {...rest} />;
  },
) as TenneyButtonComponent;

export default TenneyButton;
