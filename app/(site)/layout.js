import Script from "next/script";
import "../globals.css";
import SiteShell from "../site-shell";
import SiteInteractions from "../site-interactions";

export default function SiteLayout({ children }) {
  return (
    <>
      <SiteShell>{children}</SiteShell>
      {/* Only the callback form uses this; site-interactions reads it via window.libphonenumber?. */}
      <Script src="/assets/libphonenumber-max.js" strategy="lazyOnload" />
      <SiteInteractions />
    </>
  );
}
