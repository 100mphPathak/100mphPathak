// Privacy Policy (/privacy-policy/). Same shape as terms.js, plus sub-headings (heading + text) inside a section.
const section = (heading, text, subsections = []) => ({ heading, text, points: [], note: "", subsections });
const sub = (heading, text) => ({ heading, text });

export default {
  eyebrow: "LEGAL",
  title: "Pathak100MPH Privacy Policy",
  updated: "3 November 2026",
  lede: "Pathak100MPH Cricket Academy (“we”, “our”, or “us”) respects the privacy of players, parents, This Privacy Policy explains how Pathak100MPH (“we”, “our”, “us”) collects, uses, discloses, and protects your information when you visit our website, book an assessment, enrol in online training, or interact with us through any other channel.",
  intro: "",
  sections: [
    section("1. Information We Collect", "", [
      sub("Personal Information", "When you book an assessment, enquire about admission, enrol in online training, or contact us, we may collect information such as your name, age, phone number, email address, and any other details you choose to share."),
      sub("Payment Information", "Assessment booking, online training payments and scholarship assessment payments are processed securely through our third-party payment gateway. We do not store your card, UPI, or banking details on our servers."),
      sub("Usage Information", "We may collect non-personal information about how you use our website, including IP address, browser type, pages visited, and time spent on the site, to help us improve the website experience."),
    ]),
    section("2. How We Use Your Information", "", [
      sub("Assessment Booking & Admission Communication", "We use your contact details to schedule your assessment, share admission-related updates, and communicate about training programs, via phone call, WhatsApp, SMS, or email."),
      sub("Service Delivery", "Your information helps us manage assessment bookings and online training enrolments."),
      sub("Marketing Communication", "We may occasionally send updates, offers, or newsletters related to our training programs. You can opt out of promotional communication at any time by contacting us."),
      sub("Website Improvement", "We analyse usage data to identify trends, fix issues, and improve our website’s performance and content."),
    ]),
    section("3. Disclosure of Information", "", [
      sub("Third-Party Service Providers", "We may share your information with trusted third parties who support our operations, such as payment gateways. These parties are required to keep your information confidential and secure."),
      sub("Legal Compliance", "We may disclose information where required to comply with applicable laws, regulations, legal processes, or valid government requests."),
    ]),
    section("4. Data Security", "We use industry-standard measures to protect your personal information from unauthorized access, alteration, or disclosure. No method of transmission over the internet is completely secure, and we cannot guarantee absolute security."),
    section("5. Your Rights & Choices", "You may request to access, update, or delete your personal information, or opt out of promotional communication, at any time by contacting us using the details below."),
    section("6. Children’s Privacy", "Many of our trainees are minors enrolling under a parent or guardian. Information for trainees under 18 is collected with parental or guardian involvement and used only for training and admission purposes."),
    section("7. Changes to This Policy", "We may update this Privacy Policy periodically. Updates will be posted on this page. Continued use of our website after changes are posted means you accept the revised policy."),
    section("8. Contact Support", "For privacy questions, requests, or complaints, contact:\nPathak100MPH Cricket Academy\nCall or WhatsApp: [+91 8882390596](tel:+918882390596)"),
  ],
};
