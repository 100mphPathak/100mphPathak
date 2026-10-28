const features = [
  "Daily personalised bowling drills",
  "Daily strength & conditioning",
  "Weekly bowling video analysis",
  "Monthly live career guidance",
  "WhatsApp support",
];
const plan = (tier, duration, price, text, href, highlighted, badge) => ({
  highlighted,
  badge,
  tier,
  duration,
  price,
  text,
  features,
  button: { label: "Enrol now", href },
  note: "Total plan fee · Non-refundable",
});

export default {
  hero: {
    eyebrow: "ONLINE FAST BOWLING TRAINING",
    heading: "Train anywhere.",
    headingAccent: "Improve with direction.",
    text: "Personalised online fast bowling training with Coach Ankit Pathak’s team. Regular drills, video analysis and monthly live guidance, coordinated through your private WhatsApp group.",
    videoId: "wzldKpk_c2Y",
    videoTitle: "How online training works | Pathak100MPH",
    button: { label: "Choose your training plan", href: "#plans" },
  },
  experiences: {
    eyebrow: "PLAYER EXPERIENCES",
    heading: "Online training.\nIn their own words.",
    hint: "From the Pathak100MPH community",
    videos: [
      { platform: "youtube", videoId: "C2aQtRpzcDs", title: "Pathak100MPH player experience" },
      { platform: "instagram", videoId: "DZAVjmKyhtt", title: "Pathak100MPH online training feedback on Instagram" },
    ],
  },
  plans: {
    eyebrow: "CHOOSE YOUR COMMITMENT",
    heading: "One coaching approach.\nThree ways to begin.",
    items: [
      plan("STARTER", "1 month", "₹3,999", "A focused start.", "https://pages.razorpay.com/ot-1m", false, ""),
      plan("ELITE", "6 months", "₹9,999", "Time to build consistency.", "https://pages.razorpay.com/ot-6m", true, "6-MONTH PLAN"),
      plan("CHAMPION", "12 months", "₹14,999", "Commit to the long game.", "https://pages.razorpay.com/ot-12m", false, ""),
    ],
  },
  benefits: {
    eyebrow: "WHAT YOUR PLAN GIVES YOU",
    heading: "Know what to train.\nKnow what to work on.",
    items: [
      { heading: "Your daily work", text: "Personalised bowling drills and strength & conditioning plans delivered through WhatsApp." },
      { heading: "Your weekly review", text: "Submit bowling footage for technical analysis and feedback on your next areas of focus." },
      { heading: "Your monthly direction", text: "Live progress review and career guidance with Ankit sir and the team." },
    ],
    sampleLabel: "ILLUSTRATIVE WORKFLOW · NOT A PLAYER RESULT",
    sampleFlow: ["You share bowling videos", "Your coaches review", "Your plan & feedback"],
    sampleText: "Your coach reviews your footage and sets drills and priorities for your training.",
  },
  steps: {
    eyebrow: "PERSONAL. EVEN FROM A DISTANCE.",
    heading: "A plan built around you.\nFeedback that moves you forward.",
    text: "Your action, your goals and your progress shape the coaching. Open to every age, level and location. No assessment required.",
    items: [
      { title: "01 / Enrol", text: "Choose your plan and pay. Your private WhatsApp group is created within 48 hours." },
      { title: "02 / Get your plan", text: "Share bowling videos and payment confirmation. Ankit sir and the team review your action and personalise your training." },
      { title: "03 / Train. Review. Refine.", text: "Follow daily drills and strength work. Submit weekly videos and join monthly live guidance sessions." },
    ],
  },
  faq: {
    eyebrow: "A LITTLE MORE CLARITY",
    heading: "Good questions.\nClear answers.",
    text: "Everything you need to take the next step.",
    items: [
      { question: "Who can enrol?", answer: "Anyone. The program is open to male and female bowlers of any age and playing level, in India or abroad." },
      { question: "Do I need an assessment first?", answer: "No. You can enrol directly. Your videos help us build your personalised plan after enrolment." },
      { question: "Is batting coaching available online?", answer: "No. Our online training program is for bowling only." },
      { question: "How do I get support?", answer: "Use your private WhatsApp group for training communication and questions. Weekly video analysis and monthly live guidance are included." },
    ],
  },
  closing: {
    heading: "Same ambition.\nAnywhere in the world.",
    text: "Your next session starts with a plan.",
    button: { label: "Choose your plan", href: "#plans" },
  },
};
