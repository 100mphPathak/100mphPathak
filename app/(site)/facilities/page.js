import PageHero from "../../page-hero";
import Link from "next/link";
import Partners from "../../partners";
import { getContent, pageMetadata } from "../../lib/content";
import { Faq } from "../../content/sections";
import { Img, T } from "../../content/text";

export const generateMetadata = () => pageMetadata("facilities");

export default async function Facilities() {
  const [c, { header }] = await Promise.all([getContent("facilities"), getContent("global")]);
  return (
    <>
      <main id="main" className="facilities-page">
        <PageHero
          eyebrow={<> {c.hero.eyebrow} </>}
          title={<>{" "}{c.hero.heading}<br /><span>{c.hero.headingAccent}</span>{" "}</>}
          videoTitle={c.hero.videoTitle}
          videoId={c.hero.videoId}
          description={<>{" "}<T v={c.hero.text} brand />{" "}</>}
          actions={
            <>
              {" "}
              <Link className="button" href={c.hero.button.href}>
                {c.hero.button.label}
                <span aria-hidden="true">{"↗"}</span>
              </Link>{" "}
            </>
          }
        />
        <section className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">{c.facilities.eyebrow}</p>
              <h2>
                <T v={c.facilities.heading} />
              </h2>
            </div>
            <p>
              {c.facilities.text}
            </p>
          </div>
          <div className="facility-list">
            {c.facilities.items.map((item, i) => (
              <article className="reveal" key={i}>
                <span>{item.number}</span>
                <h3>{item.heading}</h3>
                <p>
                  {item.text}
                </p>
              </article>
            ))}
          </div>
        </section>
        <section className="wrap">
          <div className="section-head reveal">
            <div>
              <p className="eyebrow">{c.gallery.eyebrow}</p>
              <h2>
                <T v={c.gallery.heading} />
              </h2>
            </div>
            <p>{c.gallery.text}</p>
          </div>
          <div className="gallery">
            {c.gallery.photos.map((photo, i) => (
              <button
                aria-label="Enlarge academy photograph"
                data-photo={photo.src}
                key={i}
              >
                <Img v={photo} loading="lazy" sizes="(max-width: 760px) 90vw, 33vw" />
              </button>
            ))}
          </div>
          <div className="photo-placeholders">
            {c.gallery.placeholders.map((item, i) => (
              <div key={i}>
                {item.label}
                <span>{item.note}</span>
              </div>
            ))}
          </div>
        </section>
        <Faq v={c.faq} />
        <Partners current />
        <section className="closing wrap reveal">
          <Link
            aria-label="Pathak100MPH home"
            className="closing-logo"
            href="/"
          >
            <Img v={header.logo} />
          </Link>
          <h2>
            <T v={c.closing.heading} />
          </h2>
          <p>
            {c.closing.text}
          </p>
          <div className="actions">
            <button className="text-link" data-enquire="">
              {c.closing.button}
              <span aria-hidden="true">{"↗"}</span>
            </button>
          </div>
        </section>
      </main>
      <dialog id="photo-dialog" aria-label="Academy photograph enlarged">
        <button aria-label="Close photo" className="modal-close">
          ×
        </button>
        <img alt="Academy photo enlarged" />
      </dialog>
    </>
  );
}
