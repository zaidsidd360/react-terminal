import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import { useContext, useEffect, useRef, useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import ExchangeHistory from "./ExchangeHistory";
import { ITheme, IUserCommands } from "../types/GlobalTypes";
import useTheme from "../hooks/UseTheme";
import InputField from "./InputField";
import Prompt from "./Prompt";

interface ITerminalProps {
  prompt?: string;
  commands?: IUserCommands;
  directoryStructure?: any;
  showTopBar?: boolean;
  topBarHeight?: string;
  theme?: "dark" | "light" | "hacker" | ITheme;
  welcomeMessage?: string | React.JSX.Element;
  showTopBarPrompt?: boolean;
  btn1Callback?: (args: any) => any;
  btn2Callback?: (args: any) => any;
  btn3Callback?: (args: any) => any;
}

const Terminal = ({
  prompt = "user@anon:",
  commands,
  directoryStructure,
  showTopBar = true,
  topBarHeight = "8%",
  theme = "dark",
  welcomeMessage,
  showTopBarPrompt = true,
  btn1Callback,
  btn2Callback,
  btn3Callback,
}: ITerminalProps) => {
  // Context
  const { exchangeHistory, pwd } = useContext(TerminalContext)!;

  // States
  const [promptWidth, setPromptWidth] = useState<number>();
  const [structure, setStructure] = useState(directoryStructure);

  // Refs
  const promptRef = useRef<HTMLSpanElement>(null);
  const scrollDivRef = useRef<HTMLDivElement>(null);

  // Theme
  const terminalTheme = useTheme(theme);

  // Effects
  useEffect(() => {
    setPromptWidth(promptRef.current?.getBoundingClientRect().width);
  }, [prompt, pwd]);

  useEffect(() => {
    scrollDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [exchangeHistory]);

  return (
    <TerminalContainer
      $topBarHeight={topBarHeight}
      $promptWidth={promptWidth as number}
      $showTopBar={showTopBar}
      $currTheme={terminalTheme}
    >
      {showTopBar && (
        <TopBar
          btn1Callback={btn1Callback}
          btn2Callback={btn2Callback}
          btn3Callback={btn3Callback}
          topBarHeight={topBarHeight}
          prompt={prompt}
          pwd={pwd}
          terminalTheme={terminalTheme}
          showTopBarPrompt={showTopBarPrompt}
        />
      )}
      <label htmlFor="main-terminal-input">
        <div className="main-terminal">
          {welcomeMessage && welcomeMessage}
          <ExchangeHistory terminalTheme={terminalTheme} />
          <div className="input-prompt">
            <Prompt
              prompt={prompt}
              ref={promptRef}
              pwd={pwd}
              terminalTheme={terminalTheme}
            />
            <InputField
              prompt={prompt}
              pwd={pwd}
              structure={structure}
              setStructure={setStructure}
              commands={commands!}
            />
          </div>
          <div className="scroll-div" ref={scrollDivRef} />
        </div>
      </label>
    </TerminalContainer>
  );
};

export default Terminal;
