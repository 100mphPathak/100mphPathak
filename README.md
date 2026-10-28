# Pathak100MPH recreation

Next.js App Router, JavaScript, React, and Tailwind CSS 4.

## Run

```sh
npm install
npm run dev
```

- Homepage: http://localhost:3000/
- Assessment trials: http://localhost:3000/assessment-trial
- Coach profile: http://localhost:3000/ankit-pathak
- Online bowling training: http://localhost:3000/online-training
- Action Analysis: http://localhost:3000/action-analysis
- Facilities: http://localhost:3000/facilities
- Events: http://localhost:3000/events
- Scholarship: http://localhost:3000/scholarship

Production: `npm run build`, then `npm start`.
Smoke check with the server running: `node scripts/check.mjs`.

## Source

- `app/page.js`: full homepage.
- `app/scholarship/page.js`: eligibility criteria, sponsorship waiting list, reassessment terms, FAQs, and ₹5,000 registration preview.
- `app/action-analysis/page.js`: session details, three-step process, testimonials, FAQs, partners, and preview booking dialog.
- `app/online-training/page.js`: updated coaching introduction and video, YouTube/Instagram player feedback, three enrolment plans, benefits, workflow, process, FAQs, and partners.
- `app/community-reels.js`: shared Instagram testimonials.
- `app/ankit-pathak/page.js`: updated coach introduction, portrait biography, approach, results, coaching FAQs, partners, and ₹1,199 assessment links.
- `app/player-results.js`: shared player results section.
- `app/assessment-trial/page.js`: online assessment hero, updated video, process, YouTube testimonials, FAQs, partners, and closing action.
- `app/assessment-trial/assessment-booking.js`: ₹1,199 Google Meet assessment details and unconnected booking preview.
- `app/site-shell.js`: shared header, mobile menu, footer, callback form, and WhatsApp link.
- `app/site-interactions.js`: route-aware event setup and cleanup, animations, menus, phone validation, keyboard rails, and responsive process steps.
- `app/partners.js`: shared sponsor and partner section.
- `app/globals.css`: reference responsive visual styles and Tailwind utilities.
- `public/assets/`: original public imagery and phone validation library.

References: https://sam.harsh-4844.chatgpt.site/, https://sam.harsh-4844.chatgpt.site/assessment-trial/, https://sam.harsh-4844.chatgpt.site/ankit-pathak/, and https://sam.harsh-4844.chatgpt.site/online-training/.

All eight implemented routes link locally. Other content links open their original reference destinations. YouTube, Instagram, and Google Fonts require internet access. Instagram content and embed loading are controlled by Instagram. The callback form validates locally and explicitly states that no information is sent or stored. Assessment booking matches the reference's unconnected checkout preview and offers an admissions phone link. Training enrolment opens the original external Razorpay destinations; no payment is processed by this app.

Verified: production build; eight-page section and asset smoke checks; desktop/mobile visual comparison; assessment booking preview; responsive process accordions; FAQs; navigation between all eight pages; shared callback dialog; training testimonial embeds and Action Analysis Instagram posts.

Action Analysis booking mirrors the reference preview dialog: checkout is not connected, and the dialog offers a telephone link to admissions.

All pages share `app/page-hero.js` and `app/site-footer.js`, matching the facilities reference’s compact responsive hero and directory footer. `app/facilities/page.js` includes the facility descriptions, real photo gallery with enlargement, reference placeholders, residential FAQs, and current partner artwork.
