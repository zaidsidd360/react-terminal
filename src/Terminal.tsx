import { FormEvent, useEffect, useRef } from "react";
import { TerminalContainer } from "./TerminalStyles";
import TextareaAutosize from "react-textarea-autosize";

const Terminal = () => {
  /* Once the component is ready, 
  prevCommandsAndOutputs should be fetched 
  from the global TerminalContextProvider. */
  const dummyPrevCommandsAndOutputs = [
    {
      command: "whoami",
      output: "hacker@anonymous",
    },
    {
      command: "help",
      output: "lorem ipsum dolor sit amet tempor incididunt ut labore et",
    },
    {
      command: "cat test.py",
      output: 'print("Hello World!")',
    },
  ];

  const prompt = "zaid@zaid-F571LH:~$";

  return (
    <TerminalContainer>
      <header>
        <span id="btn-red" />
        <span id="btn-yellow" />
        <span id="btn-green" />
      </header>
      <label htmlFor="main-terminal-input">
        <main>
          <div>
            <p>{prompt}</p>
            <TextareaAutosize id="main-terminal-input" />
          </div>
        </main>
      </label>
    </TerminalContainer>
  );
};

export default Terminal;
