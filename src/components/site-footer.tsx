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
          Review workflow
          <ArrowRightIcon size={18} />
        </button>
        <button className="heroBand__button" type="button" onClick={onOpenSchema}>
          Open schema
        </button>
      </div>

      <div className="siteFooter__bar">
        <span>Structured content. Editorial clarity. Payload ready.</span>
        <span>Copyright Reducto</span>
      </div>
    </footer>
  );
}
