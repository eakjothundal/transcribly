import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${process.env.API}/api`)
      .then((res) => res.json()) // Parse JSON
      .then((data) => setData(data.message)); // Set the message as data
  }, []);

  return (
    <div>
      <h1>Message from backend:</h1>
      {data ? <p>{data}</p> : <p>Loading...</p>}
    </div>
  );
}

export default App;
