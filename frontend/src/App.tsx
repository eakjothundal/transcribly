import { useState } from "react";
import { Button } from "./components/ui/button";
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
      <Button onClick={justDoIt}>Just Do It</Button>

      <h1>Message from backend:</h1>
      {data ? <Markdown>{data}</Markdown> : <p>Loading...</p>}
    </div>
  );
}

export default App;
