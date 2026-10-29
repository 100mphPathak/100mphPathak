import global from "./global.js";
import home from "./home.js";
import blogs from "./blogs.js";
import events from "./events.js";
import ankitPathak from "./ankit-pathak.js";
import assessmentTrial from "./assessment-trial.js";
import actionAnalysis from "./action-analysis.js";
import facilities from "./facilities.js";
import onlineTraining from "./online-training.js";
import scholarship from "./scholarship.js";

// Per-page SEO fields. Empty values fall back to the global defaults (see lib/content.js).
const seo = (title, description) => ({
  title,
  description,
  canonical: "",
  noindex: false,
  ogTitle: "",
  ogDescription: "",
  ogImage: { src: "", alt: "", width: 1200, height: 630 },
});

// Every CMS-managed document. `route` is null for site-wide content.
// `alsoRevalidate` lists other routes that render this document's content.
export const PAGES = {
  global: { slug: "global", title: "Site-wide settings", route: null, content: global, seo: {} },
  home: {
    slug: "home",
    title: "Home",
    route: "/",
    content: home,
    seo: seo("Best Fast Bowling Academy in India | Pathak100MPH", "Pathak100MPH is a high-performance fast bowling academy in India, with 65+ selections in five years. Explore academy assessments, online training and scholarships."),
  },
  blogs: {
    slug: "blogs",
    title: "Insights (blog list)",
    route: "/blogs/",
    alsoRevalidate: ["/"],
    content: blogs,
    seo: seo("Fast Bowling Coaching Tips & Guides | Pathak100MPH", "Fast bowling coaching tips and practical guides on pace, technique, training and preparation."),
  },
  "ankit-pathak": {
    slug: "ankit-pathak",
    title: "Ankit Pathak",
    route: "/best-fast-bowling-coach/",
    content: ankitPathak,
    seo: seo("Ankit Pathak | Best Fast Bowling Coach for Your Game", "Looking for the best fast bowling coach for your game? Meet Ankit Pathak: 13+ years of experience and an approach built around technique, preparation and mindset."),
  },
  "assessment-trial": {
    slug: "assessment-trial",
    title: "Admission (assessment)",
    route: "/admission/",
    content: assessmentTrial,
    seo: seo("Cricket Academy Admission assessment & Online Assessment | Pathak100MPH", "Book your ₹1,199 personal online assessment with Ankit Pathak. Share your bowling videos, meet on Google Meet and discuss your development or academy admission."),
  },
  events: {
    slug: "events",
    title: "Events",
    route: "/events/",
    content: events,
    seo: seo("Pathak100MPH Events | Speed Contest & Upcoming Events", "Follow upcoming Pathak100MPH events, including the Speed Contest. Dates, participation criteria and registration details will be announced once confirmed."),
  },
  "online-training": {
    slug: "online-training",
    title: "Online Training",
    route: "/online-bowling-training/",
    content: onlineTraining,
    seo: seo("Online Fast Bowling Training | Pathak100MPH", "Personalised online fast bowling training with Coach Ankit Pathak’s team. Regular drills, video analysis and monthly live guidance through your private WhatsApp group."),
  },
  "action-analysis": {
    slug: "action-analysis",
    title: "Action Analysis",
    route: "/action-analysis/",
    content: actionAnalysis,
    seo: seo("Bowling Action Analysis with Ankit Pathak | ₹499", "Personal fast bowling action analysis with Ankit Pathak on Google Meet for ₹499. Share your videos and get guidance on your next steps."),
  },
  scholarship: {
    slug: "scholarship",
    title: "Scholarship",
    route: "/scholarship/",
    content: scholarship,
    seo: seo("Fast Bowling Scholarship in India | Pathak100MPH", "A performance-based fast bowling scholarship for players aged 11 to 23. Explore the assessment criteria, waiting list, academy sponsorship and ₹5,000 registration."),
  },
  facilities: {
    slug: "facilities",
    title: "Facilities",
    route: "/facilities/",
    content: facilities,
    seo: seo("Cricket Academy with Hostel in Delhi NCR | Pathak100MPH", "Explore Pathak100MPH’s 5-acre cricket training environment, gym, facilities and residential support in Delhi NCR."),
  },
};
