import Image from "next/image";
import Link from "next/link";
export default function SiteFooter() {
  return (
    <footer className="footer-v13">
      <div className="wrap footer-shell">
        <div className="footer-signature">
          <Link aria-label="Pathak100MPH home" className="brand" href="/">
            <Image
              alt="Pathak100MPH"
              height="170"
              loading="lazy"
              src="/assets/logo.webp"
              width="367"
            />
          </Link>
          <div>
            <span className="tiny">{"DELHI NCR · EST. 2021"}</span>
            <p>
              {"Built for the"}
              <br />
              <strong>{"serious cricketer."}</strong>
            </p>
          </div>
          <Link className="footer-phone" href="tel:+918882390596">
            {"Let’s talk cricket "}
            <span>{"+91 88823 90596 ↗"}</span>
          </Link>
        </div>
        <div className="footer-directory">
          <nav aria-label="Academy footer links">
            <span className="tiny">{"THE ACADEMY"}</span>
            <Link href="/ankit-pathak/">{"Ankit Pathak"}</Link>
            <Link href="/facilities/">{"Facilities & hostel"}</Link>
            <Link href="/events/">
              {"Upcoming events"}
            </Link>
            <Link href="/blogs/">
              {"Coaching insights"}
            </Link>
          </nav>
          <nav aria-label="Training footer links">
            <span className="tiny">{"YOUR GAME. YOUR WAY."}</span>
            <Link href="/assessment-trial/">{"Admission"}</Link>
            <Link href="/online-training/">{"Online training"}</Link>
            <Link href="/scholarship/">
              {"Scholarship"}
            </Link>
          </nav>
          <div className="footer-location">
            <span className="tiny">{"COME FIND YOUR PACE"}</span>
            <p>
              {"Near Chhapraula Police Chowki,"}
              <br />
              {"KRBL Rice Mill, Bisnauli,"}
              <br />
              {"Uttar Pradesh 203207"}
            </p>
            <Link
              href="https://wa.me/918882390596"
              rel="noopener"
              target="_blank"
            >
              {"Connect on WhatsApp ↗"}
            </Link>
          </div>
        </div>
        <div className="footer-legal">
          <span>{"© 2026 Ankit Pathak and Sons"}</span>
          <nav aria-label="Legal">
            <Link href="https://sam.harsh-4844.chatgpt.site/terms/">
              {"Terms & Conditions"}
            </Link>
            <Link href="https://sam.harsh-4844.chatgpt.site/return-policy/">
              {"Return Policy"}
            </Link>
            <Link href="https://sam.harsh-4844.chatgpt.site/privacy/">
              {"Privacy Policy"}
            </Link>
          </nav>
          <span>{"PACE. PURPOSE. PATHAK."}</span>
        </div>
      </div>
    </footer>
  );
}
