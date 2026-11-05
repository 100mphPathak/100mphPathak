import Script from "next/script";
import { draftMode } from "next/headers";
import "../globals.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CallbackForm from "../components/CallbackForm";
import WhatsAppButton from "../components/WhatsAppButton";
import CallbackPrompt from "../components/CallbackPrompt";
import SiteInteractions from "../components/SiteInteractions";

export default async function SiteLayout({ children }) {
  const preview = (await draftMode()).isEnabled;
  return (
    <>
      {preview && (
        <div role="status" style={{ position: "fixed", zIndex: 1000, left: 0, right: 0, bottom: 0, background: "#8a5300", color: "#fff", padding: "10px 16px", font: "600 14px/1.4 Arial, sans-serif", textAlign: "center" }}>
          Preview: you are seeing saved drafts, not the live website.{" "}
          <a href="/admin/preview/exit" style={{ color: "#fff" }}>Exit preview</a>
        </div>
      )}
      <Navbar />
      {children}

      <Footer />
      <CallbackForm />
      <WhatsAppButton />
      <CallbackPrompt />
      {/* Only the callback form uses this; SiteInteractions reads it via window.libphonenumber?. */}
      <Script src="/assets/libphonenumber-max.js" strategy="lazyOnload" />
      <SiteInteractions />
      {/* Google Analytics (G-FZ4SNB8W58). Public pages only; admin previews aren't counted. */}
      {!preview && (
        <>
          <Script src="https://www.googletagmanager.com/gtag/js?id=G-FZ4SNB8W58" strategy="afterInteractive" />
          <Script id="google-analytics" strategy="afterInteractive">
            {"window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-FZ4SNB8W58');"}
          </Script>
        </>
      )}
    </>
  );
}
