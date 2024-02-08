import TextareaAutosize from "react-textarea-autosize";
import IUserCommands from "../types/UserCommandType";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import { inBuiltCommands } from "../errors/constants";
import {
	processInBuiltCommand,
	processUserCommand,
} from "../commandProcessors/CommandProcessor";
import { appendOutput } from "../utils/Utils";
import useCaretPosition from "../hooks/UseCaretPosition";
import usePrediction from "../hooks/UsePrediction";
import PredictionSpan from "../styles/PredictionStyles";

interface InputFieldProps {
	commandPrediction: boolean;
	predictionColor: string;
	promptWidth: number;
	prompt: string;
	pwd: string;
	structure: any;
	setStructure: React.Dispatch<React.SetStateAction<any>>;
	commands: IUserCommands;
}

const InputField = ({
	commandPrediction,
	predictionColor,
	structure,
	setStructure,
	commands,
	pwd,
	prompt,
	promptWidth,
}: InputFieldProps) => {
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

	// States
	const [inputValue, setInputValue] = useState<string>("");
	const [prevInputValue, setPrevInputValue] = useState<string>("");

	// Refs
	const textAreaRef = useRef<HTMLTextAreaElement>(null);

	// Hooks
	const caretPosition = useCaretPosition(
		textAreaRef,
		promptWidth,
		inputValue
	);
	const autoCompleteValue = usePrediction(autoCompleteOptions, inputValue);

	// Event Handlers
	const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(event.target.value);
	};

	// Keyboard events
	const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (event.key === "Enter") {
			event.preventDefault();
			if (inputValue) {
				setCommandHistory((prev) => {
					return [...prev, inputValue];
				});
				const [base, ...argsArr] = inputValue.trim().split(" ");
				// TODO: Disable inbuilt commands related to directory structure.
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
				setInputValue(autoCompleteValue);
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

	return (
		<>
			<TextareaAutosize
				style={{ padding: 0 }}
				id="main-terminal-input"
				onKeyDown={handleKeyDown}
				onChange={handleChange}
				value={inputValue}
				autoComplete="off"
				spellCheck={false}
				ref={textAreaRef}
			/>
			{inputValue && inputValue.length > 0 && commandPrediction && (
				<PredictionSpan
					$caretPosition={caretPosition}
					$predictionColor={predictionColor}
				>
					{autoCompleteValue.slice(inputValue.length)}
				</PredictionSpan>
			)}
		</>
	);
};

export default InputField;
