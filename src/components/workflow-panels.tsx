import { useMemo } from "react";
import { CodeIcon, ChevronRightIcon } from "./icons";
import type { GapRow, UseCase } from "../data/reducto-content";

type WorkflowPanelsProps = {
  useCases: readonly UseCase[];
  gapRows: readonly GapRow[];
  buildPayloadLines: (slug: string) => readonly string[];
  selectedUseCaseId: string;
  onSelectUseCase: (id: string) => void;
};

export function WorkflowPanels({
  useCases,
  gapRows,
  buildPayloadLines,
  selectedUseCaseId,
  onSelectUseCase,
}: WorkflowPanelsProps) {
  const selectedUseCase = useMemo<UseCase>(() => {
    return useCases.find((entry) => entry.id === selectedUseCaseId) ?? useCases[0];
  }, [selectedUseCaseId]);

  const payloadLines = useMemo(() => buildPayloadLines(selectedUseCase.slug), [selectedUseCase.slug]);

  return (
    <section className="panelGrid" aria-label="Editorial workflow surfaces">
      <article className="panelCard panelCard--useCases" id="use-cases">
        <div className="panelCard__head">
          <div>
            <h2 className="panelCard__title">Use Cases</h2>
            <p className="panelCard__subtitle">
              Define what your content needs to do, for whom, and in which contexts.
            </p>
          </div>
          <button className="panelCard__action" type="button">
            <span>+</span>
            Add use case
          </button>
        </div>

        <div className="panelList" role="list" aria-label="Use cases">
          {useCases.map((entry) => {
            const active = entry.id === selectedUseCase.id;
            return (
              <button
                key={entry.id}
                type="button"
                className={`panelList__row${active ? " is-active" : ""}`}
                aria-label={`${entry.title}. ${entry.details}`}
                onClick={() => onSelectUseCase(entry.id)}
              >
                <div className="panelList__rowCopy">
                  <strong>{entry.title}</strong>
                  <span>{entry.details}</span>
                </div>
                <ChevronRightIcon size={18} />
              </button>
            );
          })}
        </div>

        <a className="panelCard__footerLink" href="#docs">
          View all use cases
          <ChevronRightIcon size={14} />
        </a>
      </article>

      <article className="panelCard panelCard--gap">
        <div className="panelCard__head">
          <div>
            <h2 className="panelCard__title">Gap Analysis</h2>
            <p className="panelCard__subtitle">
              Identify what is missing between current content and use case needs.
            </p>
          </div>
          <button className="panelCard__action" type="button">
            <span>+</span>
            Add gap
          </button>
        </div>

        <div className="gapTable" role="table" aria-label="Gap analysis">
          <div className="gapTable__head" role="row">
            <span role="columnheader">Area</span>
            <span role="columnheader">Status</span>
            <span role="columnheader">Details</span>
            <span className="srOnly" role="columnheader">
              Indicator
            </span>
          </div>
          {gapRows.map((row, index) => (
            <div className="gapTable__row" role="row" key={row.area}>
              <span role="cell">{row.area}</span>
              <span className={`gapDot gapDot--${index % 2 === 0 ? "magenta" : "warm"}`} role="cell" />
              <span role="cell">{row.details}</span>
              <span className="gapTable__status" role="cell">
                {row.status}
              </span>
            </div>
          ))}
        </div>

        <a className="panelCard__footerLink" href="#workflow">
          View all gaps
          <ChevronRightIcon size={14} />
        </a>
      </article>

      <article className="panelCard panelCard--code" id="schema">
        <div className="panelCard__head">
          <div>
            <h2 className="panelCard__title">Payload Model</h2>
            <p className="panelCard__subtitle">
              Payload-ready content model aligned to your selected use case.
            </p>
          </div>
          <button className="panelCard__action panelCard__action--icon" type="button" aria-label="Open schema">
            <CodeIcon size={18} />
          </button>
        </div>

        <div className="codeFrame" aria-label={`Payload model for ${selectedUseCase.title}`}>
          <div className="codeFrame__lines">
            {payloadLines.map((line, index) => (
              <div className="codeFrame__line" key={`${line}-${index}`}>
                <span className="codeFrame__number">{index + 1}</span>
                <code>{line}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="panelCard__metaRow">
          <span className="panelCard__metaChip">Current focus: {selectedUseCase.title}</span>
          <span className="panelCard__metaHint">Ready to connect to Payload CMS</span>
        </div>
      </article>
    </section>
  );
}
