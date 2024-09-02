import TextareaAutosize from "react-textarea-autosize";
import IUserCommands from "../@types/Commands";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import { inBuiltCommands } from "../errors/constants";
import {
	processInBuiltCommand,
	processUserCommand,
} from "../commandProcessors/CommandProcessor";
import { appendOutput } from "../utils/Utils";
import usePrediction from "../hooks/UsePrediction";
import PredictionSpan from "../styles/PredictionStyles";
import useCaretPosition from "use-caret-position";
import ITheme from "../@types/Theme";

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
}: IInputFieldProps) => {
	// Contexts
	const {
		exchangeHistory,
		setExchangeHistory,
		commandHistory,
		setCommandHistory,
		historyPointer,
		setHistoryPointer,
		setPwd,
	} = useContext(TerminalContext)!;

	// Constants
	const autoCompleteOptions = [...Object.keys(commands), ...inBuiltCommands];

	// States
	const [inputValue, setInputValue] = useState<string>("");
	const [prevInputValue, setPrevInputValue] = useState<string>("");
	const [isCommandActive, setIsCommandActive] = useState<boolean>(false);

	// Refs
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	// Hooks
	const { x, y, getPosition } = useCaretPosition(textAreaRef);
	const autoCompleteValue = usePrediction(autoCompleteOptions, inputValue);

	// Event Handlers
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(event.target.value);
		getPosition(textAreaRef);
	};

	// Keyboard events
	const handleKeyDown = async (
		event: React.KeyboardEvent<HTMLTextAreaElement>
	) => {
		if (event.key === "Enter") {
			event.preventDefault();
			setIsCommandActive(true);
			if (inputValue) {
				setCommandHistory((prev) => {
					return [...prev, inputValue];
				});
				const [base, ...argsArr] = inputValue.trim().split(" ");
				// TODO: Disable inbuilt commands related to directory structure if directory structure is not present.
				if (inBuiltCommands.includes(base as string)) {
					processInBuiltCommand(
						base!,
						pwd,
						argsArr,
						setExchangeHistory,
						prompt,
						setPwd,
						structure,
						setStructure,
						setTerminalTheme
					);
				} else {
					await processUserCommand(
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
			setIsCommandActive(false);
		} else if (event.key === "ArrowUp") {
			event.preventDefault();
			/* If user has pressed the arrow up key and the historyPointer
      is at commandHistory.length, save whatever is already written in
      the input to prevInputValue. This way when the user hits the
      arrow down key continously, and the historyPointer reaches
      commandHistory.length again (this part is handled with the
      last useEffect call), the inputValue will automatically change
      to prevInputValue. */
			if (historyPointer === commandHistory.length) {
				setPrevInputValue(inputValue);
			}
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
		} else if (event.key === "Tab") {
			event.preventDefault();
			if (autoCompleteValue) {
				if (autoCompleteAnimation) {
					const extraText = autoCompleteValue.replace(inputValue, "");
					const autoCompleteArray = extraText
						.split("")
						.join(",")
						.split(",");
					// Animation logic here
					autoCompleteArray.forEach((letter, i) => {
						setTimeout(() => {
							setInputValue((prev) => prev + letter);
							getPosition(textAreaRef);
						}, i * 30);
					});
				} else setInputValue(autoCompleteValue);
			}
		}
	};

	// Effects
	useEffect(() => {
		/* If historyPointer has reached commandHistory.length,
    set the input value to the last written command/prevInputValue.*/
		if (historyPointer === commandHistory.length)
			setInputValue(prevInputValue);
	}, [historyPointer]);

	useEffect(() => {
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
