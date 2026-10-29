import { Text } from "../../components/Text";

export default function AssessmentBooking({ v }) {
  return (
    <section className="wrap assessment-book" id="book-assessment">
      <div>
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{v.eyebrow}</p>
            <h2><Text v={v.heading} /></h2>
          </div>
        </div>
        <p>{v.text}</p>
      </div>
      <aside className="booking-card reveal">
        <span className="eyebrow">{v.cardEyebrow}</span>
        <div className="price">{v.price}</div>
        <p>{v.priceNote}</p>
        <hr/>
        <a className="button" href={v.button.href} rel="noopener" target="_blank">{v.button.label}{" ↗"}</a>
        <p className="card-after">{v.cardText}</p>
      </aside>
    </section>
  );
}
