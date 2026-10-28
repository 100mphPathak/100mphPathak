import Link from "next/link";
import SiteFooter from "./site-footer";
import CountryOptions from "./country-options";
import { getContent } from "./lib/content";
import { Img, T } from "./content/text";

export default async function SiteShell({ children }) {
  const { announcement, header, mobileMenu: menu, callbackForm: form, whatsappButton: wa, callbackPrompt: prompt } =
    await getContent("global");
  return (
    <>
      <Link className="skip" href="#main">
        {"Skip to content"}
      </Link>
      <aside aria-label="Academy announcement" className="announcement">
        <Link href={announcement.link.href}>
          <span>{announcement.lead}</span>
          {" "}{announcement.link.label}{"  "}
          <b aria-hidden="true">{"↗"}</b>
        </Link>
      </aside>
      <header className="header">
        <div className="nav-wrap">
          <Link aria-label="Pathak100MPH home" className="brand" href="/">
            <Img v={header.logo} preload />
          </Link>
          <nav aria-label="Main navigation">
            {header.nav.map((item, i) => (
              <Link href={item.href} key={i}>{item.label}</Link>
            ))}
          </nav>
          <div className="nav-actions">
            <button className="nav-enquire" data-enquire="">
              {header.callbackButton}
              <span aria-hidden="true">{"↗"}</span>
            </button>
            <button
              aria-expanded="false"
              aria-label="Open menu"
              className="menu-button"
            >
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>
      <div className="mobile-menu" hidden>
        {menu.links.map((item, i) => (
          <Link href={item.href} key={i}>
            {item.label}
            <span>{"↗"}</span>
          </Link>
        ))}
        <div className="menu-support">
          <span className="eyebrow">{menu.eyebrow}</span>
          <h3>{menu.heading}</h3>
          <p>{menu.text}</p>
          <div className="menu-contact">
            <Link href={menu.whatsapp.href} rel="noopener noreferrer" target="_blank">
              {menu.whatsapp.label}{" ↗"}
            </Link>
            <Link href={menu.call.href}>{menu.call.label}{" ↗"}</Link>
          </div>
          <small><T v={menu.signature} brand /></small>
        </div>
      </div>
      {children}

      <SiteFooter />
      <dialog id="enquiry">
        <button aria-label="Close callback request" className="modal-close">
          {"×"}
        </button>
        <div className="modal-top">
          <span className="eyebrow">{form.eyebrow}</span>
          <h2>
            <T v={form.heading} />
          </h2>
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
      <Link
        aria-label="Chat with Pathak100MPH on WhatsApp"
        className="whatsapp-float"
        href={wa.href}
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="wa-icon">
          <svg aria-hidden="true" fill="currentColor" viewBox="0 0 32 32">
            <path d="M16 .8C7.6.8.8 7.5.8 15.8c0 2.6.7 5.2 2 7.5L.7 31.2l8.1-2.1c2.2 1.2 4.7 1.8 7.2 1.8 8.4 0 15.2-6.7 15.2-15.1S24.4.8 16 .8zm0 27.5c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5a12.3 12.3 0 0 1-1.9-6.5C3.4 8.9 9 3.3 16 3.3s12.6 5.6 12.6 12.5S23 28.3 16 28.3zm6.9-9.4c-.4-.2-2.2-1.1-2.6-1.2-.3-.1-.6-.2-.8.2-.3.4-1 1.2-1.2 1.4-.2.2-.4.3-.8.1-.4-.2-1.6-.6-3-1.8-1.1-1-1.8-2.2-2.1-2.6-.2-.4 0-.6.2-.8l.6-.7.4-.6c.1-.2.1-.5 0-.7-.1-.2-.8-2-1.2-2.7-.3-.7-.6-.6-.8-.6h-.7c-.3 0-.7.1-1 .5-.4.4-1.3 1.3-1.3 3.1s1.3 3.5 1.5 3.7c.2.3 2.6 4 6.3 5.6.9.4 1.6.6 2.1.8.9.3 1.7.2 2.3.1.7-.1 2.2-.9 2.5-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"></path>
          </svg>
        </span>
        <span className="wa-label">
          {wa.kicker}
          <span>{wa.label}</span>
        </span>
        <span aria-hidden="true" className="wa-arrow">
          {"↗"}
        </span>
      </Link>
      <aside
        aria-label="Callback invitation"
        className="callback-prompt"
        hidden
      >
        <button
          aria-label="Dismiss callback invitation"
          className="prompt-close"
        >
          {"×"}
        </button>
        <span className="eyebrow">{prompt.eyebrow}</span>
        <strong>{prompt.heading}</strong>
        <button className="text-link" data-enquire="">
          {prompt.button}{" "}
          <span>{"↗"}</span>
        </button>
      </aside>
    </>
  );
}
