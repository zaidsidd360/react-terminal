import { Terminal } from "../../src/index";
import "./App.css";

function App() {
  return (
    <div className="main-container">
      <Terminal
        prompt="z@id-ubuntu:"
        commands={{
          echo: (args) => {
            return args;
          },
          cat: (args) => {
            if (args === "sum.txt")
              return (
                <div>
                  def sum(a, b): <br /> &nbsp;&nbsp;&nbsp;&nbsp; return a + b
                </div>
              );
            return "foo";
          },
        }}
      />
    </div>
  );
}

export default App;
