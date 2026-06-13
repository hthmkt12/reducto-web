import { useMemo } from "react";
import { CodeIcon, ChevronRightIcon } from "./icons";
import type { GapRow, PayloadCollectionPreview, UseCase } from "../data/reducto-content";

type WorkflowPanelsProps = {
  useCases: readonly UseCase[];
  gapRows: readonly GapRow[];
  payloadCollectionPreviews: readonly PayloadCollectionPreview[];
  buildPayloadLines: (slug: string) => readonly string[];
  selectedUseCaseId: string;
  onSelectUseCase: (id: string) => void;
};

export function WorkflowPanels({
  useCases,
  gapRows,
  payloadCollectionPreviews,
  buildPayloadLines,
  selectedUseCaseId,
  onSelectUseCase,
}: WorkflowPanelsProps) {
  const selectedUseCase = useMemo<UseCase>(() => {
    return useCases.find((entry) => entry.id === selectedUseCaseId) ?? useCases[0];
  }, [selectedUseCaseId, useCases]);

  const selectedPreview = useMemo<PayloadCollectionPreview | undefined>(() => {
    return payloadCollectionPreviews.find((preview) => preview.slug === selectedUseCase.slug);
  }, [payloadCollectionPreviews, selectedUseCase.slug]);

  const payloadLines = useMemo(() => {
    return buildPayloadLines(selectedUseCase.slug);
  }, [buildPayloadLines, selectedUseCase.slug]);

  return (
    <section className="panelGrid" aria-label="Document intelligence surfaces">
      <article className="panelCard panelCard--useCases" id="use-cases">
        <div className="panelCard__head">
          <div>
            <h2 className="panelCard__title">Industries</h2>
            <p className="panelCard__subtitle">
              Trusted where accuracy matters: finance, healthcare, insurance, legal, and more.
            </p>
          </div>
          <a className="panelCard__action" href="#docs">
            <span>+</span>
            Explore
          </a>
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
          View industries
          <ChevronRightIcon size={14} />
        </a>
      </article>

      <article className="panelCard panelCard--gap">
        <div className="panelCard__head">
          <div>
            <h2 className="panelCard__title">Proof Points</h2>
            <p className="panelCard__subtitle">
              A compact read on where Reducto earns trust before the API call.
            </p>
          </div>
          <a className="panelCard__action" href="#docs">
            <span>+</span>
            Details
          </a>
        </div>

        <div className="gapTable" role="table" aria-label="Proof points">
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
          View platform
          <ChevronRightIcon size={14} />
        </a>
      </article>

      <article className="panelCard panelCard--code" id="schema">
        <div className="panelCard__head">
          <div>
            <h2 className="panelCard__title">API Surface</h2>
            <p className="panelCard__subtitle">
              Frontend-safe preview of the document capability behind the selected industry.
            </p>
          </div>
          <a className="panelCard__action panelCard__action--icon" href="#schema" aria-label="Open API">
            <CodeIcon size={18} />
          </a>
        </div>

        {selectedPreview ? (
          <div className="schemaBrief" aria-label={`API details for ${selectedPreview.label}`}>
            <div className="schemaBrief__row">
              <span>Capability</span>
              <strong>{selectedPreview.label}</strong>
            </div>
            <div className="schemaBrief__row">
              <span>Endpoint</span>
              <strong>{selectedPreview.endpoint}</strong>
            </div>
            <div className="schemaBrief__row">
              <span>Owner</span>
              <strong>{selectedPreview.ownership}</strong>
            </div>
            <div className="schemaBrief__row schemaBrief__row--wide">
              <span>Workflow</span>
              <strong>{selectedPreview.workflow}</strong>
            </div>
          </div>
        ) : null}

        {selectedPreview ? (
          <div className="schemaFields" aria-label={`${selectedPreview.label} fields`}>
            {selectedPreview.fields.map((field) => (
              <div className="schemaFields__row" key={`${selectedPreview.slug}-${field.name}`}>
                <div>
                  <strong>{field.name}</strong>
                  <span>{field.note}</span>
                </div>
                <span className="schemaFields__type">{field.type}{field.required ? " *" : ""}</span>
              </div>
            ))}
          </div>
        ) : null}

        <div className="codeFrame" aria-label={`API preview for ${selectedUseCase.title}`}>
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
          <span className="panelCard__metaHint">
            {selectedPreview ? `Returns: ${selectedPreview.relationships.join(", ")}` : "Ready for document AI"}
          </span>
        </div>
      </article>
    </section>
  );
}
