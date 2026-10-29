import PageHero from "../../components/PageHero";
import Partners from "../../components/Partners";
import "../../home.css";
import { getContent, pageMetadata } from "../../lib/content";
import BookingDialog from "../../components/BookingDialog";
import { FaqList } from "../../components/Faq";
import Steps from "../../components/Steps";
import { Img, Text } from "../../components/Text";

export const generateMetadata = () => pageMetadata("scholarship");

export default async function Scholarship() {
  const [c, { header }] = await Promise.all([getContent("scholarship"), getContent("global")]);
  return (
    <>
      <main id="main" className="scholarship-page">
        <PageHero
          eyebrow={c.hero.eyebrow}
          title={<>{c.hero.heading}<br /><span>{c.hero.headingAccent}</span></>}
          description={c.hero.text}
          videoTitle={c.hero.videoTitle}
          videoId={c.hero.videoId}
          videoActions={
            <a className="button" href={c.hero.button.href}>
              {c.hero.button.label}{" "}<span aria-hidden="true">↗</span>
            </a>
          }
        />
        <section className="wrap scholarship-standard">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">{c.standard.eyebrow}</p>
              <h2><Text v={c.standard.heading} /></h2>
            </div>
            <p>{c.standard.text}</p>
          </div>
          <div className="facts">
            {c.standard.checks.map((check, i) => (
              <div key={i}>
                <strong>{check.value}</strong>
                <span>{check.label}</span>
              </div>
            ))}
          </div>
        </section>
        <Steps variant="journey" v={c.steps} />
        <section className="wrap two-notes">
          {c.notes.map((note, i) => (
            <article className="note reveal" key={i}>
              <p className="eyebrow">{note.eyebrow}</p>
              <h3>{note.heading}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </section>
        <FaqList v={c.faq} />
        <Partners current />
        <section className="closing wrap reveal" id="scholarship-booking">
          <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
            <Img v={header.logo} />
          </a>
          <h2><Text v={c.closing.heading} /></h2>
          <p>{c.closing.text}</p>
          <div className="actions">
            <button className="button" data-book={c.bookingDialog.heading}>{c.closing.button}{" "}<span>↗</span>
            </button>
          </div>
        </section>
      </main>
      <BookingDialog v={c.bookingDialog} />
    </>
  );
}
