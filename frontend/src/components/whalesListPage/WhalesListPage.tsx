import { useEffect, useState } from "react";
import "./WhalesListPage.scss";
import { fetchAllWhales, Whale } from "../../clients/apiClients";

export function WhalesListPage(): JSX.Element {
  const [whale, setWhale] = useState<Array<Whale>>([]);

  useEffect(() => {
    fetchAllWhales().then(setWhale);
  }, []);

  return (
    <main>
      <div>
        <h1>Sponsor a Whale</h1>
        {whale.map((s, i) => (
          <ul key={s.id}>
            <li>Reference id: {s.id}</li>
            <li>{s.name}</li>
            <li>{s.age}</li>
            <li>{s.description}</li>
            <li>
              <img className="whales--img" src={s.photoUrl} alt=""></img>
            </li>
            <li>{s.species.name}</li>
            {s.sponsor ? (
              <li> Adopted by: {s.sponsor.name}</li>
            ) : (
              <button
                onClick={() => {
                  alert("Button Clicked!");
                }}
                type="submit"
              >
                Sponsor {s.name}
              </button>
            )}
          </ul>
        ))}
      </div>
    </main>
  );
}
