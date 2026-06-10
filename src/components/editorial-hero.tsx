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
            Document work starts here.
          </h1>
        </div>

        <aside className="heroBand__aside">
          <p className="heroBand__eyebrow">Use Case Driven Workflow</p>
          <p className="heroBand__text">
            A structured approach that turns real document work into reliable outcomes.
            From brief to expansion, every step is intentional, traceable, and built to
            evolve.
          </p>
        </aside>
      </div>

      <div className="heroBand__ctaRow">
        <button className="heroBand__button heroBand__button--primary" type="button" onClick={onReviewWorkflow}>
          Review workflow
          <ArrowRightIcon size={18} />
        </button>
        <button className="heroBand__button" type="button" onClick={onOpenSchema}>
          Open schema
        </button>
      </div>
    </section>
  );
}
