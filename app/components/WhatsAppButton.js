import Link from "next/link";
import { getContent } from "../lib/content";

// Floating "WhatsApp us" button.
export default async function WhatsAppButton() {
  const { whatsappButton: wa } = await getContent("global");
  return (
    <>
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
    </>
  );
}
