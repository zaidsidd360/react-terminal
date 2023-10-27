import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import TextareaAutosize from "react-textarea-autosize";
import Prompt from "./Prompt";
import PrevCommandsAndOutputs from "./PrevCommandsAndOutputs";
import { useEffect, useRef, useState } from "react";

const Terminal = () => {
  const prompt = "zaid@ubuntu:~$";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      console.log("Yayy! you just ran a command!!");
    }
  };

  const promptRef = useRef<HTMLSpanElement>(null);

  const [promptWidth, setPromptWidth] = useState<number>();

  useEffect(() => {
    setPromptWidth(promptRef.current?.getBoundingClientRect().width);
  }, []);

  return (
    <TerminalContainer $promptWidth={promptWidth as number}>
      <TopBar />
      <label htmlFor="main-terminal-input">
        <main>
          <PrevCommandsAndOutputs prompt={prompt} />
          <div>
            <Prompt prompt={prompt} ref={promptRef} />
            <TextareaAutosize
              style={{ padding: 0 }}
              id="main-terminal-input"
              onKeyDown={handleKeyDown}
            />
          </div>
        </main>
      </label>
    </TerminalContainer>
  );
};

export default Terminal;
