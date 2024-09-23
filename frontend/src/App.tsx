import { useState } from "react";
import Markdown from "react-markdown";

function App() {
  const [data, setData] = useState(null);

  const justDoIt = () => {
    fetch(`http://localhost:3055/api`)
      .then((res) => res.json()) // Parse JSON
      .then((data) => setData(data.message)); // Set the message as data
  };

  return (
    <div>
      <button onClick={justDoIt}>Just Do It</button>

      {data ? <Markdown>{data}</Markdown> : <p>Loading...</p>}
    </div>
  );
}

export default App;
