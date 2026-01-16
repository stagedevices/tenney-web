import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";
import { useReducedMotion } from "../lib/reducedMotion";

export interface NavItem {
  id: string;
  label: string;
  icon: ReactNode;
  to?: string;
  href?: string;
  external?: boolean;
}

interface NavPillProps {
  items: NavItem[];
  activeId?: string;
  condensed?: boolean;
}

export default function NavPill({ items, activeId, condensed = false }: NavPillProps) {
  const reducedMotion = useReducedMotion();
  const transition = reducedMotion
    ? { duration: 0 }
    : { type: "spring", stiffness: 320, damping: 28, mass: 0.6 };
  const labelTransition = reducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" };

  const containerVariants = {
    expanded: {
      height: 52,
      padding: "0.35rem",
      gap: "0.2rem",
      scale: 1,
    },
    condensed: {
      height: 44,
      padding: "0.25rem",
      gap: "0.15rem",
      scale: reducedMotion ? 1 : 0.98,
    },
  };

  const itemVariants = {
    expanded: { gap: "0.5rem", paddingLeft: "0.75rem", paddingRight: "0.75rem" },
    condensed: { gap: "0.3rem", paddingLeft: "0.6rem", paddingRight: "0.6rem" },
  };

  const labelVariants = {
    expanded: { opacity: 1, maxWidth: 120, marginLeft: 6 },
    condensed: { opacity: 0, maxWidth: 0, marginLeft: 0 },
  };

  const MotionLink = motion(Link);
  const MotionAnchor = motion.a;

  return (
    <motion.nav
      aria-label="Primary"
      className="tenney-pill"
      variants={containerVariants}
      animate={condensed ? "condensed" : "expanded"}
      transition={transition}
      layout
    >
      {items.map((item) => {
        const isActive = item.id === activeId;
        const label = item.label;
        const ariaLabel = condensed ? label : undefined;
        const title = condensed ? label : undefined;
        const content = (
          <>
            {isActive ? <motion.span layoutId="nav-pill-active" className="tenney-pill-active" /> : null}
            <span className="tenney-pill-icon" aria-hidden>
              {item.icon}
            </span>
            <motion.span
              className="tenney-pill-label overflow-hidden whitespace-nowrap"
              aria-hidden={condensed}
              variants={labelVariants}
              animate={condensed ? "condensed" : "expanded"}
              transition={labelTransition}
              style={{ originX: 0 }}
            >
              {label}
            </motion.span>
          </>
        );

        const className = `tenney-pill-item ${isActive ? "is-active" : ""}`;

        if (item.to) {
          return (
            <MotionLink
              key={item.id}
              to={item.to}
              aria-current={isActive ? "page" : undefined}
              aria-label={ariaLabel}
              title={title}
              className={className}
              variants={itemVariants}
              animate={condensed ? "condensed" : "expanded"}
              transition={transition}
              layout
            >
              {content}
            </MotionLink>
          );
        }

        return (
          <MotionAnchor
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            aria-current={isActive ? "page" : undefined}
            aria-label={ariaLabel}
            title={title}
            className={className}
            variants={itemVariants}
            animate={condensed ? "condensed" : "expanded"}
            transition={transition}
            layout
          >
            {content}
          </MotionAnchor>
        );
      })}
    </motion.nav>
  );
}
