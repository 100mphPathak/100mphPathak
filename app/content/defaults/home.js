const link = (label, href) => ({ label, href });

export default {
  hero: {
    eyebrow: "Best fast bowling academy in India",
    heading: "High-performance center.",
    headingAccent: "For serious players.",
    text: "Pathak100MPH is No. 1 high-performance fast bowling academy in India, with 65+ selections in just five years.",
    button: link("Find your path", "#pathways"),
    videoId: "-iHp0AR06XE",
    videoTitle: "Inside Pathak100MPH | Pathak100MPH",
    captionLeft: "A stronger game. A sharper mindset. A higher standard.",
    captionRight: "Pathak100MPH, Delhi NCR · EST. 2021",
  },
  stats: [
    { value: "3,000+", label: "Players trained" },
    { value: "65+", label: "Selections in 5 years" },
    { value: "13+", label: "years of experience" },
    { value: "1M+", label: "Social community" },
  ],
  coach: {
    photo: { src: "/assets/portrait.webp", alt: "Ankit Pathak at the cricket ground", width: 952, height: 1023 },
    photoCredit: "ANKIT PATHAK\nFOUNDER & HEAD COACH",
    eyebrow: "THE COACH BEHIND THE CHANGE",
    heading: "Great pace starts\nwith greater",
    headingAccent: "understanding.",
    text: "13+ years of experience. A precise eye for technique. A focus on preparation and mindset. Meet the coach helping fast bowlers discover what they’re capable of.",
    button: link("Meet Ankit Pathak", "/ankit-pathak/"),
  },
  pathways: {
    eyebrow: "FIND YOUR PATH",
    heading: "Different starting points.\nOne higher standard.",
    cards: [
      { eyebrow: "01 / ACADEMY ADMISSION", heading: "Pathak100MPH admission", text: "Start with an online assessment for academy admission.", button: link("Book an assessment", "/assessment-trial/") },
      { eyebrow: "02 / TRAIN FROM ANYWHERE", heading: "Online bowling training", text: "Train where you live. Get a personal plan and regular feedback from our coaches.", button: link("Explore online training", "/online-training/") },
      { eyebrow: "03 / EARN SPONSORSHIP", heading: "Scholarship", text: "Show your skills at an assessment for a chance to earn sponsored academy training.", button: link("See how to qualify", "/scholarship/") },
    ],
  },
  events: {
    eyebrow: "SOMETHING TO LOOK FORWARD TO",
    heading: "Your next challenge is coming.",
    text: "Follow upcoming Pathak100MPH events, competitions and opportunities to test your skills.",
    featured: { number: "01 / UPCOMING", badge: "COMING SOON", heading: "Pathak100MPH\nSpeed Contest" },
    upcoming: [
      { number: "02 / UPCOMING", badge: "COMING SOON", heading: "Next event", headingAccent: "To be announced" },
      { number: "03 / UPCOMING", badge: "COMING SOON", heading: "Next event", headingAccent: "To be announced" },
    ],
  },
  insights: {
    eyebrow: "FROM THE COACHING DESK",
    heading: "A better understanding.\nA better game.",
    text: "Practical insights on technique, pace and performance. New perspectives every week.",
    button: link("Explore all insights", "/blogs/"),
  },
  closing: {
    heading: "Your next chapter\nstarts here.",
    text: "Tell us where you are. Let’s talk about where you could go.",
    button: "Request a call back",
  },
};
