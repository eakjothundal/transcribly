import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

import { Login } from "./components/Auth/Login";

function App() {
  return (
    <MantineProvider>
      <Login />
    </MantineProvider>
  );
}

export default App;
