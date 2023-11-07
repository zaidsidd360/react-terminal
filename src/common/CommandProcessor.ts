import { SetStateAction } from "react";
import { IExchange, IMultiStepCommand } from "../types/GlobalTypes";
import { argsNotReqd, argsReqd, commandNotFound, tooManyArgs } from "./Errors";
import { cat, cd, getPwd, ls, mkdir, rm } from "./InBuiltCommandsHandlers";
import { appendError, appendOutput, trim } from "../utils/Utils";

export const processCommand = (
  base: string,
  argsArr: string[],
  commands: Record<
    string,
    | string
    | React.JSX.Element
    | ((args: string) => React.JSX.Element | string | void)
    | (() => void)
    | IMultiStepCommand[]
  >,
  inBuiltCommands: string[],
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  pwd: string,
  setPwd: React.Dispatch<React.SetStateAction<string>>,
  structure: any,
  setStructure: React.Dispatch<React.SetStateAction<any>>,
  terminalPrompt: string
) => {
  const args = argsArr.join(" ");
  const fullCommand = `${base} ${args}`;
  //
  // HANDLES USER DEFINED COMMANDS
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //
  if (commands[base]) {
    const executor = commands[base];
    if (typeof executor === "function") {
      appendOutput(
        setExchangeHistory,
        executor(args) as string | React.JSX.Element,
        fullCommand,
        pwd,
        terminalPrompt
      );
    } else {
      appendOutput(
        setExchangeHistory,
        executor as string | React.JSX.Element,
        fullCommand,
        pwd,
        terminalPrompt
      );
    }
    // typeof executor === "function" &&
    //   setExchangeHistory((prev) => {
    //     return [
    //       ...prev,
    //       {
    //         command: fullCommand,
    //         output: executor(args) as string | React.JSX.Element,
    //         pwd, terminalPrompt: pwd, terminalPrompt,
    //       },
    //     ];
    //   });
    /* TODO: Handle multistep command here and after every handle, increase the step pointer by 1 until the step pointer becomes greater than the multiStepCommand.length */
  }
  //
  // HANDLES BUILT IN COMMANDS
  // ^^^^^^^^^^^^^^^^^^^^^^^^^
  //
  else if (inBuiltCommands.includes(base)) {
    // Handle clear //
    if (base === "clear") {
      if (args.length !== 0) {
        appendError(
          setExchangeHistory,
          argsNotReqd(base),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else setExchangeHistory([]); // Clears the terminal exchange history
    } else if (base === "echo") {
      appendOutput(setExchangeHistory, args, fullCommand, pwd, terminalPrompt);
    }
    // Handle cd //
    else if (base === "cd") {
      if (argsArr.length > 1) {
        appendError(
          setExchangeHistory,
          tooManyArgs(base),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else if (argsArr.length < 1) {
        appendOutput(
          setExchangeHistory,
          args,
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else
        cd(
          pwd,
          terminalPrompt,
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
          terminalPrompt
        );
      } else
        ls(
          setExchangeHistory,
          argsArr,
          structure,
          pwd,
          terminalPrompt,
          fullCommand
        );
    }
    // Handle cat //
    else if (base === "cat") {
      if (argsArr.length > 1) {
        appendError(
          setExchangeHistory,
          tooManyArgs(base),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else if (argsArr.length < 1) {
        appendError(
          setExchangeHistory,
          argsReqd(base, "YOUR-FILE-NAME"),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else
        cat(
          setExchangeHistory,
          pwd,
          terminalPrompt,
          fullCommand,
          argsArr,
          structure
        );
    }
    // Handle pwd //
    else if (base === "pwd, terminalPrompt") {
      if (argsArr.length !== 0) {
        appendError(
          setExchangeHistory,
          argsNotReqd(base),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else getPwd(pwd, terminalPrompt, setExchangeHistory);
    }
    // Handle mkdir //
    else if (base === "mkdir") {
      if (argsArr.length > 1) {
        appendError(
          setExchangeHistory,
          tooManyArgs(base),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else if (argsArr.length < 1) {
        appendError(
          setExchangeHistory,
          argsReqd(base, "NEW-DIR-NAME"),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else
        mkdir(
          setExchangeHistory,
          pwd,
          terminalPrompt,
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
          terminalPrompt
        );
      } else if (argsArr.length < 1) {
        appendError(
          setExchangeHistory,
          argsReqd(base, "YOUR-FILE/DIR"),
          fullCommand,
          pwd,
          terminalPrompt
        );
      } else
        rm(
          setExchangeHistory,
          argsArr,
          pwd,
          terminalPrompt,
          structure,
          setStructure,
          fullCommand
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
          prompt: terminalPrompt,
          pwd: pwd,
        },
      ];
    });
};
