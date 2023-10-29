import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import TextareaAutosize from "react-textarea-autosize";
import Prompt from "./Prompt";
import { useContext, useEffect, useRef, useState } from "react";
import { processCommand } from "../utils/Utils";
import { TerminalContext, ITerminalContext } from "../contexts/TerminalContext";
import ExchangeHistory from "./ExchangeHistory";
import { IExchange } from "../types/GlobalTypes";

interface ITerminalProps {
  prompt: string;
  commands: Record<string, (args: string) => React.JSX.Element | string>;
}

const Terminal = ({ prompt, commands }: ITerminalProps) => {
  // Context
  const { exchangeHistory, setExchangeHistory } = useContext(
    TerminalContext
  ) as ITerminalContext;

  // States
  const [promptWidth, setPromptWidth] = useState<number>();

  const [inputValue, setInputValue] = useState<string>();

  // Refs
  const promptRef = useRef<HTMLSpanElement>(null);

  const scrollDivRef = useRef<HTMLDivElement>(null);

  // Handles
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue)
        processCommand(inputValue, commands, setExchangeHistory, setInputValue);
      else
        setExchangeHistory((prev: IExchange[]) => {
          return [
            ...prev,
            {
              command: "",
              output: "",
            },
          ];
        });
    }
  };

  // Effects
  useEffect(() => {
    setPromptWidth(promptRef.current?.getBoundingClientRect().width);
  }, [prompt]);

  useEffect(() => {
    scrollDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [exchangeHistory]);

  return (
    <TerminalContainer $promptWidth={promptWidth as number}>
      <TopBar />
      <label htmlFor="main-terminal-input">
        <div className="main-terminal">
          <ExchangeHistory exchangeHistory={exchangeHistory} prompt={prompt} />
          <div className="input-prompt">
            <Prompt prompt={prompt} ref={promptRef} />
            <TextareaAutosize
              style={{ padding: 0 }}
              id="main-terminal-input"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={inputValue}
            />
          </div>
          <div className="scroll-div" ref={scrollDivRef} />
        </div>
      </label>
    </TerminalContainer>
  );
};

export default Terminal;
