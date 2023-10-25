import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import TextareaAutosize from "react-textarea-autosize";
import Prompt from "./Prompt";
import PrevCommandsAndOutputs from "./PrevCommandsAndOutputs";

const Terminal = () => {
  const prompt = "zaid@zaid-F571LH:~$";

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  return (
    <TerminalContainer>
      <TopBar />
      <label htmlFor="main-terminal-input">
        <main>
          <PrevCommandsAndOutputs />
          <div>
            <Prompt prompt={prompt} />
            <TextareaAutosize
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
