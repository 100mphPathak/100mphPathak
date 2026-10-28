import { T } from "../../content/text";

export default function AssessmentBooking({ v }) {
  return (
    <>
    <section className="wrap assessment-book" id="book-assessment">
      <div>
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">{v.eyebrow}</p>
            <h2><T v={v.heading} /></h2>
          </div>
        </div>
        <p>{v.text}</p>
        <ul className="checklist">
          {v.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
        <p>{v.note}</p>
      </div>
      <aside className="booking-card reveal">
        <span className="eyebrow">{v.cardEyebrow}</span>
        <div className="price">{v.price}</div>
        <p>{v.priceNote}</p>
        <hr/>
        <p>{v.cardText}</p>
        <button className="button" data-book={v.dialogHeading}>{v.button}{" ↗"}</button>
        <small><T v={v.smallPrint} /></small>
      </aside>
    </section>
      <dialog id="booking-dialog" aria-labelledby="booking-title">
        <button aria-label="Close booking" className="modal-close">×</button>
        <span className="eyebrow">{v.dialogEyebrow}</span>
        <h2 id="booking-title">{v.dialogHeading}</h2>
        <p>{v.dialogText}</p>
        <p className="form-notice">{v.dialogNotice}</p>
        <a className="button" href={v.dialogButton.href}>{v.dialogButton.label}{" "}<span>↗</span></a>
      </dialog>
    </>
  );
}
