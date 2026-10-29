import { getContent } from "../lib/content";
import CountryOptions from "./CountryOptions";
import { Text } from "./Text";

// "Request a call back" pop-up form, opened by any [data-enquire] button.
export default async function CallbackForm() {
  const { callbackForm: form } = await getContent("global");
  return (
    <>
      <dialog id="enquiry">
        <button aria-label="Close callback request" className="modal-close">
          {"×"}
        </button>
        <div className="modal-top">
          <span className="eyebrow">{form.eyebrow}</span>
          <div className="modal-title">
            <Text v={form.heading} />
          </div>
          <p>{form.text}</p>
        </div>
        <form id="enquiry-form">
          <label>
            {form.nameLabel}
            <input
              autoComplete="name"
              maxLength="80"
              name="name"
              placeholder={form.namePlaceholder}
              required
            />
          </label>
          <div className="form-row">
            <label>
              {form.ageLabel}
              <input
                max="100"
                min="1"
                name="age"
                placeholder={form.agePlaceholder}
                required
                type="number"
              />
            </label>
          </div>
          <label>
            {form.countryLabel}
            <select
              autoComplete="country"
              id="lead-country"
              name="country"
              required
              defaultValue="IN"
            >
              <CountryOptions />
            </select>
          </label>
          <label>
            {form.phoneLabel}
            <div className="phone-input-wrap">
              <span aria-hidden="true" id="phone-prefix">
                {"+91"}
              </span>
              <input
                aria-describedby="phone-help phone-preview"
                autoComplete="tel-national"
                inputMode="tel"
                maxLength="25"
                name="phone"
                placeholder={form.phonePlaceholder}
                required
                type="tel"
              />
            </div>
            <small id="phone-help">
              {form.phoneHelp}
            </small>
            <output aria-live="polite" id="phone-preview"></output>
          </label>
          <label>
            {form.programLabel}
            <select name="program" required>
              <option value="">{form.programPlaceholder}</option>
              {form.programs.map((program, i) => (
                <option key={i} value={program}>{program}</option>
              ))}
            </select>
          </label>
          <p className="form-notice">
            {form.notice}
          </p>
          <button className="button" type="submit">
            {form.submit}{" "}
            <span>{"↗"}</span>
          </button>
          <p className="form-result" role="status"></p>
          <input name="country_name" type="hidden" defaultValue="India" />
          <input name="dial_code" type="hidden" defaultValue="+91" />
          <input name="phone_international" type="hidden" defaultValue="" />
        </form>
      </dialog>
    </>
  );
}
