import { SetStateAction } from "react";
import { IExchange } from "../types/GlobalTypes";
import { argsNotReqd, argsReqd, commandNotFound, tooManyArgs } from "./Errors";
import {
  cat,
  changeDir,
  getPwd,
  listDir,
  mkdir,
  rm,
} from "./InBuiltCommandsHandlers";
import { appendError } from "../utils/Utils";

export const processCommand = (
  base: string,
  argsArr: string[],
  commands: Record<string, (args: string) => React.JSX.Element | string>,
  inBuiltCommands: string[],
  setExchangeHistory: React.Dispatch<SetStateAction<IExchange[]>>,
  pwd: string,
  setPwd: React.Dispatch<React.SetStateAction<string>>,
  structure: any,
  setStructure: React.Dispatch<React.SetStateAction<any>>
) => {
  const args = argsArr.join(" ");
  const fullCommand = `${base} ${args}`;
  //
  // HANDLES USER DEFINED COMMANDS
  // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  //
  if (commands[base]) {
    const executor = commands[base];
    typeof executor === "function" &&
      setExchangeHistory((prev) => {
        return [
          ...prev,
          {
            command: fullCommand,
            output: executor(args),
            pwd: pwd,
          },
        ];
      });
  }
  //
  // HANDLES BUILT IN COMMANDS
  // ^^^^^^^^^^^^^^^^^^^^^^^^^
  //
  else if (inBuiltCommands.includes(base)) {
    // Handle clear //
    if (base === "clear") {
      if (args.length !== 0) {
        appendError(setExchangeHistory, argsNotReqd(base), fullCommand, pwd);
      } else setExchangeHistory([]); // Clears the terminal exchange history
    } else if (base === "echo") {
      setExchangeHistory((prev) => {
        return [
          ...prev,
          {
            command: fullCommand,
            output: args,
            pwd: pwd,
          },
        ];
      });
    }
    // Handle cd //
    else if (base === "cd") {
      if (argsArr.length > 1) {
        appendError(setExchangeHistory, tooManyArgs(base), fullCommand, pwd);
      } else if (argsArr.length < 1) {
        setExchangeHistory((prev) => {
          return [
            ...prev,
            {
              command: fullCommand,
              output: args,
              pwd: pwd,
            },
          ];
        });
      } else
        changeDir(
          pwd,
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
        appendError(setExchangeHistory, tooManyArgs(base), fullCommand, pwd);
      } else listDir(setExchangeHistory, argsArr, structure, pwd, fullCommand);
    }
    // Handle cat //
    else if (base === "cat") {
      if (argsArr.length > 1) {
        appendError(setExchangeHistory, tooManyArgs(base), fullCommand, pwd);
      } else if (argsArr.length < 1) {
        appendError(
          setExchangeHistory,
          argsReqd(base, "YOUR-FILE-NAME"),
          fullCommand,
          pwd
        );
      } else cat(setExchangeHistory, pwd, fullCommand, argsArr, structure);
    }
    // Handle pwd //
    else if (base === "pwd") {
      if (argsArr.length !== 0) {
        appendError(setExchangeHistory, argsNotReqd(base), fullCommand, pwd);
      } else getPwd(pwd, setExchangeHistory);
    }
    // Handle mkdir //
    else if (base === "mkdir") {
      if (argsArr.length > 1) {
        appendError(setExchangeHistory, tooManyArgs(base), fullCommand, pwd);
      } else if (argsArr.length < 1) {
        appendError(
          setExchangeHistory,
          argsReqd(base, "NEW-DIR-NAME"),
          fullCommand,
          pwd
        );
      } else
        mkdir(
          setExchangeHistory,
          pwd,
          argsArr,
          structure,
          fullCommand,
          setStructure
        );
    }
    // Handle rm //
    else if (base === "rm") {
      if (argsArr.length > 1) {
        appendError(setExchangeHistory, tooManyArgs(base), fullCommand, pwd);
      } else if (argsArr.length < 1) {
        appendError(
          setExchangeHistory,
          argsReqd(base, "YOUR-FILE/DIR"),
          fullCommand,
          pwd
        );
      } else
        rm(
          setExchangeHistory,
          argsArr,
          pwd,
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
          pwd: pwd,
        },
      ];
    });
};
