import { Terminal, TerminalContextProvider } from "../../src/index";
import "./App.css";

function App() {
  const commands = {
    bat: (args: string) => {
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

  const structure = {
    ".hidden": {
      file1: {
        content: "The is the content for file1 in the <.hidden> directory.",
      },
      file2: {
        content: "The is the content for file2 in the <.hidden> directory.",
      },
      dir2: {
        file: {
          content:
            "The is the content for <file> in the <.hidden/dir2> directory.",
        },
      },
      ".secrets": { content: "I'm still afraid of the dark..." },
    },
    public: {
      file1: {
        content: "The is the content for file1 in the <public> directory.",
      },
      file2: {
        content: "The is the content for file2 in the <public> directory.",
      },
      file3: {
        content: "The is the content for file3 in the <public> directory.",
      },
    },
    "README.md": {
      content:
        "✌⊂(✰‿✰)つ✌ Thanks for checking out the tool! There is a lot that you can do with react-bash and I'm excited to see all of the fun commands and projects build on top of it!",
    },
  };
  return (
    <TerminalContextProvider>
      <div className="main-container">
        <Terminal commands={commands} directoryStructure={structure} />
      </div>
    </TerminalContextProvider>
  );
}

export default App;
