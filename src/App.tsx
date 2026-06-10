"use client";

import { useEffect, useState } from "react";
import { EditorialHero } from "./components/editorial-hero";
import { PhaseRail } from "./components/phase-rail";
import { SiteFooter } from "./components/site-footer";
import { TopNav } from "./components/top-nav";
import { WorkflowPanels } from "./components/workflow-panels";
import { createStaticReductoContent } from "./data/reducto-content";

const phaseAnchors = ["#brief", "#build", "#check", "#patch", "#expand"] as const;
const content = createStaticReductoContent();

function jumpTo(href: string) {
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

export default function App() {
  const [activePhase, setActivePhase] = useState(0);
  const [selectedUseCaseId, setSelectedUseCaseId] = useState(content.useCases[0].id);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash as (typeof phaseAnchors)[number] | "";
      const next = phaseAnchors.indexOf(hash as (typeof phaseAnchors)[number]);
      if (next >= 0) {
        setActivePhase(next);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  return (
    <div className="appShell" id="top">
      <TopNav navItems={content.navItems} onJump={jumpTo} />

      <main className="pageShell">
        <section className="pageIntro" aria-label="Reducto introduction">
          <EditorialHero
            onReviewWorkflow={() => jumpTo("#workflow")}
            onOpenSchema={() => jumpTo("#schema")}
          />
        </section>

        <section className="workflowSurface" id="workflow">
          <PhaseRail
            phases={content.phases}
            activeIndex={activePhase}
            onSelect={setActivePhase}
          />
          <WorkflowPanels
            useCases={content.useCases}
            gapRows={content.gapRows}
            buildPayloadLines={content.buildPayloadLines}
            selectedUseCaseId={selectedUseCaseId}
            onSelectUseCase={setSelectedUseCaseId}
          />
        </section>

        <section className="supportBand" aria-label="Editorial summary">
          <div className="supportBand__line" />
          <p className="supportBand__copy">
            Warm paper surfaces, disciplined type, and a Payload-ready content model keep
            editorial work readable before the backend exists.
          </p>
        </section>

        <SiteFooter
          onReviewWorkflow={() => jumpTo("#workflow")}
          onOpenSchema={() => jumpTo("#schema")}
        />
      </main>
    </div>
  );
}
