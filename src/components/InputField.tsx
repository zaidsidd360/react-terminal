import TextareaAutosize from "react-textarea-autosize";
import IUserCommands from "../types/Commands";
import React, {
	useContext,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import { inBuiltCommands } from "../utils/constants";
import { appendOutput } from "../utils/helpers";
import usePrediction from "../hooks/UsePrediction";
import PredictionSpan from "../styles/PredictionStyles";
import useCaretPosition from "use-caret-position";
import ITheme from "../types/Theme";
import CliLoader from "./CliLoader";
import useCommandProcessor from "../hooks/UseCommandProcessor";

interface IInputFieldProps {
	commandPrediction: boolean;
	predictionColor: string;
	structure: any;
	setStructure: React.Dispatch<React.SetStateAction<any>>;
	commands: IUserCommands;
	pwd: string;
	prompt: string;
	autoCompleteAnimation: boolean;
	setTerminalTheme: React.Dispatch<React.SetStateAction<ITheme>>;
	toggleCommandState: (commandState: boolean) => void;
	asyncCommandLoader: string;
	asyncCommandLoaderSpeed: number;
}

const InputField = ({
	commandPrediction,
	predictionColor,
	structure,
	setStructure,
	commands,
	pwd,
	prompt,
	autoCompleteAnimation,
	setTerminalTheme,
	toggleCommandState,
	asyncCommandLoader,
	asyncCommandLoaderSpeed,
}: IInputFieldProps) => {
	// Contexts
	const {
		setExchangeHistory,
		commandHistory,
		setCommandHistory,
		historyPointer,
		setHistoryPointer,
		setPwd,
	} = useContext(TerminalContext)!;

	// Constants
	const autoCompleteOptions = [...Object.keys(commands), ...inBuiltCommands];
	const cliLoader = (
		<CliLoader
			loaderName={asyncCommandLoader}
			speedMultiplier={asyncCommandLoaderSpeed}
		/>
	);

	// States
	const [inputValue, setInputValue] = useState<string>("");
	const [prevInputValue, setPrevInputValue] = useState<string>("");
	const [isCommandActive, setIsCommandActive] = useState<boolean>(false);

	// Refs
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	// Hooks
	const { x, y, getPosition } = useCaretPosition(textAreaRef);
	const autoCompleteValue = usePrediction(autoCompleteOptions, inputValue);
	const { processCommand } = useCommandProcessor(
		commands,
		setExchangeHistory,
		pwd,
		prompt,
		cliLoader,
		structure,
		setStructure,
		setPwd,
		setTerminalTheme
	);

	// Event Handlers
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(event.target.value);
		getPosition(textAreaRef);
	};

	// Event key handlers

	/**
	 * Handles the Enter key press event.
	 * Processes the current input, updates command history, and clears the input field.
	 */
	const handleEnterKey = async () => {
		setIsCommandActive(true);
		if (inputValue) {
			setCommandHistory((prev) => [...prev, inputValue]);
			await processCommand(inputValue);
		} else {
			appendOutput(setExchangeHistory, "", "", pwd, prompt);
		}
		setInputValue("");
		setPrevInputValue("");
		setIsCommandActive(false);
	};

	/**
	 * Handles the Arrow Up key press event.
	 * Navigates backwards through command history.
	 */
	const handleArrowUpKey = () => {
		// Save current input when starting to navigate history
		// This allows returning to the in-progress command when navigating forward again
		if (historyPointer === commandHistory.length) {
			setPrevInputValue(inputValue);
		}
		// Move backwards in history if possible
		if (historyPointer > 0) {
			setInputValue(commandHistory[historyPointer - 1]!);
			setHistoryPointer(historyPointer - 1);
		}
	};

	/**
	 * Handles the Arrow Down key press event.
	 * Navigates forwards through command history.
	 */
	const handleArrowDownKey = () => {
		if (historyPointer < commandHistory.length) {
			setInputValue(commandHistory[historyPointer + 1]!);
			setHistoryPointer(historyPointer + 1);
		}
	};

	/**
	 * Handles the Tab key press event.
	 * Implements autocomplete functionality, with optional animation.
	 */
	const handleTabKey = () => {
		if (autoCompleteValue) {
			if (autoCompleteAnimation) {
				const extraText = autoCompleteValue.replace(inputValue, "");
				const autoCompleteArray = extraText
					.split("")
					.join(",")
					.split(",");
				autoCompleteArray.forEach((letter, i) => {
					setTimeout(() => {
						setInputValue((prev) => prev + letter);
						getPosition(textAreaRef);
					}, i * 30);
				});
			} else {
				setInputValue(autoCompleteValue);
			}
		}
	};

	// Keyboard events
	/**
	 * Main key down event handler.
	 * Delegates to specific handlers based on the key pressed.
	 * @param event - The keyboard event
	 */
	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		switch (event.key) {
			case "Enter":
				event.preventDefault();
				await handleEnterKey();
				break;
			case "ArrowUp":
				event.preventDefault();
				handleArrowUpKey();
				break;
			case "ArrowDown":
				event.preventDefault();
				handleArrowDownKey();
				break;
			case "Tab":
				event.preventDefault();
				handleTabKey();
				break;
		}
	};

	// Effects
	useEffect(() => {
		// Restore the in-progress command when navigating past the end of command history
		if (historyPointer === commandHistory.length)
			setInputValue(prevInputValue);
	}, [historyPointer]);

	useLayoutEffect(() => {
		if (textAreaRef.current) {
			getPosition(textAreaRef);
		}
	}, []);

	useEffect(() => {
		toggleCommandState(isCommandActive);
	}, [isCommandActive]);

	if (!isCommandActive)
		return (
			<div style={{ position: "relative" }}>
				<TextareaAutosize
					style={{ padding: 0 }}
					id="main-terminal-input"
					onKeyDown={handleKeyDown}
					onChange={handleChange}
					value={inputValue}
					autoComplete="off"
					spellCheck={false}
					ref={textAreaRef}
					autoFocus
				/>
				{commandPrediction && (
					<PredictionSpan
						$caretPosition={{ x, y }}
						$predictionColor={predictionColor}
					>
						{inputValue &&
							inputValue.length > 0 &&
							autoCompleteValue.slice(inputValue.length)}
					</PredictionSpan>
				)}
			</div>
		);
	return null;
};

export default InputField;
