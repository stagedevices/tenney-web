import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import type { ReactNode } from "react";

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
  return (
    <nav aria-label="Primary" className={`tenney-pill ${condensed ? "is-condensed" : ""}`}>
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
            {!condensed ? <span className="tenney-pill-label">{label}</span> : null}
          </>
        );

        const className = `tenney-pill-item ${isActive ? "is-active" : ""}`;

        if (item.to) {
          return (
            <Link
              key={item.id}
              to={item.to}
              aria-current={isActive ? "page" : undefined}
              aria-label={ariaLabel}
              title={title}
              className={className}
            >
              {content}
            </Link>
          );
        }

        return (
          <a
            key={item.id}
            href={item.href}
            target={item.external ? "_blank" : undefined}
            rel={item.external ? "noreferrer" : undefined}
            aria-current={isActive ? "page" : undefined}
            aria-label={ariaLabel}
            title={title}
            className={className}
          >
            {content}
          </a>
        );
      })}
    </nav>
  );
}
