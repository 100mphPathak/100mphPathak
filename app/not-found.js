import Link from "next/link";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import CallbackForm from "./components/CallbackForm";
import WhatsAppButton from "./components/WhatsAppButton";
import CallbackPrompt from "./components/CallbackPrompt";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main" className="wrap page-hero">
        <p className="eyebrow">404</p>
        <h1 className="hero-title">This page could not be found.</h1>
        <p className="lede">
          <Link href="/">Back to the home page</Link>
        </p>
      </main>
      <Footer />
      <CallbackForm />
      <WhatsAppButton />
      <CallbackPrompt />
    </>
  );
}
