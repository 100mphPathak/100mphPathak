import Link from "next/link";
import { getContent } from "../lib/content";
import { Img, Text } from "./Text";

// Skip link, announcement bar, header with main menu, and the mobile menu.
export default async function Navbar() {
  const { announcement, header, mobileMenu: menu } = await getContent("global");
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
          <div className="menu-title">{menu.heading}</div>
          <p>{menu.text}</p>
          <div className="menu-contact">
            <Link href={menu.whatsapp.href} rel="noopener noreferrer" target="_blank">
              {menu.whatsapp.label}{" ↗"}
            </Link>
            <Link href={menu.call.href}>{menu.call.label}{" ↗"}</Link>
          </div>
          <small><Text v={menu.signature} brand /></small>
        </div>
      </div>
    </>
  );
}
