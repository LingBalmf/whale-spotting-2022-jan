import { type } from "os";
import React, { useContext, useEffect, useState } from "react";
import "./SightingListPage.scss";
import { Link } from "react-router-dom";

export interface Species {
  name: string;
  latinName: string;
}

export interface Location {
  name: string;
}

export interface User {
  name: string;
  username: string;
}

export interface Sighting {
  id: number;
  date: Date;
  location: Location;
  description: string;
  species: Species;
  photoUrl: string;
  user: User;
}

export async function fetchSightings(): Promise<Array<Sighting>> {
  return Promise.resolve([
    {
      id: 1,
      date: new Date(),
      description: "Sighting 1",
      species: { name: "aaa", latinName: "bbb" },
      location: { name: "Cardiff" },
      photoUrl:
        "https://cdn.britannica.com/37/75637-050-B425E8F1/Killer-whale.jpg",
      user: { name: "Ija", username: "IjaSap" },
    },
    {
      id: 2,
      date: new Date(),
      description: "Sighting 2",
      species: { name: "aaa", latinName: "bbb" },
      location: { name: "Edinburg" },
      photoUrl:
        "https://static.independent.co.uk/2022/02/06/08/newFile.jpg?quality=75&width=982&height=726&auto=webp",
      user: { name: "Zuhal", username: "ZuhKur" },
    },
    {
      id: 3,
      date: new Date(),
      description: "Sighting 3",
      species: { name: "whale shark", latinName: "Rhincodon typus" },
      location: { name: "Edinburg" },
      photoUrl:
        "https://i.natgeofe.com/n/a7928401-ba65-4d1a-a1fb-138621d18c13/3636516_3x2.jpg",
      user: { name: "Zuhal", username: "ZuhKur" },
    },
  ]);
}

export function SightingListPage(): JSX.Element {
  const [sightings, setSightings] = useState<Array<Sighting>>([]);
  console.log("inside SightingListPage");
  useEffect(() => {
    fetchSightings().then(setSightings);
  }, []);

  return (
    <>
      <h1 className="title">Sightings</h1>
      <ul className="sighting_list">
        {sightings.map((s, i) => (
          <li className="sighting_list_item" key={i}>
            <div className="sighting">
              <h2>{s.description}</h2>

              <img
                src={s.photoUrl}
                alt={s.description}
                width="200"
                height="100"
              />

              <div className="sighting_info">
                <p>
                  Species: {s.species.name} ({s.species.latinName})
                </p>
                <p>Sighting Location: {s.location.name}</p>
                <p>On: {s.date.toDateString()}</p>
                <p>
                  Seen by: {s.user.name} ({s.user.username})
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}