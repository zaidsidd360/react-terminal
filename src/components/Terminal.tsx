import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import { useContext, useEffect, useRef, useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import ExchangeHistory from "./ExchangeHistory";
import IUserCommands from "../@types/Commands";
import ITheme from "../@types/Theme";
import useTheme from "../hooks/UseTheme";
import InputField from "./InputField";
import Prompt from "./Prompt";
import usePromptWidth from "../hooks/UsePromptWidth";

interface ITerminalProps {
	prompt?: string;
	commands?: IUserCommands;
	directoryStructure?: any;
	height?: string;
	width?: string;
	borderRadius?: string;
	commandPrediction?: boolean;
	showTopBar?: boolean;
	topBarHeight?: string;
	theme?: "dark" | "light" | "hacker" | ITheme;
	welcomeMessage?: string | React.JSX.Element;
	showTopBarPrompt?: boolean;
	autoCompleteAnimation?: boolean;
	btn1Callback?: (args: any) => any;
	btn2Callback?: (args: any) => any;
	btn3Callback?: (args: any) => any;
	asyncCommandLoader?: string;
	asyncCommandLoaderSpeed?: number;
}

const Terminal = ({
	prompt = "user@anon:",
	commands,
	directoryStructure,
	height = "100%",
	width = "100%",
	borderRadius = "0.7rem",
	commandPrediction = false,
	showTopBar = true,
	topBarHeight = "8%",
	theme = "dark",
	welcomeMessage = "",
	showTopBarPrompt = true,
	autoCompleteAnimation = false,
	btn1Callback,
	btn2Callback,
	btn3Callback,
	asyncCommandLoader = "aesthetic2",
	asyncCommandLoaderSpeed = 0.5,
}: ITerminalProps) => {
	// Context
	const { exchangeHistory, pwd, commandHistory, welcomeMessageCallback } =
		useContext(TerminalContext)!;

	// States
	const [structure, setStructure] = useState(directoryStructure);
	const [isCommandActive, setIsCommandActive] = useState<boolean>(false);

	// Refs
	const scrollDivRef = useRef<HTMLDivElement>(null);

	// Hooks
	const { promptWidth, promptRef } = usePromptWidth(prompt!, pwd);

	// Theme
	const [terminalTheme, setTerminalTheme] = useTheme(theme);

	const toggleCommandState = (commandState: boolean) => {
		setIsCommandActive(commandState);
	};

	// Effects
	useEffect(() => {
		scrollDivRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [exchangeHistory]);

	useEffect(() => {
		if (commandHistory.length == 0) {
			welcomeMessageCallback(welcomeMessage);
		}
	}, []);

	return (
		<TerminalContainer
			$topBarHeight={topBarHeight}
			$promptWidth={promptWidth as number}
			$showTopBar={showTopBar}
			$currTheme={terminalTheme}
			$height={height}
			$width={width}
			$borderRadius={borderRadius}
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
					<ExchangeHistory terminalTheme={terminalTheme} />
					<div className="input-prompt">
						{!isCommandActive && (
							<Prompt
								prompt={prompt}
								ref={promptRef}
								pwd={pwd}
								terminalTheme={terminalTheme}
							/>
						)}
						<InputField
							predictionColor={terminalTheme.predictionColor}
							commandPrediction={commandPrediction}
							prompt={prompt}
							pwd={pwd}
							structure={structure}
							setStructure={setStructure}
							commands={commands!}
							autoCompleteAnimation={autoCompleteAnimation}
							setTerminalTheme={setTerminalTheme}
							toggleCommandState={toggleCommandState}
							asyncCommandLoader={asyncCommandLoader}
							asyncCommandLoaderSpeed={asyncCommandLoaderSpeed}
						/>
					</div>
					<div className="scroll-div" ref={scrollDivRef} />
				</div>
			</label>
		</TerminalContainer>
	);
};

export default Terminal;
