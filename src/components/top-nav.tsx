import type { JSX } from "react";
import type { NavItem } from "../data/reducto-content";

type TopNavProps = {
  navItems: readonly NavItem[];
  onJump?: (href: string) => void;
};

export function TopNav({ navItems, onJump }: TopNavProps): JSX.Element {
  return (
    <header className="topNav">
      <div className="topNav__inner">
        <a
          className="brandMark"
          href="#top"
          onClick={(event) => {
            event.preventDefault();
            onJump?.("#top");
          }}
        >
          Reducto
        </a>

        <nav className="topNav__links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              className="topNav__link"
              href={item.href}
              onClick={(event) => {
                event.preventDefault();
                onJump?.(item.href);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="topNav__actions">
          <a
            className="topNav__ghost"
            href="#contact"
            onClick={(event) => {
              event.preventDefault();
              onJump?.("#contact");
            }}
          >
            Request a demo
          </a>
          <a
            className="topNav__primary"
            href="#use-cases"
            onClick={(event) => {
              event.preventDefault();
              onJump?.("#use-cases");
            }}
          >
            Try for free
          </a>
        </div>
      </div>
    </header>
  );
}
