import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "@mantine/dropzone/styles.css";

// import { Home } from "./components/Home";
import { Login } from "./components/Login";

function App() {
  return (
    <MantineProvider>
      {/* <Home /> */}
      <Login />
    </MantineProvider>
  );
}

export default App;
