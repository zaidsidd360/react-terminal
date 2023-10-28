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

const PrevCommandsAndOutputs = ({
  dummyPrevCommandsAndOutputs,
  prompt,
}: {
  dummyPrevCommandsAndOutputs: {
    command: string;
    output: string | React.JSX.Element;
  }[];
  prompt: string;
}) => {
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
