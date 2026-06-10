"use client";

import { useEffect, useRef, useState } from "react";
import { EditorialHero } from "./components/editorial-hero";
import { PhaseRail } from "./components/phase-rail";
import { SiteFooter } from "./components/site-footer";
import { TopNav } from "./components/top-nav";
import { WorkflowPanels } from "./components/workflow-panels";
import { createStaticReductoContent, fetchReductoContent } from "./data/reducto-content";

const phaseAnchors = ["#brief", "#build", "#check", "#patch", "#expand"] as const;

function jumpTo(href: string) {
  const target = document.querySelector(href);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  if (typeof window !== "undefined") {
    window.location.hash = href;
  }
}

export default function App({ apiUrl }: { apiUrl?: string }) {
  const [content, setContent] = useState(() => createStaticReductoContent());
  const [activePhase, setActivePhase] = useState(0);
  const activePhaseRef = useRef(activePhase);
  activePhaseRef.current = activePhase;

  const [selectedUseCaseId, setSelectedUseCaseId] = useState(() => {
    const staticContent = createStaticReductoContent();
    return staticContent.useCases[0]?.id || "";
  });

  useEffect(() => {
    let queryApiUrl = "";
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      queryApiUrl = params.get("apiUrl") || "";
    }
    const finalApiUrl = apiUrl || queryApiUrl || process.env.REDUCTO_CONTENT_API_URL || "";
    if (!finalApiUrl) return;

    let active = true;
    fetchReductoContent(finalApiUrl)
      .then((dynamicContent) => {
        if (!active) return;
        setContent(dynamicContent);
        if (dynamicContent.useCases.length > 0) {
          setSelectedUseCaseId((currentId) => {
            const exists = dynamicContent.useCases.some((uc) => uc.id === currentId);
            return exists ? currentId : dynamicContent.useCases[0].id;
          });
        }
      })
      .catch((err) => {
        if (!active) return;
        console.error("Failed to fetch dynamic content, falling back to static content:", err);
      });

    return () => {
      active = false;
    };
  }, [apiUrl]);

  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash as (typeof phaseAnchors)[number] | "";
      const next = phaseAnchors.indexOf(hash as (typeof phaseAnchors)[number]);
      if (next >= 0 && next !== activePhaseRef.current) {
        setActivePhase(next);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
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
            onSelect={(index) => {
              setActivePhase(index);
              const anchor = phaseAnchors[index];
              if (anchor && typeof window !== "undefined") {
                window.location.hash = anchor;
              }
            }}
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
