import Script from "next/script";
import { DM_Sans, Manrope } from "next/font/google";
import "./globals.css";
import SiteShell from "./site-shell";
import SiteInteractions from "./site-interactions";
import { SITE_URL } from "./seo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  title: "Pathak100MPH | High-Performance Cricket Academy",
  description:
    "High-performance bowling and batting coaching. Explore trials, online bowling training and personal action analysis with Ankit Pathak.",
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
        {/* Only the callback form uses this; site-interactions reads it via window.libphonenumber?. */}
        <Script src="/assets/libphonenumber-max.js" strategy="lazyOnload" />
        <SiteInteractions />
      </body>
    </html>
  );
}
