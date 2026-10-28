import Link from "next/link";
import "./globals.css";
import SiteShell from "./site-shell";

export default function NotFound() {
  return (
    <SiteShell>
      <main id="main" className="wrap page-hero">
        <p className="eyebrow">404</p>
        <h1>This page could not be found.</h1>
        <p className="lede">
          <Link href="/">Back to the home page</Link>
        </p>
      </main>
    </SiteShell>
  );
}
