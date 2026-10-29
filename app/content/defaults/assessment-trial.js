// Every booking button goes straight to the payment page.
const book = { label: "Book online assessment · ₹1,199", href: "https://pages.razorpay.com/pathak100mph-assessment" };
const short = (videoId) => ({ videoId, title: "Pathak100MPH player experience" });

export default {
  hero: {
    eyebrow: "Cricket Academy Admission Assessment",
    heading: "Your next chapter.",
    headingAccent: "Starts with an assessment.",
    text: "Before joining Pathak100MPH Cricket Academy, every player is required to complete an Online Assessment with Coach Ankit Pathak.",
    videoId: "dCaSesjCBvs",
    videoTitle: "Why your assessment matters | Pathak100MPH",
    button: book,
    trustLine: "Get personal guidance from Coach Ankit Pathak in the Online Assessment.",
  },
  booking: {
    eyebrow: "START ONLINE",
    heading: "Your Videos.\nYour Assessment.",
    text: "A one-to-one Google Meet session with Coach Ankit Pathak, built around your training footage and cricketing goals. Discuss your technique and improvement priorities with Ankit sir and understand the next step for your development or academy admission.",
    cardEyebrow: "ONLINE ASSESSMENT",
    price: "₹1,199",
    priceNote: "Per player · Personal Google Meet session",
    cardText: "Our team contacts you within 24 to 48 hours after booking to arrange the session and request your videos.",
    button: { label: "Book online assessment", href: "https://pages.razorpay.com/pathak100mph-assessment" },
  },
  steps: {
    eyebrow: "WHAT HAPPENS NEXT",
    heading: "How the Online Assessment Works",
    items: [
      { title: "01 / Book online · ₹1,199", text: "Book your online assessment. Our team contacts you within 24 to 48 hours after payment." },
      { title: "02 / Share your videos", text: "The team confirms your session date and time and requests your bowling footage." },
      { title: "03 / Meet Ankit sir", text: "Join Google Meet for a personal review of your technique and guidance on your next steps." },
    ],
  },
  videos: {
    show: false, // hidden for now at the client's request
    eyebrow: "COACHING THAT STARTS WITH UNDERSTANDING",
    heading: "From your first assessment.\nTo the next chapter.",
    hint: "From the Pathak100MPH community",
    shorts: [short("0UvEsF50YCY"), short("ME2vMALm5Qw"), short("2uEEB9cXvMY")],
  },
  faq: {
    eyebrow: "A LITTLE MORE CLARITY",
    heading: "Good questions.\nClear answers.",
    text: "Everything you need to take the next step.",
    items: [
      { question: "Is the Online Assessment mandatory to join Pathak100MPH?", answer: "Yes. The Online Assessment is mandatory before joining Pathak100MPH Cricket Academy. Book your ₹1,199 Online Assessment, share your cricket videos and meet Coach Ankit Pathak on Google Meet." },
      { question: "Does booking an Assessment guarantee academy admission?", answer: "No. Coach Ankit Pathak personally decides player selection, and academy admission is subject to selection and available seats. Academy admission is available for players aged 10 to 23." },
      { question: "Can I reschedule or get a refund?", answer: "Rescheduling requires prior academy approval and is not guaranteed. Assessment payments are non-refundable under any circumstances." },
    ],
  },
  closing: {
    heading: "Ready to take\nthe first step?",
    text: "A better understanding of your game starts here.",
    button: book,
  },
};
