import "./home.css";
import Image from "next/image";
import PlayerResults from "./player-results";
import { seo } from "./seo";

export const metadata = seo("/", "Best Fast Bowling Academy in India | Pathak100MPH", "Pathak100MPH is a high-performance fast bowling academy in India, with 65+ selections in five years. Explore academy assessments, online training and scholarships.");

export default function Home() {
  return (
    <main id="main" className="home-page">
      <section className="home-hero wrap">
        <div className="hero-intro">
          <p className="eyebrow reveal">Best fast bowling academy in India</p>
          <h1 className="reveal">High-performance center.<br/>
            <span>For serious players.</span>
          </h1>
          <p className="lede">
            <span className="brand-name">Pathak100MPH</span> is No. 1 high-performance fast bowling academy in India, with 65+ selections in just five years.</p>
          <div className="hero-side reveal">
            <a className="text-link home-capsule" href="#pathways">Find your path <span>↓</span>
            </a>
          </div>
        </div>
        <div className="vsl-player">
          <div className="vsl-frame">
            <iframe allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" src="https://www.youtube-nocookie.com/embed/-iHp0AR06XE?rel=0" title="Inside Pathak100MPH | Pathak100MPH">
            </iframe>
          </div>
          <a className="video-fallback" href="https://www.youtube.com/watch?v=-iHp0AR06XE" rel="noopener noreferrer" target="_blank">Watch on YouTube ↗</a>
        </div>
        <div className="hero-caption">
          <span>A stronger game. A sharper mindset. A higher standard.</span>
          <span>
            <span className="brand-name">Pathak100MPH</span>, Delhi NCR · EST. 2021</span>
        </div>
      </section>
      <section className="wrap stats reveal">
        <div className="facts">
          <div>
            <strong>3,000+</strong>
            <span>Players trained</span>
          </div>
          <div>
            <strong>65+</strong>
            <span>Selections in 5 years</span>
          </div>
          <div>
            <strong>13+</strong>
            <span>years of experience</span>
          </div>
          <div>
            <strong>1M+</strong>
            <span>Social community</span>
          </div>
        </div>
      </section>
      <section className="wrap coach-feature reveal">
        <div className="coach-photo">
          <Image alt="Ankit Pathak at the cricket ground" height="1023" loading="lazy" src="/assets/portrait.webp" width="952" />
          <span className="photo-credit">ANKIT PATHAK<br/>FOUNDER &amp; HEAD COACH</span>
        </div>
        <div className="coach-copy">
          <p className="eyebrow">THE COACH BEHIND THE CHANGE</p>
          <h2>Great pace starts<br/>with greater<br/>
            <span className="muted">understanding.</span>
          </h2>
          <p>13+ years of experience. A precise eye for technique. A focus on preparation and mindset. Meet the coach helping fast bowlers discover what they’re capable of.</p>
          <a className="text-link home-capsule" href="/ankit-pathak/">Meet Ankit Pathak<span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section className="wrap pathways" id="pathways">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">FIND YOUR PATH</p>
            <h2>Different starting points.<br/>One higher standard.</h2>
          </div>
        </div>
        <div className="equal-paths three-paths">
          <article className="path-card">
            <span className="eyebrow">01 / ACADEMY ADMISSION</span>
            <h3>
              <span className="brand-name">Pathak100MPH</span> admission</h3>
            <p>Start with an online assessment for academy admission.</p>
            <a className="home-capsule product-capsule" href="/assessment-trial/">Book an assessment</a>
          </article>
          <article className="path-card">
            <span className="eyebrow">02 / TRAIN FROM ANYWHERE</span>
            <h3>Online bowling training</h3>
            <p>Train where you live. Get a personal plan and regular feedback from our coaches.</p>
            <a className="home-capsule product-capsule" href="/online-training/">Explore online training</a>
          </article>
          <article className="path-card">
            <span className="eyebrow">03 / EARN SPONSORSHIP</span>
            <h3>Scholarship</h3>
            <p>Show your skills at an assessment for a chance to earn sponsored academy training.</p>
            <a className="home-capsule product-capsule" href="/scholarship/">See how to qualify</a>
          </article>
        </div>
      </section>
      <PlayerResults />
      <section className="wrap partners">
        <div className="partner-heading">
          <p className="eyebrow">OUR PARTNERS</p>
          <h2>Stronger, together.</h2>
          <p>The brands supporting our players and academy.</p>
        </div>
        <article className="partner-feature">
          <div className="partner-copy">
            <span className="eyebrow">OUR ACADEMY SPONSOR</span>
            <h3>Powered by STAG Global.</h3>
            <p>STAG Global supports our academy with cricket gear and merchandise for training and match days.</p>
            <a className="partner-visit" href="https://stag.global/" rel="noopener noreferrer" target="_blank">Explore STAG Global ↗</a>
          </div>
          <div className="partner-logo">
            <Image alt="STAG Global" loading="lazy" src="/assets/stag-global.png" width="500" height="500" />
          </div>
        </article>
        <div aria-label="Academy partners" className="partner-grid" tabIndex="0">
          <article className="partner-card">
            <div className="partner-art">
              <Image alt="Naturaltein" loading="lazy" src="/assets/naturaltein.svg" width="500" height="500" />
            </div>
            <span className="partner-role">
              <span className="brand-name">Pathak100MPH</span> NUTRITION PARTNER</span>
            <h3>Naturaltein</h3>
            <a aria-label="Code 100MPH. Visit Naturaltein" className="partner-code" href="https://naturaltein.in/" rel="noopener noreferrer" target="_blank">
              <span className="code-label">USE CODE<strong>100MPH</strong>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          </article>
          <article className="partner-card">
            <div className="partner-art">
              <Image alt="APX Collection" className="apx-logo" height="406" loading="lazy" src="/assets/apx-official.png" width="720" />
            </div>
            <span className="partner-role">
              <span className="brand-name">Pathak100MPH</span> CRICKET GEAR PARTNER</span>
            <h3>APX Collection</h3>
            <a aria-label="Code 100MPH. Visit cricket collection" className="partner-code" href="https://stag.global/collections/cricket" rel="noopener noreferrer" target="_blank">
              <span className="code-label">USE CODE<strong>100MPH</strong>
              </span>
              <b aria-hidden="true">↗</b>
            </a>
          </article>
        </div>
      </section>
      <section className="wrap">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">SOMETHING TO LOOK FORWARD TO</p>
            <h2>Your next challenge is coming.</h2>
          </div>
          <p>Follow upcoming <span className="brand-name">Pathak100MPH</span> events, competitions and opportunities to test your skills.</p>
        </div>
        <div className="events-grid">
          <article className="event speed">
            <span className="event-number">01 / UPCOMING</span>
            <div aria-hidden="true" className="speed-graphic">100<span>MPH</span>
            </div>
            <div>
              <span className="pill">COMING SOON</span>
              <h3>
                <span className="brand-name">Pathak100MPH</span>
                <br/>Speed Contest</h3>
            </div>
          </article>
          <article className="event pending">
            <span className="event-number">02 / UPCOMING</span>
            <div aria-hidden="true" className="event-orbit">
            </div>
            <div>
              <span className="pill">COMING SOON</span>
              <h3>Next event<br/>
                <span>To be announced</span>
              </h3>
            </div>
          </article>
          <article className="event pending">
            <span className="event-number">03 / UPCOMING</span>
            <div aria-hidden="true" className="event-orbit">
            </div>
            <div>
              <span className="pill">COMING SOON</span>
              <h3>Next event<br/>
                <span>To be announced</span>
              </h3>
            </div>
          </article>
        </div>
      </section>
      <section className="wrap insights">
        <div className="section-head reveal">
          <div>
            <p className="eyebrow">FROM THE COACHING DESK</p>
            <h2>A better understanding.<br/>A better game.</h2>
          </div>
          <p>Practical insights on technique, pace and performance. New perspectives every week.</p>
        </div>
        <div className="blog-grid">
          <a className="blog-card reveal" href="https://sam.harsh-4844.chatgpt.site/blogs/how-to-increase-arm-speed-in-fast-bowling/">
            <div className="blog-art art-0">
              <span>FAST.<br/>FASTER.</span>
              <b>↗</b>
            </div>
            <p className="tiny">PACE &amp; PERFORMANCE</p>
            <h3>How to Increase Arm Speed in Fast Bowling</h3>
            <p>Understand arm speed as part of your complete bowling action. Use video, a clear coaching cue and repeatable practice to guide your next step.</p>
          </a>
          <a className="blog-card reveal" href="https://sam.harsh-4844.chatgpt.site/blogs/perfect-fast-bowling-technique/">
            <div className="blog-art art-1">
              <span>THE<br/>ACTION.</span>
              <b>↗</b>
            </div>
            <p className="tiny">TECHNIQUE</p>
            <h3>Fast Bowling Technique: Understand Your Own Action</h3>
            <p>Explore run-up, alignment, front-leg movement and follow-through. Learn how to review fast bowling technique without copying a one-size-fits-all action.</p>
          </a>
          <a className="blog-card reveal" href="https://sam.harsh-4844.chatgpt.site/blogs/best-gym-workouts-for-fast-bowlers/">
            <div className="blog-art art-2">
              <span>BUILT<br/>STRONG.</span>
              <b>↗</b>
            </div>
            <p className="tiny">STRENGTH</p>
            <h3>Gym Workouts for Fast Bowlers: Plan Around Your Cricket</h3>
            <p>Understand how to discuss strength, conditioning and recovery with your coach. Build gym work around your age, training experience and cricket schedule.</p>
          </a>
        </div>
        <a className="text-link centered glass-link" href="/blogs/">Explore all insights<span aria-hidden="true">↗</span>
        </a>
      </section>
      <section className="closing wrap reveal">
        <a aria-label="Pathak100MPH home" className="closing-logo" href="/">
          <Image alt="Pathak100MPH" height="170" src="/assets/logo.webp" width="367" />
        </a>
        <h2>Your next chapter<br/>starts here.</h2>
        <p>Tell us where you are. Let’s talk about where you could go.</p>
        <div className="actions">
          <button className="button secondary" data-enquire="">Request a call back<span aria-hidden="true">↗</span>
          </button>
        </div>
      </section>
    </main>
  );
}
