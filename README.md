# Pathak100MPH recreation

Next.js App Router, JavaScript, React, and Tailwind CSS 4.

## Run

```sh
npm install
npm run dev
```

- Homepage: http://localhost:3000/
- Admission (assessment): http://localhost:3000/admission/
- Coach profile: http://localhost:3000/best-fast-bowling-coach/
- Online bowling training: http://localhost:3000/online-bowling-training/
- Action Analysis: http://localhost:3000/action-analysis
- Facilities: http://localhost:3000/facilities
- Events: http://localhost:3000/events
- Scholarship: http://localhost:3000/scholarship

Production: `npm run build`, then `npm start`.
Smoke check with the server running: `node scripts/check.mjs`.

## Where things are

**Pages** (each folder name is the page's address; Next.js requires the file to be called `page.js`):

- `app/(site)/(home)/page.js`: home page (`/`)
- `app/(site)/best-fast-bowling-coach/page.js`: Ankit Pathak coach page
- `app/(site)/admission/page.js` (+ `assessment-booking.js`): admission and online assessment
- `app/(site)/online-bowling-training/page.js`: online training plans
- `app/(site)/action-analysis/page.js`, `scholarship/`, `facilities/`, `events/`, `blogs/`: the other pages
- `app/(site)/layout.js`: wraps every public page with Navbar, Footer and the pop-ups
- `app/admin/`: the CMS admin panel

**Components** (`app/components/`), shared building blocks:

- `Navbar.js`: skip link, announcement bar, header menu, mobile menu
- `Footer.js`: site footer
- `CallbackForm.js`, `CallbackPrompt.js`, `WhatsAppButton.js`: call-back pop-up, its reminder, floating WhatsApp button
- `PageHero.js`, `HeroCarousel.js`: top section of inner pages, photo carousel
- `PlayerResults.js`, `Partners.js` (`Partners` and `HomePartners`), `CommunityReels.js`, `VideoRail.js`
- `Faq.js` (`Faq`, `FaqList`), `Steps.js`, `BookingDialog.js`
- `Text.js`: `<Text>` renders CMS text (line breaks, links, brand name); `<Img>` renders CMS images
- `SiteInteractions.js`: browser behaviour (menus, animations, carousels, form validation)

**Content and styles**

- `app/content/defaults/*.js`: built-in text and images for each page (also the CMS field list)
- `app/lib/`: database, auth, permissions, content loading
- `app/globals.css`, `app/home.css`: site styles
- `public/assets/`: images and the phone validation library

References: https://sam.harsh-4844.chatgpt.site/, https://sam.harsh-4844.chatgpt.site/assessment-trial/, https://sam.harsh-4844.chatgpt.site/ankit-pathak/, and https://sam.harsh-4844.chatgpt.site/online-training/.

All eight implemented routes link locally. Other content links open their original reference destinations. YouTube, Instagram, and Google Fonts require internet access. Instagram content and embed loading are controlled by Instagram. The callback form validates locally and explicitly states that no information is sent or stored. Assessment booking matches the reference's unconnected checkout preview and offers an admissions phone link. Training enrolment opens the original external Razorpay destinations; no payment is processed by this app.

Verified: production build; eight-page section and asset smoke checks; desktop/mobile visual comparison; assessment booking preview; responsive process accordions; FAQs; navigation between all eight pages; shared callback dialog; training testimonial embeds and Action Analysis Instagram posts.

Action Analysis booking mirrors the reference preview dialog: checkout is not connected, and the dialog offers a telephone link to admissions.

All pages share `app/page-hero.js` and `app/site-footer.js`, matching the facilities reference’s compact responsive hero and directory footer. `app/facilities/page.js` includes the facility descriptions, real photo gallery with enlargement, reference placeholders, residential FAQs, and current partner artwork.
