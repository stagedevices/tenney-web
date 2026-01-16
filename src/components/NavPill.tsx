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
    : { type: "spring", stiffness: 520, damping: 42, mass: 0.8 };
  const labelTransition = reducedMotion ? { duration: 0 } : { duration: 0.2, ease: "easeOut" };

  const containerVariants = {
    expanded: {
      height: 52,
      paddingLeft: 16,
      paddingRight: 16,
      columnGap: 10,
      scale: 1,
    },
    condensed: {
      height: 44,
      paddingLeft: 10,
      paddingRight: 10,
      columnGap: 6,
      scale: reducedMotion ? 1 : 0.985,
    },
  };

  const itemVariants = {
    expanded: { columnGap: 8, paddingLeft: 12, paddingRight: 12 },
    condensed: { columnGap: 6, paddingLeft: 10, paddingRight: 10 },
  };

  const labelVariants = {
    expanded: { opacity: 1, maxWidth: 140, marginLeft: 8 },
    condensed: { opacity: 0, maxWidth: 0, marginLeft: 0 },
  };

  const MotionLink = motion(Link);
  const MotionAnchor = motion.a;

  return (
    <motion.nav
      aria-label="Primary"
      className="tenney-pill"
      initial={false}
      variants={containerVariants}
      animate={condensed ? "condensed" : "expanded"}
      transition={transition}
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
              className="tenney-pill-label"
              aria-hidden={condensed}
              variants={labelVariants}
              animate={condensed ? "condensed" : "expanded"}
              transition={labelTransition}
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
          >
            {content}
          </MotionAnchor>
        );
      })}
    </motion.nav>
  );
}
