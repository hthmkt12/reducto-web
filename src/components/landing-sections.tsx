import { ArrowRightIcon, ChevronRightIcon } from "./icons";
import type { LandingSection } from "../data/reducto-content";

type LandingSectionsProps = {
  sections: readonly LandingSection[];
  onJump?: (href: string) => void;
};

export function LandingSections({ sections, onJump }: LandingSectionsProps) {
  return (
    <section className="landingSections" aria-label="Reducto landing details">
      {sections.map((section, index) => (
        <article className="landingSection" id={section.id} key={section.id}>
          <div className="landingSection__index">{String(index + 1).padStart(2, "0")}</div>
          <div className="landingSection__copy">
            <h2 className="landingSection__title">{section.title}</h2>
            <p className="landingSection__summary">{section.summary}</p>
            <a
              className="landingSection__cta"
              href={section.ctaHref}
              onClick={(event) => {
                event.preventDefault();
                onJump?.(section.ctaHref);
              }}
            >
              {section.ctaLabel}
              <ArrowRightIcon size={17} />
            </a>
          </div>

          <div className="landingSection__items">
            {section.items.map((item) => (
              <div className="landingSection__item" key={item.label}>
                <div>
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </div>
                <ChevronRightIcon size={16} />
              </div>
            ))}
          </div>
        </article>
      ))}
    </section>
  );
}
