import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import TextareaAutosize from "react-textarea-autosize";
import Prompt from "./Prompt";
import { useContext, useEffect, useRef, useState } from "react";
import {
  processInBuiltCommand,
  processUserCommand,
} from "../common/CommandProcessor";
import { TerminalContext } from "../contexts/TerminalContext";
import ExchangeHistory from "./ExchangeHistory";
import { IUserCommands } from "../types/GlobalTypes";
import { appendOutput } from "../utils/Utils";

interface ITerminalProps {
  prompt?: string;
  commands?: IUserCommands;
  directoryStructure?: any;
  showTopBar?: boolean;
}

const Terminal = ({
  prompt = "user@anon:",
  commands,
  directoryStructure,
  showTopBar = true
}: ITerminalProps) => {
  const inBuiltCommands: string[] = [
    "clear",
    "echo",
    "cd",
    "ls",
    "cat",
    "pwd",
    "mkdir",
    "rm",
    "date"
  ];

  // Context
  const {
    exchangeHistory,
    setExchangeHistory,
    commandHistory,
    setCommandHistory,
    historyPointer,
    setHistoryPointer,
    pwd,
    setPwd,
  } = useContext(TerminalContext)!;

  // States
  const [promptWidth, setPromptWidth] = useState<number>();

  const [inputValue, setInputValue] = useState<string>("");

  const [prevInputValue, setPrevInputValue] = useState<string>("");

  const [structure, setStructure] = useState(directoryStructure);

  // Refs
  const promptRef = useRef<HTMLSpanElement>(null);

  const scrollDivRef = useRef<HTMLDivElement>(null);

  // Event Handlers
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (inputValue) {
        setCommandHistory((prev) => {
          return [...prev, inputValue];
        });
        const [base, ...argsArr] = inputValue.trim().split(" ");
        if (inBuiltCommands.includes(base as string)) {
          processInBuiltCommand(
            base!,
            pwd,
            argsArr,
            setExchangeHistory,
            prompt,
            setPwd,
            structure,
            setStructure
          );
        } else {
          processUserCommand(
            base!,
            argsArr,
            commands!,
            setExchangeHistory,
            pwd,
            prompt
          );
        }
      } else appendOutput(setExchangeHistory, "", "", pwd, prompt);
      setInputValue("");
      setPrevInputValue("");
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      /* If user has pressed the arrow up key and the historyPointer 
      is at commandHistory.length, save whatever is already written in 
      the input to prevInputValue. This way when the user hits the 
      arrow down key continously, and the historyPointer reaches 
      commandHistory.length again (this part is handled with the 
      last useEffect call), the inputValue will automatically change 
      to prevInputValue. */
      if (historyPointer === commandHistory.length)
        setPrevInputValue(inputValue);
      // The main ArrowUp event starts from here.
      setInputValue(commandHistory[historyPointer - 1]!);
      if (historyPointer > 0) {
        setHistoryPointer(historyPointer - 1);
      }
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      if (historyPointer < commandHistory.length) {
        setInputValue(commandHistory[historyPointer + 1]!);
        setHistoryPointer(historyPointer + 1);
      }
    }
  };

  // Effects
  useEffect(() => {
    setPromptWidth(promptRef.current?.getBoundingClientRect().width);
  }, [prompt, pwd]);

  useEffect(() => {
    scrollDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [exchangeHistory]);

  useEffect(() => {
    /* If historyPointer has reached commandHistory.length,
    set the input value to the last written command/prevInputValue.*/
    if (historyPointer === commandHistory.length) setInputValue(prevInputValue);
  }, [historyPointer]);

  useEffect(() => {
    setStructure(directoryStructure);
  }, [directoryStructure]);

  return (
    <TerminalContainer $promptWidth={promptWidth as number} $showTopBar={showTopBar}>
      {showTopBar &&  <TopBar prompt={prompt} pwd={pwd} />} 
      <label htmlFor="main-terminal-input">
        <div className="main-terminal">
          <ExchangeHistory />
          <div className="input-prompt">
            <Prompt prompt={prompt} ref={promptRef} pwd={pwd} />
            <TextareaAutosize
              style={{ padding: 0 }}
              id="main-terminal-input"
              onKeyDown={handleKeyDown}
              onChange={handleChange}
              value={inputValue}
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          <div className="scroll-div" ref={scrollDivRef} />
        </div>
      </label>
    </TerminalContainer>
  );
};

export default Terminal;
