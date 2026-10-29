import { heroSlides } from "./home.js";

const book = { label: "Book online assessment · ₹1,199", href: "/admission/" };

export default {
  hero: {
    eyebrow: "India’s Most Trusted Fast Bowling Coach",
    heading: "Your action. Your ambition.",
    headingAccent: "His attention.",
    text: "Meet Ankit Pathak, Founder and Head Coach of Pathak100MPH, with 13+ years of experience in fast bowling coaching, player development, technique, physical preparation and mindset.",
    slides: heroSlides,
    button: book,
  },
  coach: {
    photo: { src: "/assets/practice.webp", alt: "Ankit Pathak with a player at the Pathak100MPH ground", width: 1512, height: 2016 },
    photoCredit: "ANKIT PATHAK\nFOUNDER & HEAD COACH",
    eyebrow: "THE COACH & THE ACADEMY",
    heading: "13+ years of experience.",
    headingAccent: "5 years of Pathak100MPH.",
    facts: [
      { value: "13+", label: "Years coaching" },
      { value: "1 Oct 2021", label: "Academy founded" },
      { value: "65+", label: "Selections in 5 years" },
    ],
    text: "Technique, physical preparation and mindset, shaped around the individual player.",
    button: book,
  },
  approach: {
    eyebrow: "THE APPROACH",
    heading: "Ankit Pathak’s Fast Bowling Coaching Approach",
    text: "Technique, physical preparation and mindset work together. Coaching starts by understanding the player.",
    items: [
      { title: "Assess", text: "We break down your run-up, action and release to find what is holding your pace back." },
      { title: "Build", text: "Technique drills, strength work and workload planned around your body and your goals." },
      { title: "Perform", text: "Match scenarios and mental preparation, so your pace holds up when it counts." },
    ],
  },
  faq: {
    eyebrow: "BEFORE YOUR NEXT STEP",
    heading: "Clear answers.\nConfident decisions.",
    items: [
      { question: "How do I choose the best fast bowling coach for me?", answer: "Look for a coach who understands your action, explains the purpose of training, gives useful feedback and considers your goals. Review the coaching approach and player experiences, then choose the level of support you need." },
      { question: "Can I work with Ankit Pathak online?", answer: "Yes. Book a [personal online assessment session](/admission/) on Google Meet or explore [ongoing online training](/online-bowling-training/) with Ankit sir and the team." },
      { question: "How much coaching experience does Ankit Pathak have?", answer: "Ankit Pathak has 13+ years of experience. He founded Pathak100MPH on 1 October 2021 and is its head coach." },
    ],
  },
  closing: {
    heading: "Train With Coach Ankit Pathak",
    text: "Start with a personal online assessment with Ankit Pathak and understand your current action, strengths, problems and next step.",
    button: book,
  },
};
