import assert from 'node:assert/strict';

const origin = process.env.TEST_URL || 'http://127.0.0.1:3000';
const response = await fetch(origin);
assert.equal(response.status, 200, 'Homepage must render');
const html = await response.text();
for (const heading of ['High-performance center.', 'Great pace starts', 'Different starting points.', 'Potential. Meet proof.', 'Stronger, together.', 'Your next challenge is coming.', 'A better understanding.', 'Your next chapter']) {
  assert.ok(html.includes(heading), `Missing section: ${heading}`);
}
for (const asset of ['/assets/logo.webp', '/assets/portrait.webp', '/assets/player0.webp', '/assets/player1.webp', '/assets/player2.webp', '/assets/player3.webp', '/assets/stag-global.png', '/assets/naturaltein.svg', '/assets/apx-collection.png', '/assets/libphonenumber-max.js']) {
  assert.equal((await fetch(origin + asset)).status, 200, `Unavailable asset: ${asset}`);
}
assert.ok(html.includes('Details are not sent or stored.'), 'Preview must disclose that enquiries are not submitted');
assert.ok(html.includes('For serious players.'), 'Homepage must use the current reference hero');
assert.equal((html.match(/class="path-card"/g) || []).length, 3, 'Homepage must show the three current pathways');
assert.ok(html.includes('Start with an online assessment for academy admission.'), 'Homepage admission copy must match the reference');
assert.ok(html.includes('/assets/apx-official.png'), 'Homepage must use the current APX artwork');
const trialResponse = await fetch(origin + '/assessment-trial');
assert.equal(trialResponse.status, 200, 'Assessment page must render');
const trial = await trialResponse.text();
for (const heading of ['Your next chapter.', 'Starts with an assessment.', 'Your personal assessment.', 'Clarity at every step.', 'From your first assessment.', 'Good questions.', 'Ready to take']) {
  assert.ok(trial.includes(heading), `Missing assessment section: ${heading}`);
}
assert.ok(/href="\/assessment-trial\/?"/.test(html), 'Homepage must link to local assessment route');
assert.ok(trial.includes('id="book-assessment"'), 'Hero booking links must have a target');
assert.ok(trial.includes('data-book="Online Assessment · ₹1,199"'), 'Assessment booking preview must be available');
assert.ok(trial.includes('checkout link to be connected'), 'Unconnected assessment checkout must be disclosed');
assert.ok(!trial.includes('pl_RPHU1eno6aqRda'), 'Assessment must not use the replaced offline checkout');
assert.ok(!trial.includes('role="tablist"'), 'Assessment must not show the replaced discipline tabs');
for (const video of ['dCaSesjCBvs', '0UvEsF50YCY', 'ME2vMALm5Qw', '2uEEB9cXvMY']) {
  assert.ok(trial.includes('youtube-nocookie.com/embed/' + video), `Missing assessment video: ${video}`);
}
assert.ok(trial.includes('Rescheduling requires prior academy approval.'), 'Current rescheduling terms must remain visible');
assert.ok(trial.includes('Non-refundable.'), 'Booking terms must remain visible');
const coachResponse = await fetch(origin + '/ankit-pathak');
assert.equal(coachResponse.status, 200, 'Coach page must render');
const coach = await coachResponse.text();
for (const text of ['Your action. Your ambition.', 'His attention.', '13+ years of experience.', 'THE APPROACH', 'Every bowler is different.', 'Potential. Meet proof.', 'How do I choose the best fast bowling coach for me?', 'Can I work with Ankit Pathak online?', 'Let’s look at']) {
  assert.ok(coach.includes(text), `Missing coach content: ${text}`);
}
assert.ok(/href="\/ankit-pathak\/?"/.test(html), 'Homepage must link to local coach route');
assert.ok(/href="\/assessment-trial\/?"/.test(coach), 'Coach page must link to local assessment route');
const trainingResponse = await fetch(origin + '/online-training');
assert.equal(trainingResponse.status, 200, 'Online training page must render');
const training = await trainingResponse.text();
for (const text of ['Improve with direction.', 'PLAYER EXPERIENCES', 'Three ways to begin.', 'Know what to train.', 'Your weekly review', 'Who can enrol?', 'No assessment required.', 'Do I need an assessment first?', 'Anywhere in the world.']) {
  assert.ok(training.includes(text), `Missing training section: ${text}`);
}
for (const video of ['wzldKpk_c2Y', 'C2aQtRpzcDs']) {
  assert.ok(training.includes('youtube-nocookie.com/embed/' + video), `Missing training video: ${video}`);
}
assert.ok(training.includes('https://www.instagram.com/reel/DZAVjmKyhtt/embed/'), 'Training must embed the updated Instagram feedback');
assert.ok(training.includes('Choose your training plan'), 'Training hero must link to the plan section');
for (const term of ['ot-1m', 'ot-6m', 'ot-12m']) {
  assert.ok(training.includes('https://pages.razorpay.com/' + term), `Missing enrolment link: ${term}`);
}
assert.ok(/href="\/online-training\/?"/.test(html), 'Homepage must link to local training route');
const actionResponse = await fetch(origin + '/action-analysis');
assert.equal(actionResponse.status, 200, 'Action Analysis page must render');
const action = await actionResponse.text();
for (const text of ['Understand your action.', 'Leave with direction.', 'Your improvement priorities', 'Share your videos', 'A closer look.', 'Can I reschedule?', 'Bowl with direction.']) {
  assert.ok(action.includes(text), `Missing Action Analysis section: ${text}`);
}
const coachMarkup = coach.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '');
assert.equal((coachMarkup.match(/Book online assessment · ₹1,199/g) || []).length, 3, 'Coach page must show the three updated assessment links');
assert.ok(!coach.includes('₹499'), 'Coach page must not advertise the replaced Action Analysis offer');
assert.ok(action.includes('checkout link to be connected'), 'Booking preview must disclose unconnected checkout');
assert.ok(action.includes('href="tel:+918882390596"'), 'Admissions phone link must be available');
const events = await (await fetch(origin + '/events')).text();
for (const text of ['New challenges.', 'More to chase.', 'Speed Contest', 'Are the other upcoming events confirmed?', 'Your moment will come.', 'Explore training']) {
  assert.ok(events.includes(text), `Missing Events content: ${text}`);
}
assert.equal((events.match(/class="event (?:speed|pending)"/g) || []).length, 3, 'Events must show three upcoming cards');
assert.equal((events.match(/<details>/g) || []).length, 2, 'Events must show both FAQs');
assert.ok(/href="\/events\/?"/.test(html), 'Navigation must link to the local Events page');
const scholarship = await (await fetch(origin + '/scholarship')).text();
for (const text of ['Earn the opportunity.', 'Keep raising your standard.', '125+', '80%', '2K + Bronco', 'Join the waiting list.', 'Accommodation and residential facilities are excluded.', 'Reassessed every 3 months.', 'What does the ₹5,000 payment cover?', 'scholarship-booking']) {
  assert.ok(scholarship.includes(text), `Missing Scholarship content: ${text}`);
}
assert.ok(scholarship.includes('data-book="Scholarship Assessment · ₹5,000"'), 'Scholarship registration must open its booking preview');
assert.ok(scholarship.includes('checkout link to be connected'), 'Scholarship must disclose that checkout is unconnected');
assert.ok(/href="\/scholarship\/?"/.test(html), 'Homepage must link to the local Scholarship page');
const routes = ['/', '/ankit-pathak', '/assessment-trial', '/online-training', '/action-analysis', '/facilities', '/events', '/scholarship'];
for (const route of routes) {
  const result = await fetch(origin + route);
  assert.equal(result.status, 200, `Route must render: ${route}`);
  const page = await result.text();
  assert.ok(page.includes(route === '/' ? 'home-hero wrap' : route === '/events' ? 'wrap page-hero' : 'page-hero wrap mobile-video-first'), `Hero missing: ${route}`);
  assert.ok(page.includes('footer-v13'), `Shared footer missing: ${route}`);
  assert.ok(page.includes('PACE. PURPOSE. PATHAK.'), `Footer signature missing: ${route}`);
}
const facilities = await (await fetch(origin + '/facilities')).text();
for (const text of ['Room to train.', 'Training environment', 'Residential support', 'The environment.', 'Confident decisions.', 'Come for the coaching.']) {
  assert.ok(facilities.includes(text), `Missing facilities content: ${text}`);
}
assert.ok(facilities.includes('photo-dialog'), 'Gallery photo viewer must be present');
for (const asset of ['team.webp','ground.webp','practice.webp','apx-official.png']) {
  assert.equal((await fetch(origin + '/assets/' + asset)).status, 200, `Missing facilities asset: ${asset}`);
}
console.log('All eight routes, Scholarship content/booking, shared footers, gallery assets, and existing checks passed.');

