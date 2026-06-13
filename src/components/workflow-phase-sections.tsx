import type { Phase } from "../data/reducto-content";
import { workflowPhaseDetails } from "../data/workflow-phase-navigation";

type WorkflowPhaseSectionsProps = {
  phases: readonly Phase[];
  activeIndex: number;
};

export function WorkflowPhaseSections({ phases, activeIndex }: WorkflowPhaseSectionsProps) {
  return (
    <section className="phaseSections" aria-label="Workflow phase details">
      {workflowPhaseDetails.map((detail, index) => {
        const phase = phases[index];
        const active = index === activeIndex;

        return (
          <article
            className={`phaseSection${active ? " is-active" : ""}`}
            id={detail.href.slice(1)}
            key={detail.href}
            aria-labelledby={`phase-section-${index}`}
            data-phase-index={index}
          >
            <div className="phaseSection__marker" aria-hidden="true">
              {phase?.index ?? String(index + 1).padStart(2, "0")}
            </div>
            <div className="phaseSection__main">
              <p className="phaseSection__kicker">{detail.kicker}</p>
              <h2 className="phaseSection__title" id={`phase-section-${index}`}>
                {detail.title}
              </h2>
              <p className="phaseSection__description">{detail.description}</p>
            </div>
            <aside className="phaseSection__aside" aria-label={`${phase?.label ?? detail.kicker} output`}>
              <span className="phaseSection__asideLabel">Working output</span>
              <p className="phaseSection__artifact">{detail.artifact}</p>
              <ul className="phaseSection__checks">
                {detail.checks.map((check) => (
                  <li key={check}>{check}</li>
                ))}
              </ul>
            </aside>
          </article>
        );
      })}
    </section>
  );
}
