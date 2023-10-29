import { Terminal, TerminalContextProvider } from "../../src/index";
import "./App.css";

function App() {
  const commands = {
    echo: (args: string) => {
      return args;
    },
    cat: (args: string) => {
      if (args === "sum.txt")
        return (
          <div>
            <span style={{ color: "lightblue" }}>def</span>{" "}
            <span style={{ color: "yellow" }}>sum</span>(a, b): <br />{" "}
            &nbsp;&nbsp;&nbsp;&nbsp;{" "}
            <span style={{ color: "pink" }}>return</span> a + b
          </div>
        );
      return "foo";
    },
  };
  return (
    <TerminalContextProvider>
      <div className="main-container">
        <Terminal prompt="~$" commands={commands} />
      </div>
    </TerminalContextProvider>
  );
}

export default App;
