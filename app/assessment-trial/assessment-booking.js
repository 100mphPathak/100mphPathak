export default function AssessmentBooking() {
  return (
    <>
    <section className="wrap assessment-book" id="book-assessment">
      <div>
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">START ONLINE</p>
            <h2>Your videos.<br/>Your personal assessment.</h2>
          </div>
        </div>
        <p>A one-to-one Google Meet session with Ankit Pathak, built around your bowling footage and cricketing goals.</p>
        <ul className="checklist">
          <li>Share your bowling videos before your session.</li>
          <li>Discuss your technique and improvement priorities with Ankit sir.</li>
          <li>Understand the next step for your development or academy admission.</li>
        </ul>
        <p>Online assessment is for fast bowlers.</p>
      </div>
      <aside className="booking-card reveal">
        <span className="eyebrow">ONLINE ASSESSMENT</span>
        <div className="price">₹1,199</div>
        <p>Per player · Personal Google Meet session</p>
        <hr/>
        <p>Our team contacts you within 24 to 48 hours after booking to arrange the session and request your videos.</p>
        <button className="button" data-book="Online Assessment · ₹1,199">Book online assessment ↗</button>
        <small>Payment link to be connected in the live website.<br/>Non-refundable. Rescheduling requires prior academy approval. Read the Return Policy before payment.</small>
      </aside>
    </section>
      <dialog id="booking-dialog" aria-labelledby="booking-title">
        <button aria-label="Close booking" className="modal-close">×</button>
        <span className="eyebrow">YOUR NEXT STEP</span>
        <h2 id="booking-title">Online Assessment · ₹1,199</h2>
        <p>Your chosen program is ready for the next step. The live website will take you to its dedicated payment page.</p>
        <p className="form-notice">Design reference: checkout link to be connected by your developer.</p>
        <a className="button" href="tel:+918882390596">Call admissions <span>↗</span></a>
      </dialog>
    </>
  );
}
