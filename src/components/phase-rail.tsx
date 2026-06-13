import type { Phase } from "../data/reducto-content";
import type { PhaseAnchor } from "../data/workflow-phase-navigation";

type PhaseRailProps = {
  phases: readonly Phase[];
  anchors: readonly PhaseAnchor[];
  activeIndex: number;
  onSelect: (index: number, href: PhaseAnchor) => void;
};

export function PhaseRail({ phases, anchors, activeIndex, onSelect }: PhaseRailProps) {
  return (
    <nav className="phaseRail" aria-label="Workflow phases">
      {phases.map((phase, index) => {
        const active = index === activeIndex;
        const href = anchors[index];
        if (!href) return null;

        return (
          <a
            key={phase.label}
            href={href}
            className={`phaseRail__item${active ? " is-active" : ""}`}
            aria-label={`${phase.index}. ${phase.label}: ${phase.summary}`}
            aria-current={active ? "location" : undefined}
            onClick={(event) => {
              event.preventDefault();
              onSelect(index, href);
            }}
          >
            <span className="phaseRail__index">{phase.index}</span>
            <span className="phaseRail__label">{phase.label}</span>
            <span className="phaseRail__summary">{phase.summary}</span>
            {index < phases.length - 1 ? <span className="phaseRail__arrow" /> : null}
          </a>
        );
      })}
    </nav>
  );
}
