import { ArrowRightIcon } from "./icons";

type SiteFooterProps = {
  onReviewWorkflow?: () => void;
  onOpenSchema?: () => void;
};

export function SiteFooter({ onReviewWorkflow, onOpenSchema }: SiteFooterProps) {
  return (
    <footer className="siteFooter" id="contact">
      <div className="siteFooter__cta">
        <button className="heroBand__button heroBand__button--primary" type="button" onClick={onReviewWorkflow}>
          Explore platform
          <ArrowRightIcon size={18} />
        </button>
        <button className="heroBand__button" type="button" onClick={onOpenSchema}>
          View API
        </button>
      </div>

      <div className="siteFooter__bar">
        <span>Agentic document intelligence on warm paper.</span>
        <span>Copyright Reducto</span>
      </div>
    </footer>
  );
}
