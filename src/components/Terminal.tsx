import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import TextareaAutosize from "react-textarea-autosize";
import Prompt from "./Prompt";
import PrevCommandsAndOutputs from "./PrevCommandsAndOutputs";
import { useEffect, useRef, useState } from "react";
import { processCommand } from "../utils/Utils";

interface TerminalProps {
  prompt: string;
  commands: Record<string, (args: string) => React.JSX.Element | string>;
}

const Terminal = ({ prompt, commands }: TerminalProps) => {
  const [promptWidth, setPromptWidth] = useState<number>();

  const [inputValue, setInputValue] = useState<string>();

  const [dummyPrevCommandsAndOutputs, setDummyPrevCommandsAndOutputs] =
    useState<
      {
        command: string;
        output: string | React.JSX.Element;
      }[]
    >([]);

  const promptRef = useRef<HTMLSpanElement>(null);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  var cursorPos = 0;

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    console.log(cursorPos);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue)
        processCommand(
          inputValue,
          commands,
          setDummyPrevCommandsAndOutputs,
          setInputValue
        );
    }
  };

  useEffect(() => {
    setPromptWidth(promptRef.current?.getBoundingClientRect().width);
  }, []);

  return (
    <TerminalContainer $promptWidth={promptWidth as number}>
      <TopBar />
      <label htmlFor="main-terminal-input">
        <main>
          <PrevCommandsAndOutputs
            dummyPrevCommandsAndOutputs={dummyPrevCommandsAndOutputs}
            prompt={prompt}
          />
          <div>
            <Prompt prompt={prompt} ref={promptRef} />
            {/* <span id="caret"></span> */}
            <TextareaAutosize
              style={{ padding: 0 }}
              id="main-terminal-input"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={inputValue}
              ref={textAreaRef}
            />
          </div>
        </main>
      </label>
    </TerminalContainer>
  );
};

export default Terminal;
