import React from "react";
import Prompt from "./Prompt";

const PrevCommandsAndOutputs = () => {
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
  return (
    <div>
      {dummyPrevCommandsAndOutputs.map((prev) => {
        return (
          <>
            <div
              style={{ display: "flex", alignItems: "center", width: "100%" }}
            >
              <p style={{ color: "#00cd49", marginRight: "0.5rem" }}>
                {"zaid@zaid-F571LH:~$"}
              </p>
              {prev.command}
            </div>
            <p>{prev.output}</p>
          </>
        );
      })}
    </div>
  );
};

export default PrevCommandsAndOutputs;
