import Image from "next/image";
import Link from "next/link";
import Partners from "../../partners";
import "../../home.css";
import { seo } from "../../seo";

export const metadata = seo("/events/", "Pathak100MPH Events | Speed Contest & Upcoming Events", "Follow upcoming Pathak100MPH events, including the Speed Contest. Dates, participation criteria and registration details will be announced once confirmed.");

export default function Events() {
  return (
    <main id="main" className="events-page">
      <section className="wrap page-hero">
        <p className="eyebrow reveal"><span className="brand-name">Pathak100MPH</span> EVENTS</p>
        <h1 className="reveal">New challenges.<br /><span>More to chase.</span></h1>
        <p className="lede reveal">
          Follow upcoming <span className="brand-name">Pathak100MPH</span> events, starting with our Speed Contest. Dates, participation criteria and registration details will be announced here once confirmed.
        </p>
        <div className="events-grid">
          <article className="event speed">
            <span className="event-number">01 / UPCOMING</span>
            <div aria-hidden="true" className="speed-graphic">100<span>MPH</span></div>
            <div>
              <span className="pill">COMING SOON</span>
              <h3><span className="brand-name">Pathak100MPH</span><br />Speed Contest</h3>
            </div>
          </article>
          {["02", "03"].map(number => (
            <article className="event pending" key={number}>
              <span className="event-number">{number} / UPCOMING</span>
              <div aria-hidden="true" className="event-orbit" />
              <div>
                <span className="pill">COMING SOON</span>
                <h3>Next event<br /><span>To be announced</span></h3>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="wrap seo-faq">
        <div>
          <p className="eyebrow">BEFORE YOUR NEXT STEP</p>
          <h2>Clear answers.<br />Confident decisions.</h2>
        </div>
        <div>
          <details>
            <summary>Is the Pathak100MPH Speed Contest open for registration?</summary>
            <p>The Speed Contest is coming soon. A confirmed date, entry criteria and registration details have not yet been announced.</p>
          </details>
          <details>
            <summary>Are the other upcoming events confirmed?</summary>
            <p>Two more events are being planned. We will share their names and details once confirmed.</p>
          </details>
        </div>
      </section>
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Image alt="Pathak100MPH" height="170" src="/assets/logo.webp" width="367" />
        </Link>
        <h2>Keep building.<br />Your moment will come.</h2>
        <p>Explore how you can train with <span className="brand-name">Pathak100MPH</span> today.</p>
        <div className="actions">
          <Link className="button" href="/assessment-trial/">Explore training<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
