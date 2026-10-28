import Image from "next/image";
import Link from "next/link";
import Partners from "../partners";
import "../home.css";
import { seo } from "../seo";

export const metadata = seo("/blogs/", "Fast Bowling Coaching Tips & Guides | Pathak100MPH", "Fast bowling coaching tips and practical guides on pace, technique, training and preparation.");

const base = "https://sam.harsh-4844.chatgpt.site/blogs/";
const brand = <span className="brand-name">Pathak100MPH</span>;

const posts = [
  ["how-to-increase-arm-speed-in-fast-bowling", 0, "FAST.", "FASTER.", "PACE & PERFORMANCE", "How to Increase Arm Speed in Fast Bowling", "Understand arm speed as part of your complete bowling action. Use video, a clear coaching cue and repeatable practice to guide your next step."],
  ["perfect-fast-bowling-technique", 1, "THE", "ACTION.", "TECHNIQUE", "Fast Bowling Technique: Understand Your Own Action", "Explore run-up, alignment, front-leg movement and follow-through. Learn how to review fast bowling technique without copying a one-size-fits-all action."],
  ["best-gym-workouts-for-fast-bowlers", 2, "BUILT", "STRONG.", "STRENGTH", "Gym Workouts for Fast Bowlers: Plan Around Your Cricket", "Understand how to discuss strength, conditioning and recovery with your coach. Build gym work around your age, training experience and cricket schedule."],
  ["how-to-increase-bowling-speed-in-cricket", 3, "FIND", "PACE.", "PACE & PERFORMANCE", "How to Increase Bowling Speed: Build Pace with a Plan", "Develop bowling speed through repeatable technique, purposeful practice and feedback. Learn what to measure and when to ask for individual coaching."],
  ["admission-fees-process-2026", 1, "YOUR", "GAME.", "COACHING INSIGHTS", <>How to join {brand}: Admission and assessment guide</>, <>Learn how to join {brand}. Book a ₹1,199 online bowling assessment and discuss your next steps with Ankit Pathak.</>],
  ["fast-bowling-run-up-drills-ankit-pathak", 1, "YOUR", "GAME.", "COACHING INSIGHTS", "Fast Bowling Run-Up: Build Rhythm and Repeatability", "Learn how to review your fast bowling run-up using starting marks, safe video angles and a single coaching focus."],
  ["fast-bowling-drills-ankit-pathak", 1, "YOUR", "GAME.", "COACHING INSIGHTS", "Fast Bowling Drills: Practise with a Clear Purpose", "Explore practical ways to organise run-up, accuracy and video-feedback drills. Choose a clear goal and connect practice to your normal bowling."],
  ["injury-prevention-tips-for-fast-bowlers", 1, "YOUR", "GAME.", "COACHING INSIGHTS", "Fast Bowling Workload and Recovery: What to Discuss", "Keep coaches informed about your complete cricket workload, recovery and changes in how you feel. A practical guide to better training communication."],
];

export default function Blogs() {
  return (
    <main id="main">
      <section className="wrap page-hero">
        <p className="eyebrow reveal">FAST BOWLING COACHING TIPS</p>
        <h1 className="reveal">Understand the work.<br /><span>Improve your practice.</span></h1>
        <p className="lede reveal">
          Fast bowling coaching tips and practical guides on pace, technique, training and preparation. Explore a topic, then find the right personal support for your game.
        </p>
      </section>
      <section className="wrap blog-list">
        <div className="blog-grid">
          {posts.map(([slug, art, l1, l2, tag, title, text], i) => (
            <a className={i < 4 ? "blog-card reveal" : "blog-card"} href={`${base}${slug}/`} key={slug}>
              <div className={`blog-art art-${art}`}><span>{l1}<br />{l2}</span><b>↗</b></div>
              <p className="tiny">{tag}</p>
              <h3>{title}</h3>
              <p>{text}</p>
            </a>
          ))}
        </div>
      </section>
      <Partners current />
      <section className="closing wrap reveal">
        <Link aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Image alt="Pathak100MPH" height="170" src="/assets/logo.webp" width="367" />
        </Link>
        <h2>Put understanding<br />into practice.</h2>
        <p>Bring personal guidance into your training.</p>
        <div className="actions">
          <Link className="button" href="/online-training/">Explore online training<span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
