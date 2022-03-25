import React, { useState, FormEvent } from "react";
import { format, parse } from "date-fns";

export function CreateSightingPage(): JSX.Element {
  const [date, setDate] = useState<Date>(new Date());
  const [location, setLocation] = useState("");
  const [species, setSpecies] = useState<string>("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [userId, setUserId] = useState("");

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
  };

  const whales = ["Orca", "Blue Whale", "Humpback Whale"];
  const locations = ["Cambridge", "Mount Everest", "North Pole"];

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpecies(event.target.value);
  };
  const handleLocationChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setLocation(event.target.value);
  };

  return (
    <main>
      <h1>Report a Sighting!</h1>
      <form onSubmit={submitForm}>
        <label htmlFor="date">
          Date
          <input
            type="date"
            value={format(date, "yyyy-MM-dd")}
            onChange={(event) =>
              setDate(parse(event.target.value, "yyyy-MM-dd", new Date()))
            }
          />
        </label>
        <label>
          Location
          <select onChange={(e) => handleLocationChange(e)}>
            <option selected disabled>
              Choose one
            </option>
            {locations.map((location, key) => (
              <option key={key} value={key}>
                {location}
              </option>
            ))}
          </select>
        </label>
        <label>
          Whale Type
          <select onChange={(e) => handleSpeciesChange(e)}>
            <option selected disabled>
              Choose one
            </option>
            {whales.map((whale, key) => (
              <option key={key} value={key}>
                {whale}
              </option>
            ))}
          </select>
        </label>
        <div></div>
        <label>
          Description
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </label>
        <label>
          Photo
          <input
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
        </label>
        <button type="submit">Create Sighting</button>
      </form>
    </main>
  );
}