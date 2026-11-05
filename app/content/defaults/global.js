const logo = { src: "/assets/logo.webp", alt: "Pathak100MPH", width: 367, height: 170 };
const link = (label, href) => ({ label, href });

export default {
  seo: {
    title: "Pathak100MPH | High-Performance Cricket Academy",
    description:
      "High-performance bowling and batting coaching. Explore trials, online bowling training and personal action analysis with Ankit Pathak.",
    ogImage: { src: "/assets/nepal-team.webp", alt: "Pathak100MPH players with the Nepal team", width: 1920, height: 912 },
  },
  announcement: {
    lead: "Your next step starts here.",
    link: link("Explore academy assessment", "/admission/"),
  },
  header: {
    logo,
    callbackButton: "Request a call back",
    nav: [
      link("Ankit Pathak", "/best-fast-bowling-coach/"),
      link("Admission", "/admission/"),
      link("Online Training", "/online-bowling-training/"),
      link("Scholarship", "/scholarship/"),
      link("Facilities", "/facilities/"),
      link("Events", "/events/"),
      link("Insights", "/blogs/"),
    ],
  },
  mobileMenu: {
    links: [
      link("Ankit Pathak", "/best-fast-bowling-coach/"),
      link("Admission", "/admission/"),
      link("Online Training", "/online-bowling-training/"),
      link("Scholarship", "/scholarship/"),
      link("Facilities", "/facilities/"),
      link("Upcoming Events", "/events/"),
      link("Insights", "/blogs/"),
    ],
    eyebrow: "LET’S FIND YOUR NEXT STEP",
    heading: "Not sure where to start?",
    text: "Talk to our team about the right training option for you.",
    whatsapp: link("WhatsApp us", "https://wa.me/918882390596"),
    call: link("Call the team", "tel:+918882390596"),
    signature: "Pathak100MPH · EST. 2021",
  },
  callbackForm: {
    eyebrow: "LET’S FIND YOUR NEXT STEP",
    heading: "Let’s talk about\nyour next step.",
    text: "Request a call back from our admissions team.",
    nameLabel: "Player’s name",
    namePlaceholder: "Full name",
    ageLabel: "Age",
    agePlaceholder: "Age",
    countryLabel: "Country / region",
    phoneLabel: "Phone / WhatsApp",
    phonePlaceholder: "Your phone number",
    phoneHelp: "Choose your country, then enter your phone or WhatsApp number.",
    programLabel: "Interested in",
    programPlaceholder: "Choose a program",
    programs: [
      "Offline Bowling Training",
      "Offline Batting Training",
      "Online Bowling Training",
      "Action Analysis",
      "Scholarship",
    ],
    notice: "Design preview: this form demonstrates the enquiry experience. Details are not sent or stored.",
    submit: "Request a call back",
  },
  whatsappButton: {
    href: "https://wa.me/918882390596",
    kicker: "Let’s talk",
    label: "WhatsApp us",
  },
  callbackPrompt: {
    eyebrow: "A QUESTION ABOUT TRAINING?",
    heading: "Let’s find your next step.",
    button: "Request a call back",
  },
  footer: {
    logo,
    tagline: "Built for the",
    taglineBold: "serious cricketer.",
    buttons: {
      call: link("Call Now", "tel:+918882390596"),
    },
    exploreHeading: "EXPLORE PATHAK100MPH",
    academy: {
      heading: "ACADEMY",
      links: [
        link("Ankit Pathak", "/best-fast-bowling-coach/"),
        link("Our Facilities", "/facilities/"),
        link("Upcoming Events", "/events/"),
      ],
    },
    training: {
      heading: "TRAINING",
      links: [
        link("Academy Admission", "/admission/"),
        link("Online Training", "/online-bowling-training/"),
        link("Scholarship", "/scholarship/"),
      ],
    },
    // Shown after the two groups (on phones: in a row of their own), then "Get Directions".
    more: [link("Insights", "/blogs/")],
    directions: link("Get Directions", "https://www.google.com/maps/search/?api=1&query=Chhapraula+Police+Chowki+KRBL+Rice+Mill+Bisnauli+Uttar+Pradesh+203207"),
    emails: [link("Career", "mailto:manager@pathak100mph.com"), link("Collaboration", "mailto:collaborations@pathak100mph.com")],
    copyright: "© 2026 Ankit Pathak and Sons",
    legalLinks: [
      link("Terms & Conditions", "/terms/"),
      link("Return Policy", "/return-policy/"),
      link("Privacy Policy", "/privacy/"),
    ],
  },
  playerResults: {
    eyebrow: "THE WORK SHOWS",
    heading: "Player Results at Pathak100MPH",
    text: "65+ player selections across district, state and national cricket in five years.",
    players: [
      { photo: { src: "/assets/player0.webp", alt: "Swayam Srivastav", width: 500, height: 500 }, tag: "Pathak100MPH PLAYER", name: "Swayam Srivastav", team: "Odisha Pro T20 League" },
      { photo: { src: "/assets/player1.webp", alt: "Vishal Thakur", width: 500, height: 500 }, tag: "Pathak100MPH PLAYER", name: "Vishal Thakur", team: "Ranji Trophy · Services" },
      { photo: { src: "/assets/player2.webp", alt: "Hemant Dhami", width: 500, height: 500 }, tag: "Pathak100MPH PLAYER", name: "Hemant Dhami", team: "Nepal National Team" },
      { photo: { src: "/assets/player3.webp", alt: "Akash Gautam", width: 500, height: 500 }, tag: "Pathak100MPH PLAYER", name: "Akash Gautam", team: "Indian Street Premier League" },
    ],
  },
  // Partners section shown on most pages.
  partners: {
    eyebrow: "STRONGER, TOGETHER.",
    heading: "Partners of Pathak100MPH",
    text: "The brands supporting our players and academy.",
    sponsor: {
      eyebrow: "OUR ACADEMY SPONSOR",
      heading: "STAG Global",
      text: "STAG Global and Pathak100MPH support 25 students annually with cricket gear and merchandise.",
      link: link("Explore STAG Global", "https://stag.global/"),
      logo: { src: "/assets/stag-global.png", alt: "STAG Global", width: 500, height: 500 },
    },
    cards: [
      { logo: { src: "/assets/naturaltein.svg", alt: "Naturaltein", width: 500, height: 500 }, wideLogo: false, role: "OUR NUTRITION PARTNER", name: "Naturaltein", text: "Naturaltein supports our athletes with high-quality nutrition for performance, recovery and everyday training.", codeLabel: "USE CODE", code: "100MPH", href: "https://naturaltein.in/", linkDescription: "Code 100MPH. Visit Naturaltein" },
      { logo: { src: "/assets/apx-official.png", alt: "APX Collection", width: 720, height: 406 }, wideLogo: true, role: "OUR CRICKET GEAR PARTNER", name: "APX Collection", text: "APX Collection creates performance-focused cricket gear for players who train and compete at a higher standard.", codeLabel: "USE CODE", code: "100MPH", href: "https://stag.global/collections/cricket", linkDescription: "Code 100MPH. Visit cricket collection" },
    ],
  },
};
