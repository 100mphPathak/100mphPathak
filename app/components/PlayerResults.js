import { getContent } from "../lib/content";
import { Img, Text } from "./Text";

export default async function PlayerResults() {
  const { playerResults: r } = await getContent("global");
  return (
    <section className="wrap results">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{r.eyebrow}</p>
          <h2><Text v={r.heading} brand /></h2>
        </div>
        <p>
          {r.text}
        </p>
      </div>
      <div aria-label="Player results" className="player-rail" id="player-results" tabIndex="0">
        {r.players.map((player, i) => (
          <article className="player" key={i}>
            <div className="player-image">
              {/* Eager: lazy images inside a sideways scroller load late on phones and show blank while swiping. */}
              <Img v={player.photo} loading="eager" sizes="(max-width: 760px) 290px, 25vw" />
            </div>
            <span className="tiny"><Text v={player.tag} brand /></span>
            <h3>{player.name}</h3>
            <p>{player.team}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
