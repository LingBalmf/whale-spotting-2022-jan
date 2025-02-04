import { useEffect, useState } from "react";
import { getMostRecentSighting, Sighting } from "../../../clients/apiClients";
import "./RecentSighting.scss";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export function RecentSighting() {
  const [recentSighting, setRecentSighting] = useState<Sighting>();

  useEffect(() => {
    getMostRecentSighting().then(setRecentSighting);
  }, []);

  if (recentSighting == undefined) {
    return <div> Loading ... </div>;
  } else {
    const today = new Date();
    const date2 = new Date(recentSighting.date);

    const diff = Math.abs(today.getTime() - date2.getTime());
    const diffDays = Math.ceil(diff / (1000 * 3600 * 24));

    let article;
    const l = recentSighting.species.name[0];
    if (l == "A" || l == "E" || l == "I" || l == "O" || l == "U") {
      article = "An";
    } else {
      article = "A";
    }

    return (
      <section className="recent-sighting">
        <h1 className="recent-sighting__title">Most Recent Whale Sighting</h1>
        <div className="recent-sighting__img">
          <img src={recentSighting.photoUrl}></img>
        </div>
        <section className="recent-sighting__text-container">
          <section className="recent-sighting__text recent-sighting__left">
            <p>
              {article} {recentSighting?.species.name} (Latin name:{" "}
              {recentSighting.species.latinName}) spotted{" "}
              <strong>
                {diffDays} day{diffDays != 1 ? `s` : ``}
              </strong>{" "}
              ago at {recentSighting?.location.name} by{" "}
              {recentSighting.user.username}.
            </p>
            <p className="recent-sighting__text__description">
              {" "}
              {recentSighting?.description}{" "}
            </p>
          </section>
          <section className="recent-sighting__text recent-sighting__right">
            <h2 className="recent-sighting__box-heading">
              Report your whale sighting!
            </h2>
            <Link to="/sightings/create">
              <Button
                variant="light"
                className="recent-sighting__post-sighting-button"
              >
                <img
                  src="https://freepngimg.com/download/icon/1000188-spouting-whale-emoji-free-icon-hq.png"
                  width="30"
                />
              </Button>{" "}
            </Link>
          </section>
        </section>
      </section>
    );
  }
}
