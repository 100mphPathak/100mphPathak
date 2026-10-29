const link = (label, href) => ({ label, href });

// Coach page hero carousel photos (the home page uses its own slides below).
export const heroSlides = [
  { src: "/assets/academy-squad.webp", alt: "Ankit Pathak and coaches with Pathak100MPH academy players at the nets", width: 1920, height: 912 },
  { src: "/assets/nepal-team.webp", alt: "Nepal national cricket team, including Pathak100MPH player Hemant Dhami", width: 1920, height: 912 },
];

const slide = (src, alt, caption, width, height) => ({ image: { src, alt, width, height }, caption });

export default {
  hero: {
    eyebrow: "Best fast bowling academy in India",
    statement: "High-performance center.",
    statementAccent: "For serious cricketers.",
    text: "Pathak100MPH is No. 1 high-performance fast bowling academy in India, with 65+ selections in just five years.",
    button: link("Find your path", "#pathways"),
    slides: [
      slide("/assets/academy-squad.webp", "Players and coaches at Pathak100MPH", "Our academy community", 1920, 912),
      slide("/assets/action.webp", "Coach Ankit Pathak with a player at the academy", "Guidance from the ground up", 1920, 912),
      slide("/assets/ground.webp", "Cricketers at the Pathak100MPH practice nets", "A place to develop your game", 1512, 2016),
    ],
    caption: "A stronger game. A sharper mindset. A higher standard.",
  },
  stats: [
    { value: "3,000+", label: "Players trained" },
    { value: "65+", label: "Selections in 5 years" },
    { value: "13+", label: "Years of experience" },
    { value: "1M+", label: "Social community" },
  ],
  coach: {
    photo: { src: "/assets/portrait.webp", alt: "Ankit Pathak at the cricket ground", width: 952, height: 1023 },
    photoCredit: "ANKIT PATHAK\nFOUNDER & HEAD COACH",
    eyebrow: "THE COACH BEHIND THE CHANGE",
    heading: "Great Pace Starts With Greater Understanding",
    text: "13+ years of experience. A precise eye for technique. A focus on preparation and mindset. Meet the coach helping fast bowlers discover what they’re capable of.",
    button: link("Meet Ankit Pathak", "/best-fast-bowling-coach/"),
  },
  pathways: {
    eyebrow: "FIND YOUR PATH",
    heading: "Choose Your Path at Pathak100MPH",
    cards: [
      { eyebrow: "01 / ACADEMY ADMISSION", heading: "Academy Admission", text: "Start with an online assessment for academy admission.", button: link("Book an assessment", "https://pages.razorpay.com/pathak100mph-assessment") },
      { eyebrow: "02 / TRAIN FROM ANYWHERE", heading: "Online Bowling Training", text: "Train where you live. Get a personal plan and regular feedback from our coaches.", button: link("Explore online training", "/online-bowling-training/") },
      { eyebrow: "03 / EARN SPONSORSHIP", heading: "Pathak100MPH Scholarship", text: "Show your skills at an assessment for a chance to earn sponsored academy training.", button: link("See how to qualify", "/scholarship/") },
    ],
  },
  insights: {
    eyebrow: "FROM THE COACHING DESK",
    heading: "Fast Bowling Insights",
    text: "Practical insights on technique, pace and performance. New perspectives every week.",
    button: link("Explore all insights", "/blogs/"),
  },
  closing: {
    heading: "Start Your Journey at Pathak100MPH",
    text: "Tell us where you are. Let’s talk about where you could go.",
    button: "Request a call back",
  },
};
