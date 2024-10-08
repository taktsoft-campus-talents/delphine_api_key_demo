import { useEffect, useState } from "react";

import "./App.css";

// Notes:
// 1. You can save API KEY in .env file for learning purposes and if's free API.
//  Someone may be able to access API KEY here and it may cost money.
// 2. Always exclude .env file from git by adding it in gitignore file.
// 3. If you use Vite to setup the project, then keep in mind that all .env variables should begin with VITE_
// 4. Always write .env variable with capital letters like this VITE_API_KEY
// 5. Don'f forget to include empty array in your initial data state (like birds in this example)
//  or use ternary operator like below in comments

function App() {
  const API_KEY = import.meta.env.VITE_API_KEY;

  const [birds, setBirds] = useState([]);

  useEffect(() => {
    async function fetchBirds() {
      try {
        const response = await fetch(
          "https://api.ebird.org/v2/data/obs/KZ/recent",
          {
            headers: {
              "X-eBirdApiToken": API_KEY,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setBirds(data);
        } else {
          console.error("Response status", response.status);
        }
      } catch (err) {
        console.error("Something severe happened", err);
      }
    }

    fetchBirds();
  }, []);

  return (
    <>
      <h1>Birds Name</h1>
      <ul>
        {birds.map((bird) => (
          <li key={bird.comName}> {bird.comName} </li>
        ))}

        {/* {birds ? birds.map((bird) => (
          <li key={bird.comName}> {bird.comName} </li>
        )) : <li>Loading...</li>} */}
      </ul>
    </>
  );
}

export default App;
