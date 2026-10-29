import PageHero from "../../components/PageHero";
import Partners from "../../components/Partners";
import CommunityReels from "../../components/CommunityReels";
import { getContent, pageMetadata } from "../../lib/content";
import BookingDialog from "../../components/BookingDialog";
import { FaqList } from "../../components/Faq";
import { Text } from "../../components/Text";

export const generateMetadata = () => pageMetadata("action-analysis");

export default async function ActionAnalysis() {
  const c = await getContent("action-analysis");
  return (
    <>
      <main id="main">
        <PageHero
          eyebrow={<> {c.hero.eyebrow} </>}
          title={<>{" "}{c.hero.heading}<br /><span>{c.hero.headingAccent}</span>{" "}</>}
          videoTitle={c.hero.videoTitle}
          videoId={c.hero.videoId}
          description={<>{" "}{c.hero.text}{" "}</>}
        />
        <section className="wrap v3-section reveal">
          <p className="eyebrow">{c.benefits.eyebrow}</p>
          <h2>
            <Text v={c.benefits.heading} />
          </h2>
          <div className="v3-benefits">
            {c.benefits.items.map((item, i) => (
              <article key={i}>
                <h3>{item.heading}</h3>
                <p>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="wrap">
          <div className="steps">
            {c.steps.map((step, i) => (
              <article className="reveal" key={i}>
                <span className="step-no">{step.number}</span>
                <h3>{step.heading}</h3>
                <p>
                  {step.text}
                </p>
              </article>
            ))}
          </div>
        </section>
        <CommunityReels v={c.reels} />
        <FaqList v={c.faq} />
        <Partners data={c.partners} />
        <section className="closing wrap reveal">
          <p className="eyebrow">{c.closing.eyebrow}</p>
          <h2>
            <Text v={c.closing.heading} />
          </h2>
          <p>{c.closing.text}</p>
          <div className="actions">
            <button className="button" data-book={c.bookingDialog.heading}>
              {c.closing.button}{" "}
              <span>{"↗"}</span>
            </button>
          </div>
        </section>
      </main>
      <BookingDialog v={c.bookingDialog} />
    </>
  );
}
