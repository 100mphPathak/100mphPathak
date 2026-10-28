import { getContent } from "./lib/content";
import { Img } from "./content/text";

export default async function PlayerResults() {
  const { playerResults: r } = await getContent("global");
  return (
    <section className="wrap results">
      <div className="section-head reveal">
        <div>
          <p className="eyebrow">{r.eyebrow}</p>
          <h2>{r.heading}</h2>
        </div>
        <p>
          {r.text}
        </p>
      </div>
      <div className="player-rail">
        {r.players.map((player, i) => (
          <article className="player reveal" key={i}>
            <div className="player-image">
              <Img v={player.photo} loading="lazy" />
            </div>
            <span className="tiny">{player.tag}</span>
            <h3>{player.name}</h3>
            <p>{player.team}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
