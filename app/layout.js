import { DM_Sans, Manrope } from "next/font/google";
import { SITE_URL } from "./seo";

const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope" });

export const metadata = {
  title: "Pathak100MPH | High-Performance Cricket Academy",
  description:
    "High-performance bowling and batting coaching. Explore trials, online bowling training and personal action analysis with Ankit Pathak.",
  metadataBase: new URL(SITE_URL),
};

// Public pages get the site header/footer from app/(site)/layout.js; /admin has its own.
export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${dmSans.variable} ${manrope.variable}`}>
      <body>{children}</body>
    </html>
  );
}
