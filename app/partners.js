import Image from "next/image";
import Link from "next/link";
export default function Partners({ current = false }) {
  return (
    <section className={current ? "wrap partners facilities-partners" : "wrap partners"}>
      <div className="partner-heading">
        <p className="eyebrow">{"OUR PARTNERS"}</p>
        <h2>{"Stronger, together."}</h2>
        <p>{current ? "The brands supporting our players and academy." : "The brands supporting our journey to build better cricketers."}</p>
      </div>
      {"\n"}
      <article className="partner-feature">
        <div className="partner-copy">
          <span className="eyebrow">{"OUR ACADEMY SPONSOR"}</span>
          <h3>{"Powered by STAG Global."}</h3>
          <p>
            {
              current ? "STAG Global supports our academy with cricket gear and merchandise for training and match days." : "STAG Global and Pathak100MPH sponsor 25 athletes annually with cricket gear and merchandise. A shared commitment to helping cricketers grow."
            }
          </p>
          <Link
            className="partner-visit"
            href="https://stag.global/"
            rel="noopener noreferrer"
            target="_blank"
          >
            {"Explore STAG Global ↗"}
          </Link>
        </div>
        <div className="partner-logo">
          <Image
            alt="STAG Global"
            loading="lazy"
            src="/assets/stag-global.png"
            width="500"
            height="500"
          />
        </div>
      </article>
      {"\n"}
      <div aria-label="Academy partners" className="partner-grid" tabIndex="0">
        <article className="partner-card">
          <div className="partner-art">
            <Image
              alt="Naturaltein"
              loading="lazy"
              src="/assets/naturaltein.svg"
              width="500"
              height="500"
            />
          </div>
          <span className="partner-role">
            <span className="brand-name">{current ? "Pathak100MPH" : "PATHAK100MPH"}</span>{" NUTRITION PARTNER"}
          </span>
          <h3>{"Naturaltein"}</h3>
          <Link
            aria-label="Code 100MPH. Visit Naturaltein"
            className="partner-code"
            href="https://naturaltein.in/"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="code-label">
              {"USE CODE"}
              <strong>{"100MPH"}</strong>
            </span>
            <b aria-hidden="true">{"↗"}</b>
          </Link>
        </article>
        {"\n"}
        <article className="partner-card">
          <div className="partner-art">
            <Image
              alt="APX Collection"
              className="apx-logo"
              height={current ? 406 : 57}
              loading="lazy"
              src={current ? "/assets/apx-official.png" : "/assets/apx-collection.png"}
              width={current ? 720 : 82}
            />
          </div>
          <span className="partner-role">
            <span className="brand-name">{current ? "Pathak100MPH" : "PATHAK100MPH"}</span>{" CRICKET GEAR PARTNER"}
          </span>
          <h3>{"APX Collection"}</h3>
          <Link
            aria-label="Code 100MPH. Visit cricket collection"
            className="partner-code"
            href="https://stag.global/collections/cricket"
            rel="noopener noreferrer"
            target="_blank"
          >
            <span className="code-label">
              {"USE CODE"}
              <strong>{"100MPH"}</strong>
            </span>
            <b aria-hidden="true">{"↗"}</b>
          </Link>
        </article>
        {"\n"}
        {!current && <article className="partner-card future-partner">
          <div className="partner-art">
            <span aria-hidden="true">{"＋"}</span>
          </div>
          <span className="partner-role">{"COMING SOON"}</span>
          <h3>{"Future Brand"}</h3>
          <div className="partner-pending">
            {"A new collaboration. A shared ambition."}
          </div>
        </article>}
      </div>
    </section>
  );
}
