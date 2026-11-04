const base = "https://sam.harsh-4844.chatgpt.site/blogs/";
const post = (slug, color, art, category, title, text) => ({ href: `${base}${slug}/`, color, art, category, title, text });

export default {
  // Top of the page: eyebrow, two-line heading, text on the right.
  intro: {
    eyebrow: "FAST BOWLING INSIGHTS",
    heading: "Fast bowling.",
    headingAccent: "Clearer answers.",
    text: "Practical guides to your action, your training and your next step. From the basics to the details that deserve a closer look.",
  },
  // The newest post is shown large under the heading.
  featured: { eyebrow: "START WITH A CLEAR TASK", button: "Read the article" },
  library: { allLabel: "All guides", searchPlaceholder: "What are you working on?", empty: "No articles match your search yet." },
  // The first three posts also appear on the home page.
  posts: [
    post("how-to-increase-arm-speed-in-fast-bowling", "blue", "FAST.\nFASTER.", "PACE & PERFORMANCE", "How to Increase Arm Speed in Fast Bowling", "Understand arm speed as part of your complete bowling action. Use video, a clear coaching cue and repeatable practice to guide your next step."),
    post("perfect-fast-bowling-technique", "sand", "THE\nACTION.", "TECHNIQUE", "Fast Bowling Technique: Understand Your Own Action", "Explore run-up, alignment, front-leg movement and follow-through. Learn how to review fast bowling technique without copying a one-size-fits-all action."),
    post("best-gym-workouts-for-fast-bowlers", "green", "BUILT\nSTRONG.", "STRENGTH", "Gym Workouts for Fast Bowlers: Plan Around Your Cricket", "Understand how to discuss strength, conditioning and recovery with your coach. Build gym work around your age, training experience and cricket schedule."),
    post("how-to-increase-bowling-speed-in-cricket", "purple", "FIND\nPACE.", "PACE & PERFORMANCE", "How to Increase Bowling Speed: Build Pace with a Plan", "Develop bowling speed through repeatable technique, purposeful practice and feedback. Learn what to measure and when to ask for individual coaching."),
    post("admission-fees-process-2026", "sand", "YOUR\nGAME.", "COACHING INSIGHTS", "How to join Pathak100MPH: Admission and assessment guide", "Learn how to join Pathak100MPH. Book a ₹1,199 online bowling assessment and discuss your next steps with Ankit Pathak."),
    post("fast-bowling-run-up-drills-ankit-pathak", "sand", "YOUR\nGAME.", "COACHING INSIGHTS", "Fast Bowling Run-Up: Build Rhythm and Repeatability", "Learn how to review your fast bowling run-up using starting marks, safe video angles and a single coaching focus."),
    post("fast-bowling-drills-ankit-pathak", "sand", "YOUR\nGAME.", "COACHING INSIGHTS", "Fast Bowling Drills: Practise with a Clear Purpose", "Explore practical ways to organise run-up, accuracy and video-feedback drills. Choose a clear goal and connect practice to your normal bowling."),
    post("injury-prevention-tips-for-fast-bowlers", "sand", "YOUR\nGAME.", "COACHING INSIGHTS", "Fast Bowling Workload and Recovery: What to Discuss", "Keep coaches informed about your complete cricket workload, recovery and changes in how you feel. A practical guide to better training communication."),
  ],
  // On every article: the author line under the title and the author box at the end.
  author: {
    photo: { src: "/assets/portrait.webp", alt: "Ankit Pathak", width: 952, height: 1023 },
    role: "Fast Bowling Coach",
    bio: "Founder and Head Coach at Pathak100MPH, with 13+ years of coaching experience.",
    link: { label: "About Ankit Pathak", href: "/best-fast-bowling-coach/" },
  },
  related: { eyebrow: "KEEP LEARNING", heading: "Related reading", link: { label: "All insights", href: "/blogs/" } },
  coach: {
    photo: { src: "/assets/portrait.webp", alt: "Coach Ankit Pathak", width: 952, height: 1023 },
    eyebrow: "THE PERSON BEHIND THE APPROACH",
    heading: "Meet Coach Ankit Pathak.",
    text: "Founder and Head Coach at Pathak100MPH, with 13+ years of coaching experience. For academy admission, the Online Assessment brings your footage and goals into a one-to-one conversation.",
    link: { label: "Understand the assessment", href: "/admission/" },
  },
  cta: {
    heading: "Find the right next step for your game.",
    text: "Explore Online Fast Bowling Training, or learn how the Online Assessment works before academy admission.",
    button: { label: "Explore training options", href: "/online-bowling-training/" },
    link: { label: "Understand academy admission", href: "/blogs/admission-fees-process-2026/" },
  },
};
