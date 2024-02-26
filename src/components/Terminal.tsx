import TopBar from "./TopBar";
import { TerminalContainer } from "../styles/TerminalStyles";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import ExchangeHistory from "./ExchangeHistory";
import IUserCommands from "../types/UserCommandType";
import ITheme from "../types/ThemeType";
import useTheme from "../hooks/UseTheme";
import InputField from "./InputField";
import Prompt from "./Prompt";

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
	btn1Callback?: (args: any) => any;
	btn2Callback?: (args: any) => any;
	btn3Callback?: (args: any) => any;
}

const Terminal = (props: ITerminalProps): React.JSX.Element => {
	const {
		prompt = "user@anon:",
		commands,
		directoryStructure,
		height = "50vh",
		width = "40vw",
		borderRadius = "1rem",
		commandPrediction = false,
		showTopBar = true,
		topBarHeight = "8%",
		theme = "dark",
		welcomeMessage = "",
		showTopBarPrompt = true,
		btn1Callback,
		btn2Callback,
		btn3Callback,
	} = props;

	// Context
	const { exchangeHistory, pwd, commandHistory, welcomeMessageCallback } =
		useContext(TerminalContext)!;

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
						<Prompt
							prompt={prompt}
							ref={promptRef}
							pwd={pwd}
							terminalTheme={terminalTheme}
						/>
						<InputField
							predictionColor={terminalTheme.predictionColor}
							commandPrediction={commandPrediction}
							promptWidth={promptWidth!}
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
