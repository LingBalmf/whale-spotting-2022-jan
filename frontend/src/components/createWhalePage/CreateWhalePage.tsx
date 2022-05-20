import React, { useState, FormEvent, useEffect, useContext } from "react";
import { format, parse } from "date-fns";
import {
  createWhale,
  fetchAllWhales,
  Species,
  fetchSpecies,
} from "../../clients/apiClients";
import { LoginContext } from "../login/LoginManager";
import "./CreateWhalePage.scss";
import { Link } from "react-router-dom";

type FromStatus = "READY" | "SUBMITTING" | "ERROR" | "FINISHED";

export function CreateWhalePage(): JSX.Element {
  const [speciesList, setSpeciesList] = useState<Species[]>([]);
  const [speciesId, setSpeciesId] = useState<number>();
  const [name, setName] = useState("");
  const [registeredDate, setregisteredDate] = useState<Date>(new Date());
  const [age, setAge] = useState<number>();
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [status, setStatus] = useState<FromStatus>("READY");
  const { username, password } = useContext(LoginContext);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();
    setStatus("SUBMITTING");
    if (!speciesId || !age) {
      setStatus("ERROR");
      return;
    }
    createWhale(
      {
        name,
        registeredDate,
        age,
        description,
        photoUrl,
        speciesId,
      },
      username,
      password
    )
      .then(() => setStatus("FINISHED"))
      .catch(() => setStatus("ERROR"));
  };

  useEffect(() => {
    fetchSpecies().then((response) => setSpeciesList(response));
  }, []);

  const handleSpeciesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSpeciesId(Number(event.target.value));
  };

  return (
    <main className="createSpecies">
      <div className="createSpecies__header">
        <h1>Create Whale</h1>
      </div>

      <form onSubmit={submitForm}>
        <div className="createSpecies__form">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            placeholder="Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <label htmlFor="registeredDate">Registered Date</label>
          <input
            id="registeredDate"
            type="date"
            value={format(registeredDate, "yyyy-MM-dd")}
            onChange={(event) =>
              setregisteredDate(
                parse(event.target.value, "yyyy-MM-dd", new Date())
              )
            }
          />
          <label htmlFor="Species">Species</label>
          <select id="species" onChange={(e) => handleSpeciesChange(e)}>
            <option selected disabled>
              Select Species
            </option>
            {speciesList.map((species) => (
              <option key={species.id} value={species.id}>
                {species.name}
              </option>
            ))}
          </select>

          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="Describe whale"
            rows={3}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          <label htmlFor="photo">Photo</label>
          <input
            id="photo"
            placeholder="Photo URL"
            value={photoUrl}
            onChange={(event) => setPhotoUrl(event.target.value)}
          />
          <label></label>
          <button
            className="createSpecies__button btn btn-primary"
            disabled={status === "SUBMITTING"}
            type="submit"
          >
            Create Whale
          </button>
          {status === "ERROR" ? (
            <div className="createSpecies__error">
              <p>ERROR: Please make sure all fields have been filled in</p>
            </div>
          ) : (
            <></>
          )}
          {status === "FINISHED" ? (
            <div className="createSpecies__success">
              Form submitted successfully.&ensp;
              <Link to="/whales">Go to Meet the Whales</Link>
            </div>
          ) : (
            <></>
          )}
        </div>
      </form>
    </main>
  );
}
