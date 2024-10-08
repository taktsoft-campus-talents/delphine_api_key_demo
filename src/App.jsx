import { useEffect, useState } from "react";

import "./App.css";

// Notes:
// 1. You can save the API key in a .env file for learning purposes if it's a free API.
//    However, someone might be able to access the API key, which could result in costs.
// 2. Always exclude the .env file from git by adding it to the .gitignore file.
// 3. If you're using Vite to set up the project, keep in mind that all .env variables must begin with VITE_.
// 4. Always write .env variables in capital letters, like VITE_API_KEY.
// 5. Don’t forget to include an empty array in your initial state (like birds in this example),
//    or use a ternary operator as shown in the comments below.

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
