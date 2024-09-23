import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { Home } from "./components/home";

function App() {
  // const justDoIt = () => {
  //   fetch(`http://localhost:3055/api`)
  //     .then((res) => res.json()) // Parse JSON
  //     .then((data) => setData(data.message)); // Set the message as data
  // };

  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
}

export default App;
