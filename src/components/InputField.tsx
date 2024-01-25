import TextareaAutosize from "react-textarea-autosize";
import IUserCommands from "../types/UserCommandType";
import React, { useContext, useEffect, useRef, useState } from "react";
import { TerminalContext } from "../contexts/TerminalContext";
import { inBuiltCommands } from "../common/constants";
import {
  processInBuiltCommand,
  processUserCommand,
} from "../common/CommandProcessor";
import { appendOutput } from "../utils/Utils";

interface InputFieldProps {
  prompt: string;
  pwd: string;
  structure: any;
  setStructure: React.Dispatch<React.SetStateAction<any>>;
  commands: IUserCommands;
}

const InputField = ({
  structure,
  setStructure,
  commands,
  pwd,
  prompt,
}: InputFieldProps) => {
  const {
    setExchangeHistory,
    commandHistory,
    setCommandHistory,
    historyPointer,
    setHistoryPointer,
    setPwd,
  } = useContext(TerminalContext)!;

  // States
  const [inputValue, setInputValue] = useState<string>("");
  const [prevInputValue, setPrevInputValue] = useState<string>("");
  const [caretPos, setCaretPos] = useState<{ x: number, y: number }>();

  // Refs
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // Event Handlers
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
    // const textArea = textAreaRef.current
    // if (textArea) {

    // }
    const caretPosition = textAreaRef.current?.selectionStart;
    const rect = textAreaRef.current?.getBoundingClientRect();
    setCaretPos({
      x: rect!.left - caretPosition!,
      y: rect!.top - caretPosition!
    })
    console.log(caretPos)
    // console.log('Caret position:', caretPosition);
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
      // A very naive implementation for autocompletion of commands.

      /* TODO: Somehow add a suggestion thing (this should happen every inputValue.OnChange) for 
      commands which allows users to see the suggested command before deciding to opt for autocompletion. */

      // UPDATE: This is wayy more complicated than I had previously thought. 💀

      event.preventDefault();
      Object.keys(commands).forEach((command) => {
        if (command.slice(0, inputValue.length) === inputValue)
          setInputValue(command);
      });
    }
  };

  // Effects
  useEffect(() => {
    /* If historyPointer has reached commandHistory.length,
    set the input value to the last written command/prevInputValue.*/
    if (historyPointer === commandHistory.length) setInputValue(prevInputValue);
  }, [historyPointer]);

  return (
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
  );
};
export default InputField;
