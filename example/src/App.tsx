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
      else return "";
    },
    gii: (
      <>
        <div>hii</div>
      </>
    ),
    "foo bar": () => {
      window.alert("hellooooo");
      return "";
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
        content: "This is the content for file1 in the <public> directory" 
        // "The is the content for file1 in the <public> directory."
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

  const btn1Callback = () => {
    alert("Hello this is from the button 1")
  }
  
  
  const btn2Callback = () => {
    alert("Hello this is from the button 2")
  }

  const btn3Callback = () => {
    alert("Hello this is from the button 3")
  }

  return (
    <TerminalContextProvider>
      <div className="main-container">
        <Terminal
          btn2Callback={btn2Callback}
          btn3Callback={btn3Callback}
          btn1Callback={btn1Callback}
          commands={commands}
          showTopBar={true}
          directoryStructure={structure}
          prompt="zaid@F571LH:"
          topBarHeight="8%"
        />
      </div>
    </TerminalContextProvider>
  );
}

export default App;
