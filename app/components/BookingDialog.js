// Payment placeholder dialog opened by [data-book] buttons.
export default function BookingDialog({ v }) {
  return (
    <dialog id="booking-dialog" aria-labelledby="booking-title">
      <button aria-label="Close booking" className="modal-close">×</button>
      <span className="eyebrow">{v.eyebrow}</span>
      <h2 id="booking-title">{v.heading}</h2>
      <p>{v.text}</p>
      <p className="form-notice">{v.notice}</p>
      <a className="button" href={v.button.href}>{v.button.label}{" "}<span>↗</span></a>
    </dialog>
  );
}
