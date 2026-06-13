import { ArrowRightIcon } from "./icons";

type EditorialHeroProps = {
  onReviewWorkflow?: () => void;
  onOpenSchema?: () => void;
};

export function EditorialHero({
  onReviewWorkflow,
  onOpenSchema,
}: EditorialHeroProps) {
  return (
    <section className="heroBand" aria-labelledby="hero-title">
      <div className="heroBand__inner">
        <div className="heroBand__copy">
          <h1 id="hero-title" className="heroBand__title">
            Free your data from <span>documents.</span>
          </h1>
        </div>

        <aside className="heroBand__aside">
          <p className="heroBand__eyebrow">Agentic document platform</p>
          <p className="heroBand__text">
            Parse, split, extract, edit, and classify complex documents with a
            layout-aware system built for AI teams that need reliable structured output.
          </p>
        </aside>
      </div>

      <div className="heroBand__ctaRow">
        <button className="heroBand__button heroBand__button--primary" type="button" onClick={onReviewWorkflow}>
          Explore platform
          <ArrowRightIcon size={18} />
        </button>
        <button className="heroBand__button" type="button" onClick={onOpenSchema}>
          View API
        </button>
      </div>
    </section>
  );
}
