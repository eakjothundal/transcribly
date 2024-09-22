import { Button } from "@/components/ui/button";
import { summarizeAndTranscribe } from "./utils/summarize/summarize";

function App() {
  return (
    // FIXME: shadcn component styles not working
    <Button variant="default" onClick={summarizeAndTranscribe}>
      Lets Go!
    </Button>
  );
}

export default App;
