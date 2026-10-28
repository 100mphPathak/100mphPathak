import Image from "next/image";

export default function PlayerResults() {
  return (
    <section className="wrap results">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{"THE WORK SHOWS"}</p>
          <h2>{"Potential. Meet proof."}</h2>
        </div>
        <p>
          {
            "65+ selections across district, state, national and franchise cricket in just 5 years."
          }
        </p>
      </div>
      <div className="player-rail">
        <article className="player reveal">
          <div className="player-image">
            <Image
              alt="Swayam Srivastav"
              height="500"
              loading="lazy"
              src="/assets/player0.webp"
              width="500"
            />
          </div>
          <span className="tiny">{"PATHAK100MPH PLAYER"}</span>
          <h3>{"Swayam Srivastav"}</h3>
          <p>{"Odisha Pro T20 League"}</p>
        </article>
        <article className="player reveal">
          <div className="player-image">
            <Image
              alt="Vishal Thakur"
              height="500"
              loading="lazy"
              src="/assets/player1.webp"
              width="500"
            />
          </div>
          <span className="tiny">{"PATHAK100MPH PLAYER"}</span>
          <h3>{"Vishal Thakur"}</h3>
          <p>{"Ranji Trophy · Services"}</p>
        </article>
        <article className="player reveal">
          <div className="player-image">
            <Image
              alt="Hemant Dhami"
              height="500"
              loading="lazy"
              src="/assets/player2.webp"
              width="500"
            />
          </div>
          <span className="tiny">{"PATHAK100MPH PLAYER"}</span>
          <h3>{"Hemant Dhami"}</h3>
          <p>{"Nepal National Team"}</p>
        </article>
        <article className="player reveal">
          <div className="player-image">
            <Image
              alt="Akash Gautam"
              height="500"
              loading="lazy"
              src="/assets/player3.webp"
              width="500"
            />
          </div>
          <span className="tiny">{"PATHAK100MPH PLAYER"}</span>
          <h3>{"Akash Gautam"}</h3>
          <p>{"Indian Street Premier League"}</p>
        </article>
      </div>
    </section>
  );
}
