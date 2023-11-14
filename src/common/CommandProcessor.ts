import { SetStateAction } from "react";
import { IExchange, IUserCommands } from "../types/GlobalTypes";
import { argsNotReqd, argsReqd, commandNotFound, tooManyArgs } from "./Errors";
import { cat, cd, getPwd, ls, mkdir, rm } from "./InBuiltCommandsHandlers";
import { appendError, appendOutput, trim } from "../utils/Utils";

//
// HANDLES USER DEFINED COMMANDS
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//
export const processUserCommand = (
  base: string,
  argsArr: string[],
  commands: IUserCommands,
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  pwd: string,
  prompt: string
) => {
  const args = argsArr.join(" ");
  const fullCommand = `${base} ${args}`;
  if (commands[base]) {
    const executor = commands[base];
    if (typeof executor === "function") {
      appendOutput(
        setExchangeHistory,
        executor(args) as string | React.JSX.Element,
        fullCommand,
        pwd,
        prompt
      );
    }
  }
  //
  // HANDLES UNIDENTIFIED COMMANDS
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //
  else
    setExchangeHistory((prev) => {
      return [
        ...prev,
        {
          command: fullCommand,
          output: commandNotFound(base),
          prompt: prompt,
          pwd: pwd,
        },
      ];
    });
};

//
// HANDLES BUILT IN COMMANDS
// ^^^^^^^^^^^^^^^^^^^^^^^^^
//
export const processInBuiltCommand = (
  base: string,
  pwd: string,
  argsArr: string[],
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  prompt: string,
  setPwd: React.Dispatch<React.SetStateAction<string>>,
  structure: any,
  setStructure: React.Dispatch<React.SetStateAction<any>>
) => {
  const args = argsArr.join(" ");
  const fullCommand = `${base} ${args}`;
  // Handle clear //
  if (base === "clear") {
    if (args.length !== 0) {
      appendError(
        setExchangeHistory,
        argsNotReqd(base),
        fullCommand,
        pwd,
        prompt
      );
    } else setExchangeHistory([]); // Clears the terminal exchange history
  } else if (base === "echo") {
    // TODO: Handle case for strings passed with "" & ''.
    appendOutput(setExchangeHistory, args, fullCommand, pwd, prompt);
  }
  // Handle cd //
  else if (base === "cd") {
    if (argsArr.length > 1) {
      appendError(
        setExchangeHistory,
        tooManyArgs(base),
        fullCommand,
        pwd,
        prompt
      );
    } else if (argsArr.length < 1) {
      appendOutput(setExchangeHistory, args, fullCommand, pwd, prompt);
    } else
      cd(
        pwd,
        prompt,
        setPwd,
        argsArr,
        structure,
        setExchangeHistory,
        fullCommand
      );
  }
  // Handle ls //
  else if (base === "ls") {
    if (argsArr.length > 1) {
      appendError(
        setExchangeHistory,
        tooManyArgs(base),
        fullCommand,
        pwd,
        prompt
      );
    } else ls(setExchangeHistory, argsArr, structure, pwd, prompt, fullCommand);
  }
  // Handle cat //
  else if (base === "cat") {
    if (argsArr.length > 1) {
      appendError(
        setExchangeHistory,
        tooManyArgs(base),
        fullCommand,
        pwd,
        prompt
      );
    } else if (argsArr.length < 1) {
      appendError(
        setExchangeHistory,
        argsReqd(base, "YOUR-FILE-NAME"),
        fullCommand,
        pwd,
        prompt
      );
    } else
      cat(setExchangeHistory, pwd, prompt, fullCommand, argsArr, structure);
  }
  // Handle pwd //
  else if (base === "pwd") {
    if (argsArr.length !== 0) {
      appendError(
        setExchangeHistory,
        argsNotReqd(base),
        fullCommand,
        pwd,
        prompt
      );
    } else getPwd(pwd, prompt, setExchangeHistory);
  }
  // Handle mkdir //
  else if (base === "mkdir") {
    if (argsArr.length > 1) {
      appendError(
        setExchangeHistory,
        tooManyArgs(base),
        fullCommand,
        pwd,
        prompt
      );
    } else if (argsArr.length < 1) {
      appendError(
        setExchangeHistory,
        argsReqd(base, "NEW-DIR-NAME"),
        fullCommand,
        pwd,
        prompt
      );
    } else
      mkdir(
        setExchangeHistory,
        pwd,
        prompt,
        argsArr,
        structure,
        fullCommand,
        setStructure
      );
  }
  // Handle rm //
  else if (base === "rm") {
    if (argsArr.length > 1) {
      appendError(
        setExchangeHistory,
        tooManyArgs(base),
        fullCommand,
        pwd,
        prompt
      );
    } else if (argsArr.length < 1) {
      appendError(
        setExchangeHistory,
        argsReqd(base, "YOUR-FILE/DIR"),
        fullCommand,
        pwd,
        prompt
      );
    } else
      rm(
        setExchangeHistory,
        argsArr,
        pwd,
        prompt,
        structure,
        setStructure,
        fullCommand
      );
  }
};
