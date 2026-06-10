import type { Phase } from "../data/reducto-content";

type PhaseRailProps = {
  phases: readonly Phase[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export function PhaseRail({ phases, activeIndex, onSelect }: PhaseRailProps) {
  return (
    <section className="phaseRail" aria-label="Workflow phases">
      {phases.map((phase, index) => {
        const active = index === activeIndex;
        return (
          <button
            key={phase.label}
            type="button"
            className={`phaseRail__item${active ? " is-active" : ""}`}
            aria-label={`${phase.index}. ${phase.label}: ${phase.summary}`}
            onClick={() => onSelect(index)}
          >
            <span className="phaseRail__index">{phase.index}</span>
            <span className="phaseRail__label">{phase.label}</span>
            <span className="phaseRail__summary">{phase.summary}</span>
            {index < phases.length - 1 ? <span className="phaseRail__arrow" /> : null}
          </button>
        );
      })}
    </section>
  );
}
