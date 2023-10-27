import React from "react";
import Prompt from "./Prompt";
import styled from "styled-components";

const CommandAndOutput = ({ prev, prompt }: any) => {
  return (
    <>
      <CommandAndOutputContainer>
        <Prompt prompt={prompt} unsetPosition />
        <span id="command">{prev.command}</span>
      </CommandAndOutputContainer>
      <span>{prev.output}</span>
    </>
  );
};

const CommandAndOutputContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  span {
    margin-block: 0.5rem;
  }

  #command {
    margin-left: 5px;
  }
`;

const PrevCommandsAndOutputs = ({ prompt }: { prompt: string }) => {
  /* Once the component is ready, 
  prevCommandsAndOutputs should be fetched 
  from the global TerminalContextProvider. */
  const dummyPrevCommandsAndOutputs = [
    {
      command: "whoami",
      output: "hacker@anonymous",
    },
    {
      command: "cat test.py",
      output: 'print("Hello World!")',
    },
    {
      command: "echo hello world",
      output: "hello world",
    },
  ];
  return (
    <div>
      {dummyPrevCommandsAndOutputs.map((prev) => {
        return <CommandAndOutput prev={prev} prompt={prompt} />;
      })}
    </div>
  );
};

const CommandsAndOutputsContainer = styled.div`
  p {
    margin-block: 0;
  }
`;

export default PrevCommandsAndOutputs;
